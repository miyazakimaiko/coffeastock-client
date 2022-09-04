require("dotenv").config();
const db = require("../db");
const { validationResult } = require('express-validator');
const { recipeValidator } = require("../utils/validators");
const { CustomException } = require("../utils/customExcetions");
const { getIncrementCountInUseBaseQuery, getDecrementCountInUseBaseQuery } = require("../utils/baseQueries");
const { getUniqueItemInFirstArgArray } = require("../helper/compareArrays");

const recipeRangeKeys = ['method', 'grinder', 'water', 'palate'];

module.exports = (app) => {
  const endpoint = process.env.API_ENDPOINT;

  // Get all recipes of a bean
  app.get(endpoint + "/user/:userid/bean/:beanid/recipes", async (req, res, next) => {
    try {
      const results = await db.query(`
      SELECT * FROM recipes WHERE user_id = $1 AND bean_id = $2`, 
      [req.params.userid, req.params.beanid]);

      const recipes = results.rows;
      for(let i=0; i<recipes.length; i++) {
        const recipe = recipes[i];
        recipes[i]['value'] = `${recipe.bean_id}-${recipe.recipe_no}`;
        recipes[i]['label'] = `Recipe No.${recipe.recipe_no}`;
        recipes[i]['recipe_id'] = `${recipe.bean_id}-${recipe.recipe_no}`
      }

      res.status(200).json(recipes);

    } catch (error) {
      next(error)
    }
  });

    // Get a recipe of a bean
    app.get(endpoint + "/user/:userid/bean/:beanid/recipe/:recipeno", async (req, res, next) => {
      try {
        const results = await db.query(`
        SELECT * FROM recipes WHERE user_id = $1 AND bean_id = $2 AND recipe_no = $3`, 
        [req.params.userid, req.params.beanid, req.params.recipeno]);

        const recipe = results.rows[0];
        recipe['value'] = `${recipe.bean_id}-${recipe.recipe_no}`;
        recipe['label'] = `Recipe No.${recipe.recipe_no}`;
        recipe['recipe_id'] = `${recipe.bean_id}-${recipe.recipe_no}`
  
        res.status(200).json(recipe);
      } catch (error) {
        next(error)
      }
    });

    // Get total amount of total-yields-weight and number of recipes
    app.get(endpoint + "/user/:userid/recipes-summary", async (req, res, next) => {
      try {
        const result = await db.query(`
        SELECT SUM(yield_weight), COUNT(*) FROM recipes WHERE user_id = $1`, 
        [req.params.userid]);
  
        res.status(200).json(result.rows[0]);
      } catch (error) {
        next(error)
      }
    });

  // Create a recipe of beans
  app.post(endpoint + "/user/:userid/bean/:beanid/recipe", 
  recipeValidator,
  async (req, res, next) => {
        
    try {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        CustomException(422, errors.array()[0].msg)
      }
      await db.query('BEGIN');

      const recipeNoResult = await db.query(`
          SELECT recipe_seq 
          FROM beans
          WHERE user_id = $1
            AND bean_id = $2
        `,
        [
          req.params.userid,         // $1
          req.params.beanid          // $2
        ]);

      const insertionResult = await db.query(`
      INSERT INTO RECIPES (
        user_id,
        bean_id,
        recipe_no,
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
        palate_rates, 
        memo
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      RETURNING *`,
      [
        req.params.userid,
        req.params.beanid,
        recipeNoResult.rows[0].recipe_seq,
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
        req.body.palate_rates, 
        req.body.memo
      ]);


      for await (const rangeKey of recipeRangeKeys) {

        let rangeItemIds = []; 

        if (rangeKey === 'palate') {
          rangeItemIds = Object.keys(req.body.palate_rates).map(key => key)
        }
        else {
          rangeItemIds = req.body[rangeKey];
        }

        if (rangeItemIds.length > 0) {

          for (const id of rangeItemIds) {

            const baseQuery = getIncrementCountInUseBaseQuery(rangeKey, parseInt(id));
            await db.query(baseQuery, [req.params.userid])
          }
        }
      }

      await db.query(`
        UPDATE beans
        SET recipe_seq = recipe_seq + 1
        WHERE user_id = $1
          AND bean_id = $2
      `,
      [
        req.params.userid,         // $1
        req.params.beanid          // $2
      ]);

      res.status(200).json(insertionResult.rows);

    } catch (error) {
      db.query('ROLLBACK');
      next(error);
    }

    await db.query('COMMIT');
  }); 
  
  // update a recipe of beans
  app.post(endpoint + "/user/:userid/bean/:beanid/recipe/:recipeno",
  recipeValidator,
  async (req, res, next) => {

    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        CustomException(422, errors.array()[0].msg)
      }

      await db.query('BEGIN')

      const getRecipeResult = await db.query(
        `SELECT * FROM recipes
        WHERE user_id = $1 
          AND bean_id = $2
          AND recipe_no = $3`, 
        [
          req.params.userid,
          req.params.beanid,
          req.params.recipeno
        ]
      );

      if (getRecipeResult.rows[0]) {
        const currentRecipe = getRecipeResult.rows[0];

        for (const rangeKey of recipeRangeKeys) {

          let currentRangeIdList = [];
          let newRangeIdList = [];

          if (rangeKey === 'palate') {
            currentRangeIdList = Object.keys(currentRecipe.palate_rates).map(key => parseInt(key))
            newRangeIdList = Object.keys(req.body.palate_rates).map(key => parseInt(key))
          }
          else if (currentRecipe[rangeKey] && req.body[rangeKey]) {
            currentRangeIdList = currentRecipe[rangeKey]
            newRangeIdList = req.body[rangeKey]
          }

          const removedRangeIdList = getUniqueItemInFirstArgArray(currentRangeIdList, newRangeIdList)
          const addedRangeIdList = getUniqueItemInFirstArgArray(newRangeIdList, currentRangeIdList)

          if (removedRangeIdList.length > 0) {

            for (const removedRangeId of removedRangeIdList) {

              const baseQuery = getDecrementCountInUseBaseQuery(rangeKey, removedRangeId);

              try {
                await db.query(baseQuery, [req.params.userid])

              } catch (error) {
                next(error)
              }
            }
          }
          if (addedRangeIdList.length > 0) {

            for (const addeddRangeId of addedRangeIdList) {

              const baseQuery = getIncrementCountInUseBaseQuery(rangeKey, addeddRangeId);

              try {
                await db.query(baseQuery, [req.params.userid])

              } catch (error) {
                next(error)
              }
            }
          }
        }
      }
      else {
        CustomException(404, 'Not Found')
      }

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
      palate_rates = $13, 
      memo = $14
      WHERE user_id = $15 AND bean_id = $16 AND recipe_no = $17 RETURNING *`,
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
        req.body.palate_rates,
        req.body.memo,
        req.params.userid,
        req.params.beanid,
        req.params.recipeno
      ]);

      res.status(200).json(results.rows);

    } catch (error) {
      db.query('ROLLBACK');
      next(error);
    }

    await db.query('COMMIT');
  });

  // delete a recipe
  app.post(endpoint + "/user/:userid/bean/:beanid/recipe/delete/:recipeno", async (req, res, next) => {
    try {
      await db.query('BEGIN');

      const results = await db.query(`
        DELETE FROM recipes WHERE user_id = $1 AND bean_id = $2 AND recipe_no = $3`,
        [req.params.userid, req.params.beanid, req.params.recipeno]
      );

      for (const rangeKey of recipeRangeKeys) {

          let idList = [];

          if (rangeKey === 'palate') {
            idList = Object.keys(req.body.palate_rates).map(key => key);
          }
          else if (req.body[rangeKey]){
            idList = req.body[rangeKey];
          }

          if (idList.length > 0) {

            for await (const id of idList) {
              if (parseInt(id)) {
                const decrementCountInUseBaseQuery = getDecrementCountInUseBaseQuery(rangeKey, parseInt(id));
                await db.query(decrementCountInUseBaseQuery, [req.params.userid]);
              }
            }
          }
      }
      res.status(200).json(results.rows);

    } catch (error) {
      db.query('ROLLBACK');
      next(error);
    }

    await db.query('COMMIT');
  });
}