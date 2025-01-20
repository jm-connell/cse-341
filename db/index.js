require("dotenv").config();
const { MongoClient } = require("mongodb");

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    return client;
  } catch (e) {
    console.error(e);
  }
}

module.exports = { connectDB };
