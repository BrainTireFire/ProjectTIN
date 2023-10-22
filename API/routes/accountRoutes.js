const express = require('express');
const accountController = require('./../controllers/accountController');

const router = express.Router();

router.post('/register', accountController.register);
router.post('/login', accountController.login);
router.get('/account', accountController.getCurrentUser);
router.post('/forgotPassword', accountController.forgotPassword);
router.post('/resetPassword/:token', accountController.resetPassword);

module.exports = router;

