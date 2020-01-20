const path = require('path');
const express = require('express');
const compression = require('compression');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const formRouter = require('./components/forms/from.route')
const submitRoute = require('./components/submissions/submissions.route');


const config = require('./config');

mongoose.connect(config.db, { useNewUrlParser: true });  
//mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('You connected to db!!!')
});

const DIST_APP_FOLDER = path.join(__dirname, config.appFolder);

const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credetinals", "true");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE , OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept , Authorization");
  next();
});

app.use(morgan('dev'));


app.use('/api/forms', formRouter);
app.use('/api/submissions', submitRoute);

app.use(express.static(DIST_APP_FOLDER))

app.use((req, res, next) => {
    const error = new Error("Request not found");
    error.status = 404;
    next(error);
}); 
  
app.use((error, req, res, next) => {
    res.status(error.status || 500); 
    res.json({
        error: {
            message: error.message
        }
    });
});

const server = app.listen(config.port, () =>
{
    console.log(`server listening on port ${config.port}`);
});

