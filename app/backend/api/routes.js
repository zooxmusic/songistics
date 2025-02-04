const express = require("express");
const router = express.Router();
const { getTopics, addTopic } = require("../db/queries");

// Get all topics
router.get("/topics", async (req, res) => {
  const topics = await getTopics();
  res.json(topics);
});

// Add a topic
router.post("/topics", async (req, res) => {
  const newTopic = await addTopic(req.body);
  res.status(201).json(newTopic);
});

module.exports = router;

// const express = require("express")
// const externalRoutes = require("./externalRoutes");

// const router = express.Router();

// router.use("/tools", externalRoutes);
// module.exorts = router;