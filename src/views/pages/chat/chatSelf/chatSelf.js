let socket = io();

let form = document.getElementById("form");
let input = document.getElementById("input");
let userSelf = document.getElementById("userSelf").innerHTML;
let userOther = document.getElementById("userOther").innerHTML;

let sortAlphabets = function (text) {
  return text.split("").sort().join("");
};

socket.emit("join room", { userOther: userOther, userSelf: userSelf });

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", {
      message: input.value,
      userOther: userOther,
      userSelf: userSelf,
    });
    input.value = "";
  }
});

socket.on("chat message", function (message) {
  let item = document.createElement("li");
  item.textContent = message.message;
  if (message.userSelf === userSelf) {
    item.classList.add("messageSelf");
  }
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
