const express = require('express');
const app = express();
const dbConnection = require('./config/dbconnection');
const initRoute = require('./config/router');
const expressWinston = require('express-winston');
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('winston-mongodb')
const logger = require('./logger')

app.use(expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true
}))

app.listen(3000, async () => {
    console.log('server run on PORT', process.env.PORT);
    console.log('Node version', process.version)
    await dbConnection();
    initRoute(app);
});
