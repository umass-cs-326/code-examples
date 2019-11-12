// Note: we are using wss instead of ws - wss is a secure websocket.
let websocket = new WebSocket("wss://echo.websocket.org/");

let connected = false;

websocket.onopen = function() {
  displayMessage("Connected");
  connected = true;
};

websocket.onclose = function() {
  displayMessage("Disconnected");
};

websocket.onmessage = function(e) {
  displayMessage(e.data);
};

let submit = document.getElementById('submit');
submit.addEventListener('click', event => {
  displayMessage('clicked submit');
  event.preventDefault();

  displayMessage('clicked submit');
  let value = document.getElementById('input').value;
  if (connected) {
    websocket.send(value);
  } else {
    displayMessage(`Can't send message ${value}. Connection is closed`);
  }
});

let close = document.getElementById('close');
close.addEventListener('click', event => {
  event.preventDefault();

  if (connected) {
    displayMessage('Closing connection');
    websocket.close();
    connected = false;
  } else {
    displayMessage('Connection is already closed');
  }
});

function displayMessage(message) {
  var para = document.createElement("p");
  para.innerHTML = message;
  document.getElementById("output").appendChild(para);
}
