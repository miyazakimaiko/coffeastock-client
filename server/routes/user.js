require("dotenv").config();
const db = require("../db");
const { CustomException } = require('../utils/customExcetions');


module.exports = (app) => {
  const endpoint = process.env.API_ENDPOINT;

  app.get(endpoint + "/user", async (req, res, next) => {
    try {
      const result = await db.query(`
        SELECT COUNT(*) FROM USERS WHERE user_id = $1
        `, 
        [req.query.id]
      );
      
      if (result.rows[0].count === '1') res.status(200).json(true);
      else res.status(200).json(false);
    }
     catch (err) {
       next(err);
     }
  });

  // Create custom ranges for a user
  app.post(endpoint + "/user/:userid", async (req, res, next) => {
    try {
      const existingUser = await db.query(`SELECT 1 FROM USERS WHERE user_id = $1`, [req.params.userid])
      if (existingUser.rows.length !== 0) {
        CustomException(409, "This user already has a row.")
      }

      await db.query(`
        INSERT INTO
        USERS (
          user_id,
          user_type,
          unit_solid_weight_id,
          unit_fluid_weight_id,
          unit_temperature_id,
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
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        `,
        [
          req.params.userid,                        // 1
          'TRIAL',                                  // 2
          1,                                        // 3
          1,                                        // 4
          1,                                        // 5
          JSON.stringify(req.body.origin_range),    // 6
          JSON.stringify(req.body.farm_range),      // 7
          JSON.stringify(req.body.variety_range),   // 8
          JSON.stringify(req.body.process_range),   // 9
          JSON.stringify(req.body.roaster_range),   // 10
          JSON.stringify(req.body.method_range),    // 11
          JSON.stringify(req.body.water_range),     // 12
          JSON.stringify(req.body.grinder_range),   // 13
          JSON.stringify(req.body.palate_range),    // 14
          JSON.stringify(req.body.aroma_range)      // 15
        ]
      );
      res.status(200).json('User ranges are set.');

    } catch (error) {
      next(error);
    }
  });

  // get user data. if user not found, return false.
  app.get(endpoint + "/user/:userid", async (req, res, next) => {
    try {
      const result = await db.query(`
          SELECT
            unit_solid_weight_id,
            unit_fluid_weight_id,
            unit_temperature_id,
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
          FROM users
          WHERE user_id = $1
        `, 
          [req.params.userid]
        );

      if (result.rows.length === 0) {
        CustomException(404, "User Not Found");
      }
      res.status(200).json(result.rows[0]);

    } catch(err) {
      next(err);
    }
  });

  // get how many MB the user use in total.
  app.get(endpoint + "/user/:userid/total-used-mb", async (req, res, next) => {
    try {

      const totalSize = await db.query(
        `SELECT * FROM get_user_total_used_mb($1)`, 
        [req.params.userid]
      );

      res.status(200).json(totalSize.rows[0].get_user_total_used_mb);

    } catch(err) {
      next(err);
    }
  });

  app.get(endpoint + "/user/:userid/info", async (req, res, next) => {
    try {
      const result = await db.query(`
        SELECT 
          user_type,
          unit_solid_weight_id, 
          unit_fluid_weight_id,
          unit_temperature_id
        FROM users WHERE user_id = $1
        `, 
        [req.params.userid]
      );
      res.status(200).json(result.rows[0]);
    }
     catch (err) {
       next(err);
     }
  });

  app.post(endpoint + "/user/:userid/unit-ids", async (req, res, next) => {
    try {
      const result = await db.query(`
        UPDATE users
        SET 
          unit_solid_weight_id = $1, 
          unit_fluid_weight_id = $2,
          unit_temperature_id = $3
        WHERE user_id = $4
        `, 
        [
          req.body.unit_solid_weight_id,  // 1
          req.body.unit_fluid_weight_id,  // 2
          req.body.unit_temperature_id,   // 3
          req.params.userid,              // 4
        ]
      );
      res.status(200).json(result.rows[0]);
    }
     catch (err) {
       next(err);
     }
  });
}