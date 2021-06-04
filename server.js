// Dependencies
const express = require("express");
const nunjucks = require("nunjucks");
const passport = require("passport");
const session = require("express-session");

// Routes
const homeRoutes = require("./src/routes/homeRoutes.js");
const chatRoutes = require("./src/routes/chatRoutes.js");
const profileRoutes = require("./src/routes/profileRoutes");

// Configuration
const connectToDB = require("./src/config/mongoose.js");
const checkUser = require("./src/config/passport.js")

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

nunjucks.configure("src/views/", {
  autoescape: true,
  express: app,
});

app.use(express.static("static/public"));
app.use(express.json());
app.use(express.urlencoded());

app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());


checkUser();

app.use("/", homeRoutes); 
app.use("/chat", chatRoutes);
app.use("/profiles", profileRoutes);

const chatHandler = require("./src/controllers/chatHandler.js");

io.on("connection", (socket) => {
  socket.on("join room", (message) => {
    chatHandler.joinRoom(socket, message);
  });

  socket.on("chat message", (message) => {
    chatHandler.messagesSend(io, message);
  });
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

connectToDB();
