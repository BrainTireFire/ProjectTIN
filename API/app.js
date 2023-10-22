const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const sanitizeMongo = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const ErrorHandler = require('./utilities/errorHandler');
const buggyController = require('./controllers/buggyController');
const alcoholRouter = require('./routes/alcoholRoutes');
const userRouters = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const alcoholReviewRoutes = require('./routes/alcoholReviewRoutes');
const accountRoutes = require('./routes/accountRoutes');
const cookieParser = require('cookie-parser');

const app = express();

//Middleware
const allowedOrigins = ['http://localhost:3000'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};
app.use(cors(corsOptions));

app.use(helmet()); //http headers
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
const limiter = rateLimit({
    max: 50,
    window: 30 * 60 * 1000,
    message: 'To many requests from this IP, please try again in an half hour!'
});
app.use('/api', limiter); //limiter of requests
app.use(express.json({ //body limit
    limit: '10kb'
}));
app.use(cookieParser());

app.use(sanitizeMongo()); //sanization data query injection
app.use(xss()); //sanization data xss
app.use(hpp({ //parametr polution
    whitelist: [
        'name',
        'description',
        'age',
        'alcohol_percentage',
        'price',
        'type',
        'price',
        'rating'
    ]
}));

//Routes
app.use('/api/v1/alcohols', alcoholRouter);
app.use('/api/v1/users', userRouters);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/alcoholReviews', alcoholReviewRoutes);
app.use('/api/v1', accountRoutes);

app.all('*', (req, res, next) => {
    next(new ErrorHandler(`Cant find ${req.originalUrl} on this app!`, 404));
});

app.use(buggyController);

module.exports = app;


