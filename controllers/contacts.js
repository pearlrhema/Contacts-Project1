const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET all contacts
const getAllContacts = async (req, res) => {
  // #swagger.tags = ['Contacts'];
  // #swagger.description = 'Get all contacts'
  const result = await mongodb.getdatabase().db().collection("Contacts").find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
};

// GET contact by ID
const getContactById = async (req, res) => {
  // #swagger.tags = ['Contacts'];
  // #swagger.description = 'Get contact by ID'
  const contactId = req.params.id;
  if (!ObjectId.isValid(contactId)) {
    return res.status(400).json({ error: 'Invalid contact ID format' });
  }

  try {
    const contact = await mongodb.getdatabase().db().collection("Contacts").findOne({ _id: new ObjectId(contactId) });
    if (!contact) return res.status(404).json({ error: 'Contact not found' });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create contact
const createContact = async (req, res) => {
  // #swagger.tags = ['Contacts'];
  // #swagger.description = 'Create a new contact'
  const newContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };

  try {
    const result = await mongodb.getdatabase().db().collection("Contacts").insertOne(newContact);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// PUT update contact
const updateContact = async (req, res) => {
  // #swagger.tags = ['Contacts'];
  // #swagger.description = 'Update a contact'
  const contactId = req.params.id;
  if (!ObjectId.isValid(contactId)) {
    return res.status(400).json({ error: 'Invalid contact ID format' });
  }

  const updatedContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };

  try {
    const result = await mongodb.getdatabase().db().collection("Contacts").updateOne(
      { _id: new ObjectId(contactId) },
      { $set: updatedContact }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE contact
const deleteContact = async (req, res) => {
  // #swagger.tags = ['Contacts'];
  // #swagger.description = 'Delete a contact'
  const contactId = req.params.id;
  if (!ObjectId.isValid(contactId)) {
    return res.status(400).json({ error: 'Invalid contact ID format' });
  }

  try {
    const result = await mongodb.getdatabase().db().collection("Contacts").deleteOne({ _id: new ObjectId(contactId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};
