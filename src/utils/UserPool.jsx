import { CognitoUserPool } from 'amazon-cognito-identity-js';

require("dotenv").config();

const poolData = {
  UserPoolId: `${process.env.REACT_APP_COGNITO_USER_POOL_ID}`,
  ClientId: `${process.env.REACT_APP_COGNITO_CLIENT_ID}`,
}

export default new CognitoUserPool(poolData);