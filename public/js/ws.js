const ws = new WebSocket(window.location.href.replace(/^http/, 'ws'));

ws.onopen = () => {
  document.forms.sendForm.sendButton.disabled = false;
};

document.forms.sendForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const {
    message: { value: message },
    nickname: { value: nickname },
  } = event.target;

  ws.send(JSON.stringify({
    nickname,
    message,
  }));
});

const messages = document.getElementById('messages');

ws.onmessage = ({ data }) => {
  const { nickname, message, timestamp } = JSON.parse(data);

    messages.innerHTML += `<li>
      ${new Date(timestamp).toLocaleTimeString()}
      <strong>${nickname}</strong>
      ${message}
    </li><br />`;
};
