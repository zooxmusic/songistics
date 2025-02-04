require("dotenv").config();
const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const checkConnection = async () => {
  try {
    const data = await client.send(new ListTablesCommand({}));
    console.log("DynamoDB Connection Successful. Tables:", data.TableNames);
  } catch (err) {
    console.error("DynamoDB Connection Failed:", err);
  }
};

checkConnection();
