const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

const validate = require('../middlewares/validate');

router.get('/', contactsController.getAllContacts);

router.get('/:id', contactsController.getContactById);

router.post('/', validate.saveContact, contactsController.createContact);

router.put('/:id', validate.saveContact, contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;

