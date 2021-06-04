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

let sortAlphabets = function (text) {
  return text.split("").sort().join("");
};

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

let backendMessages = [
  {
    message: "hey Henk",
    userOther: "Henk",
    userSelf: "Daan",
  },
  {
    message: "hallo Daan",
    userOther: "Daan",
    userSelf: "Henk",
  },
];
io.on("connection", (socket) => {
  socket.on("join room", (message) => {
    socket.join(sortAlphabets(`${message.userSelf}${message.userOther}`));

    if (
      "DHaaeknn" === sortAlphabets(`${message.userSelf}${message.userOther}`)
    ) {
      backendMessages.forEach((backendMessage) =>
        socket.emit("chat message", {
          message: backendMessage.message,
          userOther: backendMessage.userOther,
          userSelf: backendMessage.userSelf,
        })
      );
    }
  });

  socket.on("chat message", (message) => {
    io.to(sortAlphabets(`${message.userSelf}${message.userOther}`)).emit(
      "chat message",
      { message: message.message, userSelf: message.userSelf }
    );
  });
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

connectToDB();