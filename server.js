let express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    config = require('./app/config/config'),
    morgan = require('morgan'),
    router = require('express').Router(),
    db = require("./app/models");
    app = express();

//  list routes service

let loginRoutes = require('./app/routes/loginRoutes');
let boardRoutes = require('./app/routes/boardRoutes');
let menuRoutes = require('./app/routes/menuRoutes');
// connect database
db.sequelize.sync({
    force : false , // To create table if exists , so make it false
    alter : false // To update the table if exists , so make it true
}).then(() => {
 // initial(); // Just use it in development, at the first time execution!. Delete it in production
});

app.use(cors());
// app.use(forms.array()); 
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use([loginRoutes, boardRoutes, menuRoutes]);
app.use(express.static(__dirname));

module.exports = app;
