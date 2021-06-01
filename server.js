const express = require("express");
const nunjucks = require("nunjucks");
const mongoose = require("mongoose");
const router = require("./src/routes/router.js");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
let uri;
if (process.env.DB_USER) {
  uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
}

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
app.use("/", router);

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

nunjucks.configure("src/views/", {
  autoescape: true,
  express: app,
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

if (uri) {
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((err) => {
      throw err;
    });
}
