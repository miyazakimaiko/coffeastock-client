require("dotenv").config();
const db = require("../db");
const express = require("express");
const morgan = require("morgan");

module.exports = (app) => {
  const endpoint = process.env.API_ENDPOINT;
  // primary middleware
  app.use(morgan('dev'));
  app.use(express.json());
 
  // Get grinder range
  app.get(endpoint + "/user/:userid/range/grinder", async (req, res, next) => {
    try {
      const results = await db.query(`
      SELECT grinder_range FROM users WHERE user_id = $1`, 
      [req.params.userid]);
      
      res.status(200).json(results.rows[0]['grinder_range']['range']);
    } catch (error) {
      next(error);
    }
  });

  // add an grinder in a range 
  app.post(endpoint + "/user/:userid/range/grinder", async (req, res, next) => {
    try {
      let uniqueName = true;

      const names = await db.query(`
        SELECT jsonb_object_keys(grinder_range::jsonb->'range') as name
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
          SELECT grinder_range::jsonb->'next_id' as next_id
          FROM users WHERE user_id = $1
        `,[ req.params.userid ]);

        const newid = idResult.rows[0]['next_id'];

        // Update the next_id
        await db.query(`
        UPDATE users
        SET grinder_range =
        jsonb_set(grinder_range, '{next_id}', $1)
        WHERE user_id = $2
        RETURNING *
        `,[
          newid + 1,
          req.params.userid
        ]);

        // Insert new grinder
        const newData = `{
          "${req.body.name}" : {
            "id": ${newid},
            "def": "${req.body.def}"
          }
        }`

        const result = await db.query(`
          UPDATE users
          SET grinder_range =
          jsonb_set(grinder_range, '{range}', grinder_range->'range' || $1)
          WHERE user_id = $2
          RETURNING *
        `,[
          newData,
          req.params.userid
        ]);
      
        res.status(200).json(result.rows[0]['grinder_range']['range']);
      }
    } catch (error) {
      next(error);
    }
  }); 
}