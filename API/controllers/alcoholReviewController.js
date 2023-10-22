const AlcoholReview = require('../models/alcoholReviewModel');
const APIExtensions = require('./../utilities/apiExtensions');
const catchAsync = require('./..//utilities/catchAsync');

exports.getAllAlcoholReviews = catchAsync(async (req, res, next) => {
    const extensions = new APIExtensions(AlcoholReview.find(), req.query).filter().sort().fieldsLimit().pagination();
    const alcoholReviews = await extensions.query.populate('alcohol').populate('review');

    res.status(200).json({
        alcoholReviews
    });
});

exports.getAlcoholReview = catchAsync(async (req, res, next) => {
    const alcoholReview = await AlcoholReview.findById(req.params.id).populate('alcohol').populate('review');

    res.status(200).json({
        alcoholReview
    });
});

exports.createAlcoholReview = catchAsync(async (req, res, next) => {
    const newAlcoholReview = await AlcoholReview.create(req.body);

    res.status(201).json({
        alcoholReview: newAlcoholReview
    });
});

exports.updateAlcoholReview = catchAsync(async (req, res, next) => {
    const alcoholReviews = await AlcoholReview.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        alcoholReviews
    });
});

exports.deleteAlcoholReview = catchAsync(async (req, res, next) => {
    await AlcoholReview.findByIdAndRemove(req.params.id);

    res.status(204).json();
});
