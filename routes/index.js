// const express = require('express');
// const router = express.Router(); this two lines could be combined into line 4

const router = require('express').Router();

const getAllContacts = require('../controllers/contacts').getAllContacts;

// const contacts = require('./contacts');

router.get('/', (req, res) => {
  res.send('CSE341 - Godwin Essien Contacts Project');
});

router.use('/contacts', getAllContacts);

module.exports = router;

// CONTINUE FROM DEPLOY AND TEST