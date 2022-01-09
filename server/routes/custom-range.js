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

  // Get origin range
  app.get(endpoint + "/user/:userid/range/origin", async (req, res, next) => {
    try {
      const results = await db.query(`
      SELECT origin_range FROM users WHERE user_id = $1`, 
      [req.params.userid]);
      
      res.status(200).json(results.rows[0]['origin_range']);
    } catch (error) {
      next(error);
    }
  });

  // Get farm range
  app.get(endpoint + "/user/:userid/range/farm", async (req, res, next) => {
    try {
      const results = await db.query(`
      SELECT farm_range FROM users WHERE user_id = $1`, 
      [req.params.userid]);
      
      res.status(200).json(results.rows[0]['farm_range']);
    } catch (error) {
      next(error);
    }
  });

  // Get variety range
  app.get(endpoint + "/user/:userid/range/variety", async (req, res, next) => {
    try {
      const results = await db.query(`
      SELECT variety_range FROM users WHERE user_id = $1`, 
      [req.params.userid]);
      
      res.status(200).json(results.rows[0]['variety_range']);
    } catch (error) {
      next(error);
    }
  });

  // Get process range
  app.get(endpoint + "/user/:userid/range/process", async (req, res, next) => {
    try {
      const results = await db.query(`
      SELECT process_range FROM users WHERE user_id = $1`, 
      [req.params.userid]);
      
      res.status(200).json(results.rows[0]['process_range']);
    } catch (error) {
      next(error);
    }
  });

  // Get roaster range
  app.get(endpoint + "/user/:userid/range/roaster", async (req, res, next) => {
    try {
      const results = await db.query(`
      SELECT roaster_range FROM users WHERE user_id = $1`, 
      [req.params.userid]);
      
      res.status(200).json(results.rows[0]['roaster_range']);
    } catch (error) {
      next(error);
    }
  });

  // Get aroma range
  app.get(endpoint + "/user/:userid/range/aroma", async (req, res, next) => {
    try {
      const results = await db.query(`
      SELECT aroma_range FROM users WHERE user_id = $1`, 
      [req.params.userid]);
      
      res.status(200).json(results.rows[0]['aroma_range']);
    } catch (error) {
      next(error);
    }
  });

  // Get grinder range
  app.get(endpoint + "/user/:userid/range/grinder", async (req, res, next) => {
    try {
      const results = await db.query(`
      SELECT grinder_range FROM users WHERE user_id = $1`, 
      [req.params.userid]);
      
      res.status(200).json(results.rows[0]['grinder_range']);
    } catch (error) {
      next(error);
    }
  });

  // Get method range
  app.get(endpoint + "/user/:userid/range/method", async (req, res, next) => {
    try {
      const results = await db.query(`
      SELECT method_range FROM users WHERE user_id = $1`, 
      [req.params.userid]);
      
      res.status(200).json(results.rows[0]['method_range']);
    } catch (error) {
      next(error);
    }
  });

  // Get water range
  app.get(endpoint + "/user/:userid/range/water", async (req, res, next) => {
    try {
      const results = await db.query(`
      SELECT water_range FROM users WHERE user_id = $1`, 
      [req.params.userid]);
      
      res.status(200).json(results.rows[0]['water_range']);
    } catch (error) {
      next(error);
    }
  });

  // Get palate range
  app.get(endpoint + "/user/:userid/range/palate", async (req, res, next) => {
    try {
      const results = await db.query(`
      SELECT palate_range FROM users WHERE user_id = $1`, 
      [req.params.userid]);
      
      res.status(200).json(results.rows[0]['palate_range']);
    } catch (error) {
      next(error);
    }
  });

  // add a custom option in a range 
  app.post(endpoint + "/user/:userid/origin_range", async (req, res, next) => {
    try {
      // get the ID of the last entry to create new ID
      const keys = await db.query(`
        SELECT jsonb_object_keys(origin_range) as id
        FROM users
        WHERE user_id = $1
      `,
      [
        req.params.userid
      ]);

      const count = keys.rows.length;
      const lastId = keys.rows[count-1]['id'];
      const newId = parseInt(lastId) + 1
      const newData = `{
        "${newId}" : {
          "name": "${req.body.name}",
          "def": "${req.body.def}"
        }
      }`

      const result = await db.query(`
        UPDATE users
        SET origin_range =
          origin_range || $1
        WHERE user_id = $2
        RETURNING *
      `,
      [
        newData,
        req.params.userid
      ])
      res.status(200).json(result.rows);
      // select jsonb_object_keys(origin_range) where username = 'neil';
      // create the next id
      // insert new entry

      // const results = await db.query(`
      // INSERT INTO 
      // BEANS (
      //   user_id, 
      //   product_name,
      //   blend_ratio,
      //   origin, 
      //   farm, 
      //   varieties, 
      //   processing, 
      //   altitude,
      //   grading,
      //   harvest_date,
      //   roaster,
      //   roast_level,
      //   roast_date,
      //   aroma
      // )
      // VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      // RETURNING *`,
      // [
      //   req.params.userid,
      //   req.body.product_name,
      //   req.body.blend_ratio,
      //   req.body.origin,
      //   req.body.farm,
      //   req.body.varieties,
      //   req.body.processing,
      //   req.body.altitude,
      //   req.body.grading,
      //   req.body.harvest_date,
      //   req.body.roaster,
      //   req.body.roast_level,
      //   req.body.roast_date,
      //   req.body.aroma
      // ]);

      // res.status(200).json({
      //   status: "success",
      //   results: results.rows.length,
      //   data: results.rows,
      // });
        
    } catch (error) {
      next(error);
    }
  }); 
  
  // update beans of a user
  app.post(endpoint + "/user/:userid/bean/:productid", async (req, res, next) => {
    try {
      const results = await db.query(`
      UPDATE beans 
      SET 
        product_name = $1, 
        blend_ratio = $2,
        origin = $3, 
        farm = $4, 
        varieties = $5, 
        processing = $6, 
        grading = $7,
        harvest_date = $8, 
        roaster = $9, 
        roast_level = $10, 
        roast_date = $11,
        aroma = $12
      WHERE user_id = $13 AND product_id = $14 
      RETURNING *`,
      [
        req.body.product_name,
        req.body.blend_ratio,
        req.body.origin,
        req.body.farm,
        req.body.varieties,
        req.body.processing,
        req.body.grading,
        req.body.harvest_date,
        req.body.roaster,
        req.body.roast_level,
        req.body.roast_date,
        req.body.aroma,
        req.params.userid,
        req.params.productid
      ]);

      res.status(200).json({
        status: "success",
        results: results.rows.length,
        body: results.rows
      });

    } catch (error) {
      next(error);
    }
  });

  // delete beans
  app.delete(endpoint + "/user/:userid/bean/:productid", async (req, res, next) => {
    try {
      const results = await db.query(`
      DELETE FROM beans WHERE user_id = $1 AND product_id = $2`,
      [req.params.userid, req.params.productid]);

      res.status(200).json({
        status: "success",
        body: results.body
      });

    } catch (error) {
      next(error);
    }
  });
}