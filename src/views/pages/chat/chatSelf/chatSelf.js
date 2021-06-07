const socket = io();

let form = document.getElementById("form");
let input = document.getElementById("input");
let userOther = document.getElementById("userOther").textContent;
let userSelf = document.getElementById("userSelf").textContent;

window.scrollTo(0, document.body.scrollHeight);

socket.emit("join room", { userOther, userSelf });

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (input.value) {
    socket.emit("chat message", {
      message: input.value,
      userOther,
      userSelf,
    });
  }
  input.value = "";
});

socket.on("chat message", function (message) {
  const item = document.createElement("li");
  item.textContent = message.message;
  if (message.userSender === userSelf) {
    item.classList.add("messageSelf");
  }
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
