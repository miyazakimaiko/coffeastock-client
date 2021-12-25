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

  // Get all users
  app.get(endpoint + "/users", authorize, async (req, res, next) => {
    try {
      const results = await db.query(`SELECT * FROM users`);
      
      res.status(200).json({
        status: "success",
        results: results.rows.length,
        data: results.rows,
      });
    } catch (error) {
      next(error);
    }
  });

  // Get a user
  app.get(endpoint + "/user/:userid", authorize, async (req, res, next) => {
    try {
      const results = await db.query(`
      SELECT * FROM users WHERE user_id = $1`, 
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
  
  // update a user
  app.post(endpoint + "/user/:userid", authorize, async (req, res, next) => {
    try {
      const results = await db.query(`
      UPDATE USERS 
      SET 
        origin_range = $1, 
        variety_range = $2,
        process_range = $3, 
        roaster_range = $4, 
        method_range = $5,
        water_range = $6, 
        grinder_range = $7,
        palates = $8, 
        aroma = $9
      WHERE user_id = $10 
      RETURNING *`,
      [
        req.body.origin_range,
        req.body.variety_range,
        req.body.process_range,
        req.body.roaster_range,
        req.body.method_range,
        req.body.water_range,
        req.body.grinder_range,
        req.body.palates,
        req.body.aroma,
        req.params.userid
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

  // delete a user
  app.delete(endpoint + "/user/:userid", authorize, async (req, res, next) => {
    try {
      const results = await db.query(`
      DELETE FROM USERS WHERE user_id = $1`,
      [req.params.userid]);

      res.status(200).json({
        status: "success",
        body: results.body
      });

    } catch (error) {
      next(error);
    }
  });
}