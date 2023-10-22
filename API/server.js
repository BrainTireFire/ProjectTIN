const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
    console.log('ERROR: ', err.name, err.message);
    console.log('Uncaught Exception! Shutting down...');
    process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const ConnectionString = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(ConnectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Connect to the DB successful!");
});

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});

process.on('unhandledRejection', err => {
    console.log('ERROR: ', err.name, err.message);
    console.log('Unhandled rejection! Shutting down...');
    server.close(() => {
        process.exit(1);
    });
});