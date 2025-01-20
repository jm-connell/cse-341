const { connectDB } = require("../db");
const { ObjectId } = require("mongodb");

async function getContacts(req, res) {
  try {
    const client = await connectDB();
    const contacts = await client
      .db("contacts")
      .collection("contacts")
      .find()
      .toArray();
    res.json(contacts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching contacts" });
  }
}

async function getContactById(req, res) {
  try {
    const client = await connectDB();
    // query by id
    const contact = await client
      .db("contacts")
      .collection("contacts")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ error: "Contact not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the contact" });
  }
}

const homeRoute = (req, res) => {
  res.send("Jon Connell");
};

const contactRoute = (req, res) => {
  getContacts(req, res);
};

module.exports = {
  homeRoute,
  contactRoute,
  getContacts,
  getContactById,
};
