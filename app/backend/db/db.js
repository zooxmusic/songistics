require("dotenv").config();
const knex = require("knex");
const config = require("./knexfile");

const db = knex(config.development);

// Auto-run migrations on startup
db.migrate
  .latest()
  .then(() => console.log("Database is up to date"))
  .catch((err) => console.error("Migration failed", err));

module.exports = db;
