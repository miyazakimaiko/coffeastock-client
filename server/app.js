require("dotenv").config();
const express = require("express");
const app = module.exports = express();
const port = process.env.PORT || 3001;

require("./routes/beans.js")(app);
require("./routes/recipes.js")(app);

app.listen(port, () => {
    console.log(`Server is up and listening on port http://localhost:${port}/`);
});