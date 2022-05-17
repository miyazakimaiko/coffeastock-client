require("dotenv").config();
const db = require("../db");
const { validationResult } = require('express-validator');
const { recipeValidator } = require("../utils/validators");
const { CustomException } = require("../utils/customExcetions");

module.exports = (app) => {
  const endpoint = process.env.API_ENDPOINT;

    // Get all recipes of a user
    app.get(endpoint + "/user/:userid/recipes", async (req, res, next) => {
      try {
        const results = await db.query(`
        SELECT * FROM recipes WHERE user_id = $1`, 
        [req.params.userid]);
  
        res.status(200).json(results.rows);
      } catch (error) {
        next(error)
      }
    });

  // Get all recipes of a bean
  app.get(endpoint + "/user/:userid/bean/:productid/recipes", async (req, res, next) => {
    try {
      const results = await db.query(`
      SELECT * FROM recipes WHERE user_id = $1 AND bean_id = $2`, 
      [req.params.userid, req.params.productid]);

      res.status(200).json(results.rows);
    } catch (error) {
      next(error)
    }
  });

  // Create a recipe of beans
  app.post(endpoint + "/user/:userid/bean/:beanid/recipe", 
  recipeValidator,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      CustomException(422, errors.array()[0]['msg'])
    }
    try {
      const results = await db.query(`
      INSERT INTO recipes (
        user_id,
        bean_id, 
        brew_date, 
        method, 
        grinder, 
        grind_size, 
        grounds_weight, 
        water_weight, 
        water, 
        water_temp, 
        yield_weight,
        extraction_time,
        tds, 
        total_rate,
        palate, 
        memo
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *`,
      [
        req.params.userid,
        req.params.beanid,
        req.body.brew_date,
        req.body.method, 
        req.body.grinder, 
        req.body.grind_size, 
        req.body.grounds_weight, 
        req.body.water_weight, 
        req.body.water, 
        req.body.water_temp, 
        req.body.yield_weight,
        req.body.extraction_time,
        req.body.tds, 
        req.body.total_rate,
        req.body.palate, 
        req.body.memo
      ]);

      res.status(200).json(results.rows); 
    } catch (error) {
      next(error);
    }
  }); 
  
  // update a recipe of beans
  app.post(endpoint + "/user/:userid/bean/:beanid/recipe/:recipeid",
  recipeValidator,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      CustomException(422, errors.array()[0]['msg'])
    }
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
      water = $7, 
      water_temp = $8, 
      yield_weight = $9,
      extraction_time = $10,
      tds = $11, 
      total_rate = $12,
      palate = $13, 
      memo = $14
      WHERE user_id = $15 AND bean_id = $16 AND recipe_id = $17 RETURNING *`,
      [
        req.body.brew_date,
        req.body.method,
        req.body.grinder,
        req.body.grind_size,
        req.body.grounds_weight,
        req.body.water_weight,
        req.body.water,
        req.body.water_temp,
        req.body.yield_weight,
        req.body.extraction_time,
        req.body.tds,
        req.body.total_rate,
        req.body.palate,
        req.body.memo,
        req.params.userid,
        req.params.beanid,
        req.params.recipeid
      ]);

      res.status(200).json(results.rows);

    } catch (error) {
      next(error);
    }
  });

  // delete a recipe
  app.delete(endpoint + "/user/:userid/bean/:beanid/recipe/:recipeid", async (req, res, next) => {
    try {
      const results = await db.query(`
      DELETE FROM recipes WHERE user_id = $1 AND bean_id = $2 AND recipe_id = $3`,
      [req.params.userid, req.params.beanid, req.params.recipeid]);

      res.status(200).json(results.rows);

    } catch (error) {
      next(error);
    }
  });
}