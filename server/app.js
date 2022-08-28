require("dotenv").config();

const express = require("express");
      CognitoExpress = require("cognito-express"),
      port = process.env.PORT || 4001;;

const app = module.exports = express(),
      authenticatedRoute = express.Router();
      
const morgan = require("morgan");
const cors = require("cors");

app.use(cors());
// app.use(morgan("combined", { skip: (req, res) => process.env.REACT_APP_NODE_ENV === 'test' }));
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", authenticatedRoute);

//Initializing CognitoExpress constructor
const cognitoExpress = new CognitoExpress({
	region: "eu-west-1",
	cognitoUserPoolId: "eu-west-1_bVi3NaKbg",
	tokenUse: "access", //Possible Values: access | id
	tokenExpiration: 3600000 //Up to default expiration of 1 hour (3600000 ms)
});

//Our middleware that authenticates all APIs under our 'authenticatedRoute' Router
authenticatedRoute.use(function(req, res, next) {
	
	//I'm passing in the access token in header under key accessToken
	let accessTokenFromClient = req.headers.accesstoken;

	//Fail if token not present in header. 
	if (!accessTokenFromClient) {
    const err = new Error("Access Token is missing");
    err.status = 401;
    next(err);
  }

	cognitoExpress.validate(accessTokenFromClient, function(err, response) {
		
		//If API is not authenticated, Return 401 with error message. 
		if (err) {
        const err = new Error("Not authorized");
        err.status = 401;
        next(err);
    }
		
		//Else API has been authenticated. Proceed.
		res.locals.user = response;
		next();
	});
});

require("./routes/beans.js")(app);
require("./routes/recipes.js")(app);
require("./routes/ranges.js")(app);

app.use((req, res, next) => {
  // Todo: redirect to 404 page...
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