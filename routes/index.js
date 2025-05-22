// const express = require('express');
// const router = express.Router(); this two lines could be combined into line 4

// const { createContact } = require('../controllers/contacts');

const router = require('express').Router();

const getAllContacts = require('../controllers/contacts').getAllContacts;

const createContact = require('../controllers/contacts').createContact;

// const contacts = require('./contacts');

router.get('/', (req, res) => {
  res.send('CSE341 - Godwin Essien Contacts Project');
});

router.use('/contacts', getAllContacts);

router.use('/createContacts', createContact);

module.exports = router;

// CONTINUE FROM DEPLOY AND TEST