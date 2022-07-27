const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };

  try {
    let requestJSON = JSON.parse(event.body);
    await dynamo
      .put({
        TableName: "interests",
        Item: {
          user_id: requestJSON.user_id,
          interests: requestJSON.interests,
          user_name: requestJSON.user_name,
          profile_desc: requestJSON.profile_desc
        }
      })
      .promise();
    body = `Put item ${requestJSON.user_id}`;
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    return {
      statusCode,
      body: "enjoy",
      headers
    };
  }


};
