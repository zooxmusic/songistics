import { put, get } from "./db";

const addSong = async (song)  =>  {
    const params = {
        TableName: 'songistics', 
        Item: song,
    };
    await put(params).promise()
    console.log("*Song added", song);
};

const getSong = async (id) => {
    const params = {
        TableName: "songistics",
        key: { id },
    };
    const result = await get(params).promise();
    console.log("Fetched songL", result.Item);
};
export default { addSong, getSong };