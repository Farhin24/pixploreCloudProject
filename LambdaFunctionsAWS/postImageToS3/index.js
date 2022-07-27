// Author: Fenil Milankumar Parmar [B00895684]
const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const fs = require('fs');

const BUCKET_NAME = "pixploreimags";

const s3 = new AWS.S3();


exports.handler = async (event, context) => {
    console.log(event);
    const headers = {
      "Content-Type": "application/json"
    };


    const response = {
        isBase64Encoded: false,
        statusCode: 200,
        body: JSON.stringify({ message: "Successfully uploaded file to S3" }),
        headers
    };

    try {
        const parsedBody = JSON.parse(event.body);
        const base64File = parsedBody.file;
        const decodedFile = Buffer.from(base64File.replace(/^data:image\/\w+;base64,/, ""), "base64");
        const params = {
            Bucket: BUCKET_NAME,
            Key: Date.now() +'.jpeg' ,
            Body: decodedFile,
            ContentType: "image/jpeg",
            ACL:'public-read'
        };

        const uploadResult = await s3.upload(params).promise();

          await dynamo
          .put({
            TableName: "postByUserId",
            Item: {
              ImgId: uploadResult.Location.toString(),
              user_id: parsedBody.user_id,
              title: parsedBody.title,
              description: parsedBody.description,
              postedAt: Date.now()
            }
          })
          .promise();


        response.body = JSON.stringify({ message: "Successfully uploaded file to S3", uploadResult });
        console.log(uploadResult.Location); //location of the photo.
    } catch (e) {
        console.error(e);
        response.body = JSON.stringify({ message: "File failed to upload", errorMessage: e });
        response.statusCode = 500;
    }

    return response;    
  
};
