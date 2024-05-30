require('dotenv').config();
const mongoose = require('mongoose');

function dbConnection() {
    mongoose.connect(process.env.MONGODB_URI, {dbName: process.env.DB_NAME}).then(() => {
        console.log('MongoDB is connected ..!');
    }).catch((e) => {
        console.log('Connection is not connected');
    })
}

module.exports = dbConnection;
