
const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body = "";
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };



  try {
    let requestJSON = JSON.parse(event.body);
    let items = await dynamo.scan({
      TableName: "postByUserId"
    }).promise();
    let bodyItems = items.Items

    for (let i = 0; i < bodyItems.length; i++) {
      if (bodyItems[i].user_id === requestJSON.user_id) {
        body = body + bodyItems[i].ImgId + ",";
      }
    }
    body = body.substr(0, body.length - 1);
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    return {
      statusCode,
      body,
      headers
    };
  }


};
