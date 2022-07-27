const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();
const docClient = new AWS.DynamoDB.DocumentClient();
const dynamodb = new AWS.DynamoDB();
/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */


exports.handler = async (event, context) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    let body;
    let statusCode = '200';
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        let b = JSON.parse(event.body);
        let id = b.user_id.toString();
        //body = id;
        var params1 = {
            TableName: 'interests',
            Key: { 'user_id': { S: id } }
        };
        body = await dynamodb.getItem(params1).promise();
        if (body.Item == null) {

        }
        else {
            var map = new Map(Object.entries(body.Item.interests));
            var prev = map.get('S');
            body = prev;
        }
    } catch (err) {
        statusCode = '400';
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };
};
