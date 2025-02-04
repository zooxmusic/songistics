require("dotenv").config();
const AWS  = require("aws-sdk")

AWS.config.update({
  region: process.env.AWS_REGION,
  AWS_ACCESS_KEY_IDKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports = dynamoDB;