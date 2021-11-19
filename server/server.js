require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();

// primary middleware
app.use(express.json());

app.get("/api/v1/beans/:userid", (req, res) => {
    res.status(200).json({
        status: "success",
        beans: "All beans",
        userid: req.params,
    });
});

app.post("/api/v1/beans/:userid", (req, res) => {
    console.log(req.body)
});

app.post("/api/v1/beans/:userid/:beanid", (req, res) => {
    console.log(req.body)
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is up and listening on port http://localhost:${port}/`);
});