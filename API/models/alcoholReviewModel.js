const mongoose = require('mongoose');

const alcoholReviewSchema = new mongoose.Schema({
    alcohol: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alcohol'
    },
    review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    },
    timestamp: {
        type: Date,
        require: [true, "Missing data"]
    }
});

const AlcoholReview = mongoose.model('AlcoholReview', alcoholReviewSchema);

module.exports = AlcoholReview;
