// Dependencies
const express = require('express');
const nunjucks = require('nunjucks');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// Routes
const http = require('http');
const { Server } = require('socket.io');
const homeRoutes = require('./src/routes/homeRoutes.js');
const chatRoutes = require('./src/routes/chatRoutes.js');
const profileRoutes = require('./src/routes/profileRoutes');
const filterRoutes = require("./src/routes/filterRoutes.js");

// Configuration
const connectToDB = require('./src/config/mongoose.js');
const checkUser = require('./src/config/passport.js');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server);

nunjucks.configure('src/views/', {
    autoescape: true,
    express: app,
});

app.use(express.static('static/public'));
app.use(express.json());
app.use(express.urlencoded());

connectToDB();

app.use(
    session({
        secret: process.env.SECRET,
        maxAge: new Date(Date.now() + 3600000),
        store: new MongoStore({
            mongoUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        }),
        resave: true,
        saveUninitialized: false,
    })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

checkUser();

app.use('/', homeRoutes);
app.use('/chat', chatRoutes);
app.use('/profiles', profileRoutes);
app.use("/filter", filterRoutes);

const chatHandler = require('./src/controllers/chatHandler.js');

io.on('connection', (socket) => {
    socket.on('join room', (message) => {
        chatHandler.joinRoom(socket, message);
    });

    socket.on('chat message', (message) => {
        chatHandler.messagesSend(io, message);
    });
});

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});