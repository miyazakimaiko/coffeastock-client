require("dotenv").config();
const db = require("../db");
const { body, validationResult } = require('express-validator');

let validator = [
  body('label', 'Invalid Name').not().isEmpty().isLength({ max: 60 }),
  body('single_origin', 'Invalid Single Origin').isBoolean(),
  body('blend_ratio', 'Invalid Blend Ratio').isObject().optional({ checkFalsy: true }),
  body('roast_level', 'Invalid Roast Level').isFloat({ min: 0, max: 10 }).optional({ nullable: true }),
  body('grade', 'Invalid Grade').isFloat({ min: 0, max: 100 }).optional({ nullable: true }),
  body('roast_date', 'Invalid Roast Date').isDate().optional({ checkFalsy: true }),
  body('memo', 'Invalid Memo').isLength({ max: 400 }).optional({ checkFalsy: true }),
]

module.exports = (app) => {
  const endpoint = process.env.API_ENDPOINT;

  // Get all beans of a user
  app.get(endpoint + "/user/:userid/beans", async (req, res, next) => {
    try {
      const results = await db.query(`
      SELECT * FROM beans WHERE user_id = $1`, 
      [req.params.userid]);
      res.status(200).json(results.rows);
      
    } catch (error) {
      next(error);
    }
  });

  // create beans of a user
  app.post(endpoint + "/user/:userid/bean", 
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
      INSERT INTO 
      BEANS (
        user_id, 
        label,
        single_origin,
        blend_ratio,
        origin, 
        farm, 
        variety, 
        process, 
        altitude,
        grade,
        harvest_date,
        roaster,
        roast_level,
        roast_date,
        aroma
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *`,
      [
        req.params.userid,
        req.body.label,
        req.body.single_origin,
        req.body.blend_ratio,
        req.body.origin,
        req.body.farm,
        req.body.variety,
        req.body.process,
        req.body.altitude,
        req.body.grade,
        req.body.harvest_date,
        req.body.roaster,
        req.body.roast_level,
        req.body.roast_date,
        req.body.aroma
      ]);

      res.status(200).json(results.rows);
        
    } catch (error) {
      next(error);
    }
  }); 
  
  // update beans of a user
  app.post(endpoint + "/user/:userid/bean/:productid",
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
      UPDATE beans 
      SET 
        label = $1, 
        single_origin = $2, 
        blend_ratio = $3,
        origin = $4, 
        farm = $5, 
        variety = $6, 
        process = $7, 
        grade = $8,
        harvest_date = $9, 
        roaster = $10, 
        roast_level = $11, 
        roast_date = $12,
        aroma = $13
      WHERE user_id = $14 AND product_id = $15 
      RETURNING *`,
      [
        req.body.label,
        req.body.single_origin,
        req.body.blend_ratio,
        req.body.origin,
        req.body.farm,
        req.body.variety,
        req.body.process,
        req.body.grade,
        req.body.harvest_date,
        req.body.roaster,
        req.body.roast_level,
        req.body.roast_date,
        req.body.aroma,
        req.params.userid,
        req.params.productid
      ]);

      res.status(200).json(results.rows);

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

      res.status(200).json(results.body);

    } catch (error) {
      next(error);
    }
  });
}