'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controllers/projectController');
const authMiddleware = require('../middleware/auth');
router.use(authMiddleware);

router.get('/', controller.get);

module.exports = router;