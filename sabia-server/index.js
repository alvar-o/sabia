// load environment vars (stored in .env)
require('dotenv').config();

// import other required modules
const express = require('express'),
      app = express(),
      cors = require('cors'),
      PORT = 8081,
      errorHandler = require('./handlers/error'),
      authRoutes = require('./routes/auth'),
      messageRoutes = require('./routes/messages'),
      userRoutes = require('./routes/users'),
      { getAllMessages } = require('./routes/main'),
      { loginRequired, ensureCorrectUser } = require('./middleware/auth')

app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json());

// all routes here
app.use('/api/auth', authRoutes);
app.use(
    '/api/users/:username/messages', 
    loginRequired, 
    ensureCorrectUser, 
    messageRoutes);

app.use(
    '/api/users/:username',
    loginRequired,
    userRoutes);

// app.get('/api/users/:username', loginRequired, getUser)

app.get('/api/messages', loginRequired, getAllMessages);

// middlewarezzzz
app.use((req, res, next) => {
    let err = new Error('Not found');
    err.status = 404;
    next(err);
})

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
})