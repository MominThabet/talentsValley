const express = require('express');
const {
  Created,
  Ok,
} = require('../../../../utils/responses/success/successes');
const router = express.Router();

router.post('/signup', (req, res, next) => {
  next(new Created('user is created', 'user data'));
});
router.post('/login', (req, res, next) => {
  next(new Ok('user Logged in', 'token?'));
});

module.exports = router;
