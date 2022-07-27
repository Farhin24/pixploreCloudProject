console.log('Loading function');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
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
        let inter = b.interests.toString();
        inter = inter.split(",");
        let finkeys = "";
        for (var i = 0; i < inter.length; i++) {
            console.log(inter[i]);
            var params1 = {
                TableName: 'ImageLabels',
                Key: { 'LabelName': { S: inter[i] } }
            };
            body = await dynamodb.getItem(params1).promise();
            if (body.Item == null) {

            }
            else {
                var map = new Map(Object.entries(body.Item.ImgId));
                var prev = map.get('S');
                finkeys = prev + "," + finkeys;
            }
        }

        finkeys = finkeys.split(",");


        finkeys = finkeys.reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, []);


        var Ids = "";
        for (var i = 0; i < finkeys.length - 1; i++) {
            console.log(finkeys[i]);
            var params2 = {
                TableName: 'ImageKey',
                Key: { 'key': { S: finkeys[i] } }
            };
            body = await dynamodb.getItem(params2).promise();
            if (body.Item == null) {

            }
            else {
                var map1 = new Map(Object.entries(body.Item.Img));
                var prev1 = map1.get('S');
                Ids = prev1 + "," + Ids;
            }
        }
        Ids = Ids.substr(0, Ids.length - 1);
        body = Ids;

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
