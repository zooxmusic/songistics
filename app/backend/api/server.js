require("dotenv").config();
const express = require("express");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// require("dotenv").config();
// const express = require("express");
// const routes = require("./routes")

// const app = express();
// app.use(express.json)
// app.use("/api", routes);

// const OPRT = process.env.PORT || 3000
// app.listen(PORT, () => {
//     console.log('Server running on http://localhost:${PORT}')
// })

// const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

// const client = new DynamoDBClient({
//   region: process.env.AWS_REGION || "us-east-1",
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// console.log("DynamoDB client initialized");

// module.exports = client;