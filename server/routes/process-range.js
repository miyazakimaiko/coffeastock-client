require("dotenv").config();
const db = require("../db");
const express = require("express");
const morgan = require("morgan");

module.exports = (app) => {
  const endpoint = process.env.API_ENDPOINT;
  // primary middleware
  app.use(morgan('dev'));
  app.use(express.json());
 
  // Get process range
  app.get(endpoint + "/user/:userid/range/process", async (req, res, next) => {
    try {
      const results = await db.query(`
      SELECT process_range FROM users WHERE user_id = $1`, 
      [req.params.userid]);
      
      res.status(200).json(results.rows[0]['process_range']['range']);
    } catch (error) {
      next(error);
    }
  });

  // add an process in a range 
  app.post(endpoint + "/user/:userid/range/process", async (req, res, next) => {
    try {
      let uniqueName = true;

      const names = await db.query(`
        SELECT jsonb_object_keys(process_range::jsonb->'range') as name
        FROM users WHERE user_id = $1
      `,[ req.params.userid ]);

      names.rows.forEach((item) => {
        if (item.name === req.body.name) {
          uniqueName = false;
        }
      })

      if (!uniqueName) {
        res.status(500).json('An entry with the same name already exists.');
      } 
      else {
        // get the ID of the last entry to create new ID
        const idResult = await db.query(`
          SELECT process_range::jsonb->'next_id' as next_id
          FROM users WHERE user_id = $1
        `,[ req.params.userid ]);

        const newid = idResult.rows[0]['next_id'];

        // Update the next_id
        await db.query(`
        UPDATE users
        SET process_range =
        jsonb_set(process_range, '{next_id}', $1)
        WHERE user_id = $2
        RETURNING *
        `,[
          newid + 1,
          req.params.userid
        ]);

        // Insert new process
        const newData = `{
          "${req.body.name}" : {
            "id": ${newid},
            "def": "${req.body.def}"
          }
        }`

        const result = await db.query(`
          UPDATE users
          SET process_range =
          jsonb_set(process_range, '{range}', process_range->'range' || $1)
          WHERE user_id = $2
          RETURNING *
        `,[
          newData,
          req.params.userid
        ]);
      
        res.status(200).json(result.rows[0]['process_range']['range']);
      }
    } catch (error) {
      next(error);
    }
  }); 
}