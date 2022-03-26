require("dotenv").config();
const db = require("../db");
const { body, validationResult } = require('express-validator');

let validator = [
  body('brew_date', 'Invalid Brew Date').isDate().optional({ checkFalsy: true }),
  body('grind_size', 'Invalid Grind Size').isFloat({ min: 0 }).optional({ checkFalsy: true }),
  body('grounds_weight', 'Invalid Grounds Weight').isFloat({ min: 0 }).optional({ checkFalsy: true }),
  body('water_weight', 'Invalid Water Weight').isFloat({ min: 0 }).optional({ checkFalsy: true }),
  body('water_temp', 'Invalid Water Temperature').isFloat({ min: 0 }).optional({ checkFalsy: true }),
  body('yield_weight', 'Invalid Yield Weight').isFloat({ min: 0 }).optional({ checkFalsy: true }),
  body('tds', 'Invalid TDS').isFloat({ min: 0 }).optional({ checkFalsy: true }),
  body('palate', 'Invalid Palate Rates').isObject().optional({ checkFalsy: true }),
  body('memo', 'Invalid Memo').escape().isLength({ max: 400 }).optional({ checkFalsy: true }),
  body('extraction_time').custom(value => {
    let valid = String(value).match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/);
    if (valid || value === null) {
      return true
    } else {
      throw new Error('Invalid Extraction Time')
    }
  })
]

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
      SELECT * FROM recipes WHERE user_id = $1 AND coffee_bean_id = $2`, 
      [req.params.userid, req.params.productid]);

      res.status(200).json(results.rows);
    } catch (error) {
      next(error)
    }
  });

  // Create a recipe of beans
  app.post(endpoint + "/user/:userid/bean/:beanid/recipe", 
  validator,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ 
        error: {
          message: errors.array()[0]['msg']
        }
      });
    }
    try {
      const results = await db.query(`
      INSERT INTO recipes (
        user_id,
        coffee_bean_id, 
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
        palate, 
        memo
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
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
  validator,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ 
        error: {
          message: errors.array()[0]['msg']
        }
      });
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
      palate = $12, 
      comment = $13
      WHERE user_id = $14 AND coffee_bean_id = $15 AND recipe_id = $16 RETURNING *`,
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
        req.body.palate,
        req.body.comment,
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
      DELETE FROM recipes WHERE user_id = $1 AND coffee_bean_id = $2 AND recipe_id = $3`,
      [req.params.userid, req.params.beanid, req.params.recipeid]);

      res.status(200).json(results.rows);

    } catch (error) {
      next(error);
    }
  });
}