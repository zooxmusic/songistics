const { getSongById, getSongTopics } = require("../../backend/db/queries");

describe("Database Queries", () => {
  test("Fetch all song topics", async () => {
    const topics = await getSongTopics();
    expect(Array.isArray(topics)).toBe(true);
  });

  test("Fetch a song by ID", async () => {
    const song = await getSongById("some-test-id");
    expect(song).toHaveProperty("id");
    expect(song).toHaveProperty("title");
  });
});
