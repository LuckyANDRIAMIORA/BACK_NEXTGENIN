var express = require('express');
var path = require('path');
var logger = require('morgan');
const cors = require('cors')

var usersRouter = require('./routes/users');

var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=>{
    res.status(200).header({'Content-type':'application/json'})
    next()
})

app.use('/users', usersRouter);
    
app.use((err, req, res, next)=>{
    res.status(500).send(err.message)
    res.end()
})

module.exports = app;
