const express = require('express');
const alcoholReviewController = require('../controllers/reviewController');
const accountController = require('./../controllers/accountController');

const router = express.Router();

router.use(accountController.protect);

router
    .route('/')
    .get(alcoholReviewController.getAllReviews)
    .post(alcoholReviewController.createReview);
router
    .route('/:id')
    .get(alcoholReviewController.getReview)
    .patch(alcoholReviewController.updateReview)
    .delete(alcoholReviewController.deleteReview);

module.exports = router;
