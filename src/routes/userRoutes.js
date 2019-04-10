'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.get('/', controller.get);

router.post('/', controller.post);

router.post('/authenticate', controller.postAuthenticate);

router.post('/forgot_password', controller.forgotPassword);

router.post('/reset_password', controller.resetPassword);

router.put('/:id', controller.put);

router.delete('/:id', controller.del);

module.exports = router;