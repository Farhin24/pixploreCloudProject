'use strict'

const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION })
var rekognition = new AWS.Rekognition();

const docClient = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
const dynamodb = new AWS.DynamoDB();


exports.handler = async (event) => {
  const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT"
        },
        body: JSON.stringify('Hello from Lambda!'),
    };
  const imgName = event.Records[ 0 ].s3.object.key;
  console.log(imgName);
  const bucket = event.Records[ 0 ].s3.bucket.name;
  const Key = Date.now();
    var params={
      TableName:"ImageKey",
      Item:{
          key:Key.toString()  ,
          Img: 'https://pixploreimags.s3.amazonaws.com/' + imgName,
      },
    };
    await docClient.put(params).promise();
    await processImage(event, bucket,imgName,Key);
    // return 'finished';
    return response;
};

const processImage = async function (event, bNam,iNam,key) {
  console.log(iNam);
  console.log(key);
  
  try {
    var params = {
      Image: {
        S3Object: {
          Bucket: bNam,
          Name: iNam
        }
      },
      MinConfidence: 75
    };
    
    let data = await rekognition.detectLabels(params).promise();
    console.log(data);
    for(var i=0; i<data.Labels.length; i++){
      
      //start
    var params2 = {
      TableName : 'ImageLabels',
      Key :{ 'LabelName':{S:data.Labels[i].Name}}
    };
    var ans = await dynamodb.getItem(params2).promise();
      if(ans.Item== null){
      var array = [];
      array.push(key);
      var params1={
      TableName:"ImageLabels",
      
      Item:{
          LabelName:  data.Labels[i].Name  ,
          ImgId:key.toString() ,
      },
    };
    await docClient.put(params1).promise();
    
    }
    else{
      const ids = ans.Item.ImgId;
      console.log(ids);
      var map = new Map(Object.entries(ids));
      var prev = map.get('S');
      
      console.log(prev.toString());
      var params3={
      TableName:"ImageLabels",
      Item:{
          LabelName:  data.Labels[i].Name  ,
          ImgId:prev.toString() +","+key
          
      },};
     await docClient.put(params3).promise();
    }
      //end
      
      
      
      
    
      console.log(data.Labels[i].Name);
      
    }
    
    return 'hi';
    
  } catch (error) {
    console.log(error);
    return error;
  }
};