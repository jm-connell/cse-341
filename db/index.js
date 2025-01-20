require("dotenv").config();
const { MongoClient } = require("mongodb");

async function main() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  /* Get list of databases in cluster */
  try {
    await client.connect();
    await listDatabases(client);
  } catch (e) {
    console.error("Error listing databases: ", e);
  } finally {
    await client.close();
  }

  return;
}

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

main().catch(console.error);
