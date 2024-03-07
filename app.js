var express = require('express');
var path = require('path');
var logger = require('morgan');
const cors = require('cors')

var usersRouter = require('./routes/users')
var forumsRouter = require('./routes/forum')
var messagesRouter = require('./routes/message')
var interestRouter = require('./routes/interest')
var clubRouter = require('./routes/club')
var clubinterest = require('./routes/clubinterest')
var userinterest = require('./routes/userinterest')
var userclub = require('./routes/userclub')
var eventRouter = require('./routes/event')
var mentorRouter = require('./routes/mentor')
var clubmentor = require('./routes/clubmentor')
var {authenticateToken} = require('./middleware/middleware')

var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=>{
    res.status(200).header({'Content-type':'application/json'})
    next()
})

app.use(usersRouter)
app.use(forumsRouter)
app.use(messagesRouter)
app.use(interestRouter)
app.use(clubRouter)
app.use(clubinterest)
app.use(userinterest)
app.use(userclub)
app.use(eventRouter)
app.use(mentorRouter)
app.use(clubmentor)
    
app.use((err, req, res, next)=>{
    res.status(500).send(err.message)
    res.end()
})

module.exports = app
