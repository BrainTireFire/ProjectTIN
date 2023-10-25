const User = require('../models/userModel');
const catchAsync = require('./..//utilities/catchAsync');
const ErrorHandler = require('./../utilities/ErrorHandler')

const filterObj = (obj, ...allowedFields) => {
    let newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) {
            newObj[el] = obj[el];
        }
    });
    return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        users
    });
});

exports.updateCurrentUser = catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
        return next(new ErrorHandler('You can not changed password here! Please use updatePassword', 400));
    }

    const filderBodyData = filterObj(req.body, 'name', 'email');
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filderBodyData, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        user: updatedUser
    });
});

exports.deleteCurrentUser = catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
        return next(new ErrorHandler('You can not changed password here! Please use updatePassword', 400));
    }

    const user = await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json();
});

exports.getCurrentUser = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    res.status(200).json(user);
});

exports.createUser = (req, res, next) => {
    res.status(500).json({
        status: 'error',
        message: 'This route not yet defined'
    });
};

exports.updateUser = (req, res, next) => {
    res.status(500).json({
        status: 'error',
        message: 'This route not yet defined'
    });
};

exports.deleteUser = (req, res, next) => {
    res.status(500).json({
        status: 'error',
        message: 'This route not yet defined'
    });
};
