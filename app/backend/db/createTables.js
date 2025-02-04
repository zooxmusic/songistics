const { DynamoDBClient, CreateTableCommand } = require("@aws-sdk/client-dynamodb");

const connection = new DynamoDBClient({ region: "us-east-1" });

const createTable = async () => {
  const params = {
    TableName: "songistics",
    AttributeDefinitions: [
      { AttributeName: "id", AttributeType: "S" },
      { AttributeName: "type", AttributeType: "S" }
    ],
    KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    GlobalSecondaryIndexes: [
      {
        IndexName: "TypeIndex",
        KeySchema: [{ AttributeName: "type", KeyType: "HASH" }],
        Projection: { ProjectionType: "ALL" },
      }
    ],
    BillingMode: "PAY_PER_REQUEST",
  };

  try {
    await connection.send(new CreateTableCommand(params));
    console.log("Table 'songistics' created successfully!");
  } catch (err) {
    console.error("Error creating table:", err);
  }
};

createTable();
