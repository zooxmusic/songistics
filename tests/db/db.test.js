require("dotenv").config();
const { DynamoDBClient, PutItemCommand, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const client = require("../../app/backend/db/db");

log(client.credentials + "*********************************************************")

const TABLE_NAME = "songistics";

// Test inserting a song topic
test("Add a song topic to DynamoDB", async () => {
  const params = {
    TableName: TABLE_NAME,
    Item: marshall({
      id: "test-topic-1",
      type: "song_topic",
      name: "Test Topic",
      description: "A test topic for Jest testing.",
    }),
  };

  await client.send(new PutItemCommand(params));

  // Fetch and verify the record
  const getParams = {
    TableName: TABLE_NAME,
    Key: marshall({ id: "test-topic-1" }),
  };

  const { Item } = await client.send(new GetItemCommand(getParams));
  expect(unmarshall(Item)).toEqual({
    id: "test-topic-1",
    type: "song_topic",
    name: "Test Topic",
    description: "A test topic for Jest testing.",
  });
});
