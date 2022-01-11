require("dotenv").config();
const db = require("../db");
const express = require("express");
const morgan = require("morgan");

module.exports = (app) => {
  const endpoint = process.env.API_ENDPOINT;
  // primary middleware
  app.use(morgan('dev'));
  app.use(express.json());

  app.post(endpoint + "/user/:userid", async (req, res, next) => {
    try {
      const existingUser = await db.query(`SELECT * FROM USERS WHERE user_id = $1`, [req.params.userid])

      if (existingUser.rows.length !== 0) {
        return res.status(409).json("Specified user already has a row.")
      }

      console.log('entering insert query...')
      const result = await db.query(`
        INSERT INTO
        USERS (
          user_id,
          origin_range,
          farm_range, 
          variety_range, 
          process_range, 
          roaster_range, 
          method_range, 
          water_range, 
          grinder_range,
          palate_range,
          aroma_range
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *`,
        [
          req.params.userid,
          JSON.stringify(req.body.origin_range), 
          JSON.stringify(req.body.farm_range), 
          JSON.stringify(req.body.variety_range), 
          JSON.stringify(req.body.process_range), 
          JSON.stringify(req.body.roaster_range), 
          JSON.stringify(req.body.method_range), 
          JSON.stringify(req.body.water_range), 
          JSON.stringify(req.body.grinder_range),
          JSON.stringify(req.body.palate_range),
          JSON.stringify(req.body.aroma_range)
        ]
      );

      res.status(200).json('User ranges are set.');

    } catch (error) {
      next(error);
    }
  });

  // Get all custom range of a user
  app.get(endpoint + "/user/:userid/ranges", async (req, res, next) => {
    try {
      const results = await db.query(`
      SELECT
        origin_range,
        farm_range,
        variety_range,
        process_range,
        roaster_range,
        method_range,
        grinder_range,
        water_range,
        palate_range,
        aroma_range
      FROM users WHERE user_id = $1`, 
      [req.params.userid]);
      
      res.status(200).json(results.rows[0]);
    } catch (error) {
      next(error);
    }
  });


}