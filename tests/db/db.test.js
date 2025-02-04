require("dotenv").config();
const { DynamoDBClient, PutItemCommand, GetItemCommand, DeleteItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const testData = require("./testData.json");

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const TABLE_NAME = "songistics";

// Insert test data
const insertTestData = async () => {
  for (const category in testData) {
    for (const item of testData[category]) {
      const params = {
        TableName: TABLE_NAME,
        Item: marshall(item),
      };
      await client.send(new PutItemCommand(params));
    }
  }
};

// Fetch an item
const getItem = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: marshall({ id }),
  };
  const { Item } = await client.send(new GetItemCommand(params));
  return unmarshall(Item);
};

// Delete an item
const deleteItem = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: marshall({ id }),
  };
  await client.send(new DeleteItemCommand(params));
};

// Run tests
describe("DynamoDB Data Integrity Tests", () => {
  beforeAll(async () => {
    await insertTestData();
  });

  test("Verify song topics exist", async () => {
    for (const expectedTopic of testData.song_topics) {
      const actualTopic = await getItem(expectedTopic.id);
      expect(actualTopic).toEqual(expectedTopic);
    }
  });

  test("Verify song concepts exist", async () => {
    for (const expectedConcept of testData.song_concepts) {
      const actualConcept = await getItem(expectedConcept.id);
      expect(actualConcept).toEqual(expectedConcept);
    }
  });

  test("Verify song titles exist", async () => {
    for (const expectedTitle of testData.song_titles) {
      const actualTitle = await getItem(expectedTitle.id);
      expect(actualTitle).toEqual(expectedTitle);
    }
  });

  test("Delete a song title and verify deletion", async () => {
    const testId = testData.song_titles[0].id;
    await deleteItem(testId);
    const deletedTitle = await getItem(testId);
    expect(deletedTitle).toBeUndefined();
  });
});
