require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = module.exports = express();
const port = process.env.PORT || 4001;
const cors = require("cors");

app.use(cors());
// app.use(morgan("combined", { skip: (req, res) => process.env.REACT_APP_NODE_ENV === 'test' }));
app.use(morgan("dev"));
app.use(express.json());

require("./routes/beans.js")(app);
require("./routes/recipes.js")(app);
require("./routes/ranges.js")(app);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

app.listen(port, () => {
    console.log(`Server is up and listening on port http://localhost:${port}/`);
});