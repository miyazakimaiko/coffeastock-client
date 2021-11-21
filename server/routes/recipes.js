// node-postgres.com
const db = require("../db");
const express = require("express");
const morgan = require("morgan");


module.exports = (app) => {
    // primary middleware
    app.use(express.json());

    // Get all recipes of a bean
    app.get("/api/v1/recipes/:beanid/all", async (req, res) => {
        try {
            const results = await db.query(`
            SELECT * FROM recipes WHERE bean_id = $1`, 
            [req.params.beanid]);

            res.status(200).json({
                status: "success",
                results: results.rows.length,
                data: results.rows,
            });
        } catch (error) {
            console.log(error);
        }
    });

    // Create a recipe of beans
    app.post("/api/v1/recipes/:beanid", async (req, res) => {
        try {
            const results = await db.query(`
            INSERT INTO recipes (
                bean_id, 
                brew_date, 
                method, 
                grinder, 
                grinder_size, 
                grounds_weight, 
                water_weight, 
                water_type, 
                water_temp, 
                yield_weight,
                brew_time, 
                tds, 
                palate_rates, 
                note
                )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
            RETURNING *`,
            [
                req.params.beanid,
                req.body.brew_date,
                req.body.method, 
                req.body.grinder, 
                req.body.grinder_size, 
                req.body.grounds_weight, 
                req.body.water_weight, 
                req.body.water_type, 
                req.body.water_temp, 
                req.body.yield_weight,
                req.body.brew_time, 
                req.body.tds, 
                req.body.palate_rates, 
                req.body.note
            ]);

            res.status(200).json({
                status: "success",
                results: results.rows.length,
                data: results.rows,
            }); 
        } catch (error) {
            console.log(error);
        }
    }); 
    
    // update a recipe of beans
    app.post("/api/v1/recipes/:beanid/:recipeid", async (req, res) => {
        try {
            const results = await db.query(`
            UPDATE recipes 
            SET 
            brew_date = $1, 
            method = $2, 
            grinder = $3, 
            grinder_size = $4, 
            grounds_weight = $5, 
            water_weight = $6, 
            water_type = $7, 
            water_temp = $8, 
            yield_weight = $9,
            brew_time = $10, 
            tds = $11, 
            palate_rates = $12, 
            note = $13
            WHERE bean_id = $14 AND recipe_id = $15 RETURNING *`,
            [
                req.body.brew_date,
                req.body.method,
                req.body.grinder,
                req.body.grinder_size,
                req.body.grounds_weight,
                req.body.water_weight,
                req.body.water_type,
                req.body.water_temp,
                req.body.yield_weight,
                req.body.brew_time,
                req.body.tds,
                req.body.palate_rates,
                req.body.note,
                req.params.beanid,
                req.params.recipeid
            ]);
    
            res.status(200).json({
                status: "success",
                results: results.rows.length,
                body: results.rows
            });
    
        } catch (error) {
            console.log(error);
        }
    });

    // delete a recipe
    app.delete("/api/v1/recipes/:recipeid", async (req, res) => {
        try {
            const results = await db.query(`
            DELETE FROM recipes WHERE recipe_id = $1`,
            [req.params.recipeid]);
    
            res.status(200).json({
                status: "success",
                body: results.body
            });
    
        } catch (error) {
            console.log(error);
        }
    });
}