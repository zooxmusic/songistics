const getTopics = async () => {
    const params = {
      TableName: "songistics",
      IndexName: "TypeIndex",
      KeyConditionExpression: "#type = :topic",
      ExpressionAttributeNames: { "#type": "type" },
      ExpressionAttributeValues: { ":topic": { S: "song_topic" } },
    };
    const result = await connection.send(new QueryCommand(params));
    console.log("Topics:", result.Items);
  };
f  