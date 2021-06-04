const express = require('express');
const {
  businessSineUp,
  businessLogin,
  // businessDelete,
  // isBusinessEmailAvailable,
  // businessTokenIsValid,
} = require('../Controllers/AuthBusinessControllers');
const { resAuth } = require('../Middleware/BusinessAuth');

const businessAuthRouter = express.Router();

businessAuthRouter.post('/register', businessSineUp);

businessAuthRouter.post('/login', businessLogin);

// businessAuthRouter.delete('/delete', resAuth, businessDelete);

// businessAuthRouter.post('/email-available', isBusinessEmailAvailable);

// businessAuthRouter.get('/tokenIsValid', businessTokenIsValid);

module.exports = businessAuthRouter;
