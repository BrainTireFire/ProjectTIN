const express = require('express');
const alcoholController = require('../controllers/alcoholController');
const accountController = require('./../controllers/accountController');

const router = express.Router();

router.use(accountController.protect);
router.use(accountController.restrictTo('admin', 'moderator'));

router
    .route('/')
    .get(alcoholController.getAllAlcohols)
    .post(alcoholController.createAlcohol);
router
    .route('/:id')
    .get(alcoholController.getAlcohol)
    .patch(alcoholController.updateAlcohol)
    .delete(alcoholController.deleteAlcohol);

module.exports = router;
