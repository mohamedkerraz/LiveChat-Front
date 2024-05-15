document.addEventListener('DOMContentLoaded', function() {
  const messageInput = document.getElementById('messageInput');
  const messagesList = document.getElementById('messagesList');
  const sendButton = document.getElementById('sendButton');

  let ws; // Variable pour stocker l'instance WebSocket

  function connect() {
    // Remplacer par vos propres valeurs
    const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImUyYjIyZmQ0N2VkZTY4MmY2OGZhY2NmZTdjNGNmNWIxMWIxMmI1NGIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTWthIFZpZGVnIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0tBMGprNXlIcWR6RElsSGctb0hsWVZWMnp1NTZKZEhVZE9pVHpSWE9vTnBqSXhSOG89czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGl2ZWNoYXQtNTNlMGUiLCJhdWQiOiJsaXZlY2hhdC01M2UwZSIsImF1dGhfdGltZSI6MTcxNTgwMzIwMCwidXNlcl9pZCI6IloybUZySnZndjNRUTdQUUtIbHZCNEVQdWMwdTEiLCJzdWIiOiJaMm1Gckp2Z3YzUVE3UFFLSGx2QjRFUHVjMHUxIiwiaWF0IjoxNzE1ODAzMjAwLCJleHAiOjE3MTU4MDY4MDAsImVtYWlsIjoibWthdmlkZWdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTA1MzMxNjIyMTQ3Nzg2NDc1MTMiXSwiZW1haWwiOlsibWthdmlkZWdAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.G2YbuKP7OcY1CL9EEKXqVSgACmdvLTJSWlRxnm5pAr93BgNIxXPw5uQI1If_gxSfVea2gS2_6f2GCOM-4s4SLCqUvmS66541txbeH9Omkhf_NJkkdMwnf2QkvR1WH_awke9_ZbMyff35cj-_zUE4cC64SAHGXdv7-jdwcINB82rXFne63ZZCiV9rzR1Xzc4E4yh4VjGVTNR6m3sGAgEyAn1NduU-gZ8W165APlGV6oAx9UUuLSRuofHhEVO1vpSsanYjnrPLtIk-BQWs8H9Wg7uYUueooYgkYMWm315O5aFk2vwg-7IeVh8YWtEyOmYjhUnNW375nFEOsM-m0NAw8w"; // Assume que vous avez un token accessible
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
      // Remplacer par le nom d'utilisateur actuel ou un identifiant
      const userId = 'user'; // Placeholder pour l'identifiant de l'utilisateur
      ws.send(JSON.stringify({ text: message, userId: userId }));
      messageInput.value = '';
    }
  }

  function displayMessage(message) {
    const li = document.createElement('li');
    li.textContent = message.text;
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
