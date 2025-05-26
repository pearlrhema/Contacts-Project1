const validator = require('../helpers/validate');

const saveContact = (req, res, next) => {
  const validationRules = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    favoriteColor: 'string',
    birthday: 'date'
  };

  const customMessages = {
    'firstName.required': 'Please enter a first name.',
    'firstName.string': 'First name must be a text value.',
    'lastName.required': 'Last name is required.',
    'lastName.string': 'Last name must be a valid string.',
    'email.required': 'We need your email address to continue.',
    'email.email': 'That doesn’t look like a valid email address.',
    'favoriteColor.string': 'Favorite color must be a word or phrase.',
    'birthday.date': 'Please enter a valid date for the birthday.'
  };

  validator(req.body, validationRules, customMessages, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed. Please fix the issues and try again.',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveContact
};
//     return res.status(400).json({ error: 'Oops! That contact ID doesn’t look right. Please double-check it and try again.' });