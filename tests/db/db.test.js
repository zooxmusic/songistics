require("dotenv").config();
const { DynamoDBClient, PutItemCommand, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const testData = require("../data/testData.json");

const connection = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const TABLE_NAME = "songistics";

// Helper function to add test data
const insertTestData = async () => {
  for (const topic of testData.song_topics) {
    const params = {
      TableName: TABLE_NAME,
      Item: marshall(topic),
    };
    await connection.send(new PutItemCommand(params));
  }
};

// Test inserting and verifying song topics
test("Insert and verify song topics in DynamoDB", async () => {
  await insertTestData();

  for (const expectedTopic of testData.song_topics) {
    const params = {
      TableName: TABLE_NAME,
      Key: marshall({ id: expectedTopic.id }),
    };
    const { Item } = await connection.send(new GetItemCommand(params));

    expect(unmarshall(Item)).toEqual(expectedTopic);
  }
});
