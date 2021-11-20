// node-postgres.com

require("dotenv").config();
const express = require("express");
const db = require("./db");

const morgan = require("morgan");

const app = express();

// primary middleware
app.use(express.json());

// Get all beans of a user
app.get("/api/v1/beans/:userid/all", async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM beans WHERE user_id = $1", [req.params.userid]);
        
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: results.rows,
        });
    } catch (error) {
        next(error);
    }
});

// create beans of a user
app.post("/api/v1/beans/:userid", async (req, res) => {
    try {
        const results = await db.query(
            `INSERT INTO 
            beans (user_id, bean_name, origins, farmers, varieties, processes, grade, roaster, roast_level, roast_date) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *`,
            [
                req.params.userid,
                req.body.bean_name,
                req.body.origins,
                req.body.farmers,
                req.body.varieties,
                req.body.processes,
                req.body.grade,
                req.body.roaster,
                req.body.roast_level,
                req.body.roast_date
            ]
        );

        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: results.rows,
        });
        
    } catch (error) {
        next(error);
    }
});

// update beans of a user
app.post("/api/v1/beans/:userid/:beanid", async (req, res) => {
    try {
        const results = await db.query(
            `UPDATE beans 
            SET bean_name = $1, origins = $2, farmers = $3, varieties = $4, processes = $5, grade = $6, roaster = $7, roast_level = $8, roast_date = $9
            WHERE user_id = $10 AND bean_id = $11 RETURNING *`,
            [
                req.body.bean_name,
                req.body.origins,
                req.body.farmers,
                req.body.varieties,
                req.body.processes,
                req.body.grade,
                req.body.roaster,
                req.body.roast_level,
                req.body.roast_date,
                req.params.userid,
                req.params.beanid
            ]
        );

        res.status(200).json({
            status: "success",
            results: results.rows.length,
            body: results.rows
        });

    } catch (error) {
        next(error);
    }
});

// delete beans of a user
app.delete("/api/v1/beans/:userid/:beanid", async (req, res) => {
    try {
        const results = await db.query(
            "DELETE FROM beans WHERE user_id = $1 AND bean_id = $2",
            [req.params.userid, req.params.beanid]
        );

        res.status(200).json({
            status: "success",
            body: results.body
        });

    } catch (error) {
        next(error);
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is up and listening on port http://localhost:${port}/`);
});