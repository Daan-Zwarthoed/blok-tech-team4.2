let socket = io();

let form = document.getElementById("form");
let input = document.getElementById("input");
let userSelf = document.getElementById("userSelf").value;
let userOther = document.getElementById("userOther").value;

window.scrollTo(0, document.body.scrollHeight);

socket.emit("join room", { userOther: userOther, userSelf: userSelf });

form.addEventListener("submit", function (e) {
  if (input.value) {
    socket.emit("chat message", {
      message: input.value,
      userOther: userOther,
      userSelf: userSelf,
    });
  }
});

socket.on("chat message", function (message) {
  let item = document.createElement("li");
  item.textContent = message.message;
  if (message.userSender === userSelf) {
    item.classList.add("messageSelf");
  }
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
