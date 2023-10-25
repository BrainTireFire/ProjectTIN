const express = require('express');
const alcoholController = require('../controllers/alcoholController');
const accountController = require('./../controllers/accountController');

const router = express.Router();

router.use(accountController.protect);

router
    .route('/')
    .get(accountController.restrictTo('admin', 'moderator', 'user'), alcoholController.getAllAlcohols)
    .post(accountController.restrictTo('admin', 'moderator'), alcoholController.createAlcohol);
router
    .route('/:id')
    .get(accountController.restrictTo('admin', 'moderator', 'user'), alcoholController.getAlcohol)
    .patch(accountController.restrictTo('admin', 'moderator', 'user'), alcoholController.updateAlcohol)
    .delete(accountController.restrictTo('admin'), alcoholController.deleteAlcohol);

module.exports = router;
