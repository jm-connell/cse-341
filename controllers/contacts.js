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

async function createContact(req, res) {
  try {
    /* Connect to DB and get values from req */
    const client = await connectDB();
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    /* Check all values are present */
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ error: "All fields are required" });
    }

    /* Send request to DB, respond with 201 status if successful */
    const newContact = { firstName, lastName, email, favoriteColor, birthday };
    const result = await client
      .db("contacts")
      .collection("contacts")
      .insertOne(newContact);
    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the contact" });
  }
}

async function updateContact(req, res) {
  try {
    /* Connect to DB and get values from req */
    const client = await connectDB();
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    /* Check at least one value to update is present */
    if (!firstName && !lastName && !email && !favoriteColor && !birthday) {
      return res
        .status(400)
        .json({ error: "At least one update field is required." });
    }

    /* Prepare the update data */
    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;
    if (favoriteColor) updateData.favoriteColor = favoriteColor;
    if (birthday) updateData.birthday = birthday;

    /* Send request to DB */
    const result = await client
      .db("contacts")
      .collection("contacts")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updateData });

    /* Respond with 404 if contact not found */
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }

    /* Respond with 204 if update is successful */
    res.status(204).json({ id: result.matchedCount });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the contact" });
  }
}

async function deleteContact(req, res) {
  try {
    /* Connect to DB */
    const client = await connectDB();

    /* Send request to DB */
    const result = await client
      .db("contacts")
      .collection("contacts")
      .deleteOne({ _id: new ObjectId(req.params.id) });

    /* Respond with 404 if contact not found */
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }

    /* Respond with 200 if delete is successful */
    if (result.deletedCount > 0) {
      res.status(200).json({ deletedCount: result.deletedCount });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the contact" });
  }
}

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
