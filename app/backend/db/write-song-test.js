const {addSong, getSong } = require("./songistics")

const testSong = {sonistics_id: "123", "title": "Test Song", category: "Rock" }

addSong(testSong).then(() => getSong("123"));