const express = require('express');
const alcoholReviewController = require('../controllers/alcoholReviewController');
const accountController = require('./../controllers/accountController');

const router = express.Router();

router.use(accountController.protect);
//router.use(accountController.restrictTo('admin', 'moderator', 'user'));

router
    .route('/')
    .get(alcoholReviewController.getAllAlcoholReviews)
    .post(alcoholReviewController.createAlcoholReview);

router
    .route('/:id')
    .get(alcoholReviewController.getAlcoholReview)
    .patch(alcoholReviewController.updateAlcoholReview)
    .delete(alcoholReviewController.deleteAlcoholReview);

module.exports = router;
