//  soruların tıklanabilir hale getirilmesi
document.querySelectorAll('.example-question').forEach(function(question) {
  question.addEventListener('click', function() {
      var messageText = question.textContent.trim();
      document.getElementById('message-input').value = messageText; // Input'a yazma
  });
});


function sendMessage(messageText = '') {
  var messageInput = document.getElementById('message-input');
  if (messageText === '') {
      messageText = messageInput.value.trim();
  }

  if (messageText !== '') {
      var messagesContent = document.getElementById('messages-content');
      
      var newMessage = document.createElement('div');
      newMessage.classList.add('message');
      newMessage.innerHTML = '<div class="message-content">' + messageText + '</div>';
      
      messagesContent.appendChild(newMessage);
      
      messageInput.value = '';
      var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

      $.ajax({
        url: 'api/get-answer', 
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
          },
        data: JSON.stringify({ "message": messageText }),
        contentType: 'application/json',
        success: function(response) {

          var botMessage = document.createElement('div');
            botMessage.classList.add('answer', 'bot');
            botMessage.innerHTML = '<div class="message-content">' + response.answer + '</div>';
            messagesContent.appendChild(botMessage);
            scrollToBottom()
        },
        error: function() {
            console.log('Mesaj gönderilemedi.');
        }
    });
      
  }

 
}

// Enter tuşu ile mesaj gönderme
document.getElementById('message-input').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
      event.preventDefault();  
      sendMessage();  
      scrollToBottom()
  }
});
function scrollToBottom() {
  var messages = document.getElementById("messages-content");
  messages.scrollTop = messages.scrollHeight;
}