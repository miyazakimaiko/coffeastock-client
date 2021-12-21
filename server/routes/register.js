// node-postgres.com
const db = require("../db");
const express = require("express");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const utils = require("../utils");

module.exports = (app) => {
  // primary middleware
  app.use(morgan('dev'));
  app.use(express.json());

  app.post("/api/v1/register", async (req, res, next) => {
    try {
      const existingUser = await db.query(`SELECT * FROM USERS WHERE email = $1`, [req.body.email])

      if (existingUser.rows.length !== 0) {
        return res.status(409).json({
          status: "Conflict",
          message: "User already exists"
        })
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
          variety_range, 
          process_range, 
          method_range
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [
          req.body.username,
          req.body.email,
          bcryptedPwd,
          {
            "1": {
              "country": "Ethiopia",
              "region": [
                "Yirgacheffe", 
                "Sidamo", 
                "Kaffa"
              ]
            },
            "2": {
              "country": "Kenya",
              "region": [
                "Ruiri", 
                "Thika", 
                "Kirinyaga"
              ]
            }
          },
          {
            "1": "Typica",
            "2": "Caturra",
            "3": "Burbon"
          },
          {
            "1": "Washed",
            "2": "Semi-Washed",
            "3": "Natural"
          },
          {
            "1": "French Press",
            "2": "Espresso",
            "3": "Mocha Pot"
          }
        ]
      );

      const token = utils.jwtGenerator(result.rows[0].user_id);

      res.status(200).json({
        status: "success",
        results: result.rows.length,
        data: result.rows,
        token: token
      });
    } catch (error) {
      next(error);
    }
  });
}