// eslint-disable-next-line no-undef
const socket = io();

const messages = document.querySelector('.chatMessages');
const form = document.querySelector('.chatForm');
const input = document.querySelector('.chatInput');
const userOther = document.querySelector('.userOther').value;
const userSelf = document.querySelector('.userSelf').value;

window.scrollTo(0, document.body.scrollHeight);

socket.emit('join room', { userOther, userSelf });

form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (input.value) {
        socket.emit('chat message', {
            message: input.value,
            userOther,
            userSelf,
        });
    }
    input.value = '';
});

socket.on('chat message', function (message) {
    const item = document.createElement('li');
    item.textContent = message.message;
    if (message.userSender === userSelf) {
        item.classList.add('messageSelf');
    }
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});
