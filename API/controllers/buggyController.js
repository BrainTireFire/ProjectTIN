const ErrorHandler = require("../utilities/errorHandler");

const handleCastError = err => {
    const message = `Invalid ${err.path}: ${err.value}!`;
    return new ErrorHandler(message, 400);
};

const handleObjectIdError = err => {
    const message = `Invalid ${err.path}: ${err.value}!`;
    return new ErrorHandler(message, 400);
};

const handleJWTError = () => {
    return new ErrorHandler('Invalid token. Please log in again!', 401);
};

const handleJWTExpiredError = () => {
    return new ErrorHandler('Your token has expired. Please log in again!', 401);
};

const handleDublicatedFields = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/);

    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new ErrorHandler(message, 400);
};

const handleValidationError = err => {
    const errors = Object.values(err.errors).map(el => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return new ErrorHandler(message, 400);
};

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        error: true,
        err: err,
        message: err.message,
        stack: err.stack
    });
};

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            error: true,
            message: err.message
        });
    } else {
        console.error('ERROR ', err);
        res.status(500).json({
            message: 'Something went very wrong!'
        });
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'ERROR';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
        console.log("error ", error);

        if (error.name === 'CastError') {
            error = handleCastError(error);
        }
        if (error.kind === 'ObjectId') {
            error = handleObjectIdError(error);
        }
        if (error.code === 11000) {
            error = handleDublicatedFields(error);
        }
        if (error.errors) {
            error = handleValidationError(error);
        }
        if (error.name === 'JsonWebTokenError') {
            error = handleJWTError(error);
        }
        if (error.name === 'TokenExpiredError') {
            error = handleJWTExpiredError(error);
        }


        sendErrorProd(error, res);
    }
};
