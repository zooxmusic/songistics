const express = require("express");
const axios = require("axios");
const router = express.Router();

const RHYMEZONE_API = "https://api.datamuse.com/words?rel_rhy=";

// GET /api/tools/rhyme?word=song
router.get("/tools/rhyme", async (req, res) => {
  const { word } = req.query;
  if (!word) return res.status(400).json({ error: "Missing 'word' parameter" });

  try {
    const response = await axios.get(`${RHYMEZONE_API}${word}`);
    const rhymes = response.data.map((entry) => entry.word);
    res.json({ word, rhymes });
  } catch (error) {
    console.error("Error fetching rhymes:", error);
    res.status(500).json({ error: "Failed to fetch rhymes" });
  }
});

module.exports = router;


// const express = require("express");
// const axios = require("axios");
// const router = express.Router()

// const RHYMEZONE_API = "https://api.datamuse.com./words?rel_rhy="

// const filterByRarity = (words, rarityLevel) => {
//     return words
//         .filter((word) => word.score >= rarityLevel * 10)
//         .sort((a, b) => (rarityLevel > 5) ? b.score - a.score : a.score- 
// )};

// router.get("/tools/rhyme", async (req, res) => { 
//     const { word } = req.query;
//     if(!word) return res.status(400).json({error: "Missing 'word' parameter"});
//     try {
//         const response = await axios.get(`${RHYMEZONE_API}${WORD}`);
//         const rhymes = response.data.map((entry)  => entry.word);
//         res.json({word, rhymes});

//     } catch(error) {
//         console.error("Error fetchihng ryhymes:", error);
//         res.status(500).json({error: "Failed to fetch rhymes" });
//     }
// });