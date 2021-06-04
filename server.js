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

app.use(express.static("static/public"));

app.use(express.json());
app.use(express.urlencoded());
app.use("/", homeRoutes);
app.use("/chat", chatRoutes);

const chatHandler = require("./chatHandler");

io.on("connection", (socket) => {
  socket.on("join room", (message) => {
    chatHandler.joinRoom(socket, message);
  });

  socket.on("chat message", (message) => {
    chatHandler.messagesSend(io, message);
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
