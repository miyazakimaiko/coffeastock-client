require("dotenv").config();
const db = require("../db");
const express = require("express");
const morgan = require("morgan");
const authorize = require("../middlewares/authorize");

module.exports = (app) => {
  const endpoint = process.env.API_ENDPOINT;
  // primary middleware
  app.use(morgan('dev'));
  app.use(express.json());

  // Get all custom range of a user
  app.get(endpoint + "/user/:userid/ranges", authorize, async (req, res, next) => {
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
      
      res.status(200).json({
        status: "success",
        results: results.rows.length,
        data: results.rows,
      });
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
  app.post(endpoint + "/user/:userid/bean/:productid", authorize, async (req, res, next) => {
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
  app.delete(endpoint + "/user/:userid/bean/:productid", authorize, async (req, res, next) => {
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