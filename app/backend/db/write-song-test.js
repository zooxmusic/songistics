const {addSong, getSong } = require(songistics.js)

const testSong = {id: "123", "title": "Test Song", category: "Rock" }

addSong(testSong).then(() => getSong("123"));