console.log("script loaded!");
const socket = io('https://convo-z-server.onrender.com/');
socket.on('connect', () => {
    console.log("Socket Connected",socket.id);
});

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.chat-body');
var audio = new Audio('yo.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

    if(position == 'left'){
        audio.play();
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});
const name = prompt("Enter your name to join");
if(name && name.trim() !== ""){
    socket.emit('new-user-joined', name);
}

socket.on('user-joined', name => {
    console.log("New user joined", name);
    append(`${name} joined the chat`, 'center');
});
socket.on('receive', data => {
    console.log("Received message", data);
    append(`${data.name}: ${data.message}`, 'left');
});
socket.on('left', name => {
    console.log("User left", name);
    append(`${name} left the chat`, 'center');
});