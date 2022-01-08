require("dotenv").config();
const db = require("../db");
const express = require("express");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const validate = require("../middlewares/validate")
const authorize = require("../middlewares/authorize")
const jwtGenerator = require("../utils/jwtGenerator");

module.exports = (app) => {
  const endpoint = process.env.API_ENDPOINT;
  // primary middleware
  app.use(morgan('dev'));
  app.use(express.json());

  app.post(endpoint + "/registration", validate, async (req, res, next) => {
    try {
      const existingUser = await db.query(`SELECT * FROM USERS WHERE email = $1`, [req.body.email])

      if (existingUser.rows.length !== 0) {
        return res.status(409).json("User already exists.")
      }

      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      const bcryptedPwd = await bcrypt.hash(req.body.password, salt);

      const result = await db.query(`
        INSERT INTO
        USERS (
          username, 
          email, 
          password,
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
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING *`,
        [
          req.body.username,
          req.body.email,
          bcryptedPwd,
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

      const token = jwtGenerator(result.rows[0].user_id);
      res.status(200).json({token: token});

    } catch (error) {
      next(error);
    }
  });

  app.post(endpoint + "/login", validate, async (req, res, next) => {
    try {
      const existingUser = await db.query(`SELECT * FROM USERS WHERE email = $1`, [req.body.email])

      if (existingUser.rows.length === 0) {
        return res.status(401).json("Email or Password is incorrect")
      }

      const validPassword = await bcrypt.compare(req.body.password, existingUser.rows[0].password);

      if (!validPassword) {
        return res.status(401).json("Email or Password is incorrect")
      }

      const token = jwtGenerator(existingUser.rows[0].user_id);
      res.status(200).json({token: token});

    } catch (error) {
      next(error);
    }
  });

  app.get(endpoint + "/authorized", authorize, async (req, res, next) => {
    try {
      res.status(200).json(true);
    } catch (error) {
      next(error);
    }
  });
}