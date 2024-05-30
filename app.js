const express = require('express');
const app = express();
const dbConnection = require('./config/dbconnection');
const initRoute = require('./config/router');
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(3000, async () => {
    console.log('server run on PORT', process.env.PORT);
    console.log('Node version', process.version)
    await dbConnection();
    initRoute(app);
});
