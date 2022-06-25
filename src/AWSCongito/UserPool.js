import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_yqbrKC7d7",
    ClientId: "3sm24r0l2asicgin5n4cmpv112"
}

export default new CognitoUserPool(poolData);