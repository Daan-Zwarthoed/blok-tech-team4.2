// Dependencies
const express = require("express");
const nunjucks = require("nunjucks");

// Routes
const homeRoutes = require("./src/routes/homeRoutes.js");
const chatRoutes = require("./src/routes/chatRoutes.js");

// Configuration
const connectToDB = require("./src/config/mongoose.js");

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

app.use(express.static("static/public"));

app.use(express.json());
app.use(express.urlencoded());
app.use("/", homeRoutes);
app.use("/chat", chatRoutes);

io.on("connection", (socket) => {
  socket.on("join room", (message) => {
    socket.join(sortAlphabets(`${message.userSelf}${message.userOther}`));
  });

  socket.on("chat message", (message) => {
    io.to(sortAlphabets(`${message.userSelf}${message.userOther}`)).emit(
      "chat message",
      { message: message.message, userSender: message.userSelf }
    );
  });
});

nunjucks.configure("src/views/", {
  autoescape: true,
  express: app,
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

connectToDB();
