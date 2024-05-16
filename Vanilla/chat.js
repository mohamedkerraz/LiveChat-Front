document.addEventListener('DOMContentLoaded', function() {
  const messageInput = document.getElementById('messageInput');
  const messagesList = document.getElementById('messagesList');
  const sendButton = document.getElementById('sendButton');

  let ws; // Variable pour stocker l'instance WebSocket

  function connect() {
    // Remplacer par vos propres valeurs
    const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImUyYjIyZmQ0N2VkZTY4MmY2OGZhY2NmZTdjNGNmNWIxMWIxMmI1NGIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTWthIFZpZGVnIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0tBMGprNXlIcWR6RElsSGctb0hsWVZWMnp1NTZKZEhVZE9pVHpSWE9vTnBqSXhSOG89czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGl2ZWNoYXQtNTNlMGUiLCJhdWQiOiJsaXZlY2hhdC01M2UwZSIsImF1dGhfdGltZSI6MTcxNTg3NTYxMywidXNlcl9pZCI6IloybUZySnZndjNRUTdQUUtIbHZCNEVQdWMwdTEiLCJzdWIiOiJaMm1Gckp2Z3YzUVE3UFFLSGx2QjRFUHVjMHUxIiwiaWF0IjoxNzE1ODc1NjEzLCJleHAiOjE3MTU4NzkyMTMsImVtYWlsIjoibWthdmlkZWdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTA1MzMxNjIyMTQ3Nzg2NDc1MTMiXSwiZW1haWwiOlsibWthdmlkZWdAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.pFZ3aixh2Ih7oRHQp5o22e68_ZhkSAHPasxbwyVMIDpMQG1DDVbCOIewOIFSN7e79tIE45aGlQfKlLOgT5d4y_lFTnlnGONF3yT2rSAU4yrR5hfbeUyZV-y5heupW2xLBOquNuxUJm-XRelNC7ZGcyd4momBYkF_RrGrE6ay7DkTFQQrCX6GZbFKVI_4fp_aLo3FMrGBO4_3BoKp05qFt9xbnfjjLd8yc-no8kyIf77ImUDM78YtbJF9mrw4c6Fct1o3th7qn0DR3Py7pg1x6Ots7Nr4-fx-oz7zyaNdlsy3uBs09COIP38ikLgaDfUmJA9kHbSVd2nsw4pXqPe5dQ"; // Assume que vous avez un token accessible
    ws = new WebSocket(`ws://localhost:5424?token=${token}`);

    ws.onopen = function(event) {
      console.log('Connected:', event);
    };

    ws.onmessage = function(event) {
      console.log('Message received:', event.data);
      const message = JSON.parse(event.data);
      displayMessage(message);
    };

    ws.onerror = function(error) {
      console.error('WebSocket Error:', error);
    };

    ws.onclose = function() {
      console.log('WebSocket connection closed');
    };
  }

  function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== '') {

      const userId = 'user'; 
      ws.send(JSON.stringify({ text: message, userId: userId }));
      messageInput.value = '';
    }
  }

  function displayMessage(message) {
    const li = document.createElement('li');
    li.textContent = `[${message.date}] ${message.userId}: ${message.text}`;
    messagesList.appendChild(li);
  }

  sendButton.addEventListener('click', sendMessage);
  messageInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });

  connect();
});
