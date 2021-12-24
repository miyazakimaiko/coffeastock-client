require("dotenv").config();
const db = require("../db");
const express = require("express");
const morgan = require("morgan");

module.exports = (app) => {
  const endpoint = process.env.API_ENDPOINT;
  // primary middleware
  app.use(morgan('dev'));
  app.use(express.json());

  // Get all recipes of a bean
  app.get(endpoint + "/bean/:productid/recipes", async (req, res, next) => {
      try {
        const results = await db.query(`
        SELECT * FROM recipes WHERE product_id = $1`, 
        [req.params.productid]);

        res.status(200).json({
          status: "success",
          results: results.rows.length,
          data: results.rows,
        });
      } catch (error) {
        next(error)
      }
  });

  // Create a recipe of beans
  app.post("/api/v1/bean/:productid/recipe", async (req, res, next) => {
      try {
          const results = await db.query(`
          INSERT INTO recipes (
              product_id, 
              brew_date, 
              method, 
              grinder, 
              grind_size, 
              grounds_weight, 
              water_weight, 
              water_type, 
              water_temp, 
              yield_weight,
              extraction_time, 
              tds, 
              palate_rates, 
              comment
              )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
          RETURNING *`,
          [
              req.params.productid,
              req.body.brew_date,
              req.body.method, 
              req.body.grinder, 
              req.body.grind_size, 
              req.body.grounds_weight, 
              req.body.water_weight, 
              req.body.water_type, 
              req.body.water_temp, 
              req.body.yield_weight,
              req.body.extraction_time, 
              req.body.tds, 
              req.body.palate_rates, 
              req.body.comment
          ]);

          res.status(200).json({
              status: "success",
              results: results.rows.length,
              data: results.rows,
          }); 
      } catch (error) {
        next(error);
      }
  }); 
  
  // update a recipe of beans
  app.post(endpoint + "/bean/:productid/recipe/:recipeid", async (req, res, next) => {
      try {
          const results = await db.query(`
          UPDATE recipes 
          SET 
          brew_date = $1, 
          method = $2, 
          grinder = $3, 
          grind_size = $4, 
          grounds_weight = $5, 
          water_weight = $6, 
          water_type = $7, 
          water_temp = $8, 
          yield_weight = $9,
          extraction_time = $10, 
          tds = $11, 
          palate_rates = $12, 
          comment = $13
          WHERE product_id = $14 AND recipe_id = $15 RETURNING *`,
          [
              req.body.brew_date,
              req.body.method,
              req.body.grinder,
              req.body.grind_size,
              req.body.grounds_weight,
              req.body.water_weight,
              req.body.water_type,
              req.body.water_temp,
              req.body.yield_weight,
              req.body.extraction_time,
              req.body.tds,
              req.body.palate_rates,
              req.body.comment,
              req.params.productid,
              req.params.recipeid
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

  // delete a recipe
  app.delete(endpoint + "/bean/:productid/recipe/:recipeid", async (req, res, next) => {
      try {
          const results = await db.query(`
          DELETE FROM recipes WHERE product_id = $1 AND recipe_id = $2`,
          [req.params.productid, req.params.recipeid]);

          res.status(200).json({
              status: "success",
              body: results.body
          });
  
      } catch (error) {
        next(error);
      }
  });
}