const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };

  try {
    let requestJSON = JSON.parse(event.body);

    var params2 = {
      TableName: 'postByUserId',
      Key: { 'ImgId': { S: requestJSON.ImgId } }
    };
    var ans = await dynamodb.getItem(params2).promise();
    if (ans.Item == null) {

    }
    else {

      body = ans.Item;
    }

  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    return {
      statusCode,
      body: body,
      headers
    };
  }


};
