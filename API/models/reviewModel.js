const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
        max: [10, 'Rating must be less or equal  10.0'],
        min: [1, 'Rating must be above or equal 1.0']
    },
    comment: {
        type: String,
        required: true,
        maxlength: [800, 'An review comment must have less then 800 characters'],
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
