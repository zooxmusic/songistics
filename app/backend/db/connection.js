require("dotenv").config();

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const connection = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

console.log("DynamoDB client initialized");

module.exports = connection;
