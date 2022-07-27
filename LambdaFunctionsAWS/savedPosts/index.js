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
      TableName : 'savedPosts',
      Key :{ 'user_id':{S:requestJSON.user_id}}
    };
    var ans = await dynamodb.getItem(params2).promise();
      if(ans.Item== null){
   
      var params1={
      TableName:"savedPosts",
      
      Item:{
          user_id:  requestJSON.user_id  ,
          key:requestJSON.key ,
      },
    };
    await docClient.put(params1).promise();
    
    }
    else{
      const ids = ans.Item.key;
      console.log(ids);
      var map = new Map(Object.entries(ids));
      var prev = map.get('S');
      
      console.log(prev.toString());
      var params3={
      TableName:"savedPosts",
      Item:{
          user_id: requestJSON.user_id ,
          key:prev.toString()+"," + requestJSON.key
          
      },};
     await docClient.put(params3).promise();
    }            
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    return {
    statusCode,
    body:"enjoy",
    headers
  };
      }

  
};
