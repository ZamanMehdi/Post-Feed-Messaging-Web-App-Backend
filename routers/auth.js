const express = require('express');

const authControllers = require('../controllers/auth');

const router = express.Router();

router.put('/signup', authControllers.signUp);

module.exports = router;