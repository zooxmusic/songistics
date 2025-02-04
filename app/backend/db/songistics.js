const dynamoDB = require("./connection")

const addSong = async (song)  =>  {
    const params = {
        TableName: 'songistics', 
        Key: "sonistics_id",
        Item: song,
    };
    await dynamoDB.put(params).promise()
    console.log("*Song added", song);
};

const getSong = async (id) => {
    const params = {
        TableName: "songistics",
        key: { sonistics_id },
    };
    const result = await dynamoDB.get(params).promise();
    console.log("Fetched songL", result.Item);
};

module.exports = { addSong, getSong };