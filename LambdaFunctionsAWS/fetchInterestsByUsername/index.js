console.log('Loading function');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
const dynamodb = new AWS.DynamoDB();

exports.handler = async (event, context) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    let body;
    let statusCode = '200';
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        let b = JSON.parse(event.body);
        let body = await gettingItem(b.user_id);

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


async function gettingItem(user_id) {
    try {
        var paramsItem = {
            Key: {
                "user_id": { "S": user_id }
            },
            TableName: 'interests'
        };
        var result = await dynamodb.getItem(paramsItem).promise();
        if (result.Item !== undefined && result.Item !== null) {
            // console.log(result.Item.frequency)
            const mapIntem = new Map(Object.entries(result.Item.interests));
            // console.log(parseInt(mapIntem.get('N')));
            return mapIntem.get('S');

        }
        return 0;

    } catch (error) {
        console.error(error);
    }
}
