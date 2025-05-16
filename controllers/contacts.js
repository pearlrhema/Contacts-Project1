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

    // Validate ObjectId before using it
    if (!ObjectId.isValid(contactId)) {
        return res.status(400).json({ error: 'Invalid contact ID format' });
    }

    try {
        const contact = await mongodb
            .getdatabase()
            .db()
            .collection('Contacts')
            .findOne({ _id: new ObjectId(contactId) });

        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



module.exports = {
    getAllContacts,
    getContactById
}