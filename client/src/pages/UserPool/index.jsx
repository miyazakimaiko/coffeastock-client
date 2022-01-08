import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: "eu-west-1_bVi3NaKbg",
  ClientId: "73gvj7hvbmobo1fvfotecjl5mu"
}

export default new CognitoUserPool(poolData);