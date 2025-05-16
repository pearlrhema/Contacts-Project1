const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) => {
    const result =  await mongodb.getdatabase().db().collection("Contacts").find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    })
}

const getContactById = async (req, res) => {
    const contactId = req.params.id;
    const result = await mongodb.getdatabase().db().collection("Contacts").find({ _id: ObjectId(contactId) });
    result.toArray().then((contact) => {
        if (contact.length === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact[0]);
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
}

module.exports = {
    getAllContacts,
    getContactById
}