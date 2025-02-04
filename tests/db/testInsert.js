const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const connection = require('../../..app/backend/db/connection')

const addSongTopic = async () => {
  const params = {
    TableName: "songistics",
    Item: {
      id: { S: "topic-1" },
      type: { S: "song_topic" },
      name: { S: "Love" },
      description: { S: "Songs about love and relationships." },
    },
  };

  try {
    await connection.send(new PutItemCommand(params));
    console.log("Song topic added successfully!");
  } catch (err) {
    console.error("Error adding song topic:", err);
  }
};

addSongTopic();
