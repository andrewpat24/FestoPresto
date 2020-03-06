require('dotenv').config();

const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

// Parsers
app.use(require('cookie-parser')());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// Cors
const cors = require('cors');
app
  .use(express.static(__dirname + '/public'))
  .use(cors())
  .use(cookieParser());

// Mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
require('./models/Users');
require('./models/Events');
require('./models/FollowedArtists');
require('./models/FollowedEvents');
require('./models/CachedArtists');

// Logging
const pino = require('express-pino-logger')();
app.use(pino);

// Middleware
require('./middleware/passport');

// Session
const cookieSession = require('cookie-session');
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);

// Passport
const passport = require('passport');
require('./services/passport');
app.use(passport.initialize());
app.use(passport.session());

// Routes
const authRouter = require('./routes/auth');
const spotifyRouter = require('./routes/spotify');
const eventsRouter = require('./routes/events');

app.use('/auth', authRouter);
app.use('/spotify', spotifyRouter);
app.use('/events', eventsRouter);

// React routes
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port} .`);
});

module.exports = app;
