

document.getElementById('message-input').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
});
document.querySelectorAll('.example-question').forEach(function(question) {
  question.addEventListener('click', function() {
      var messageText = question.textContent.trim();
      document.getElementById('message-input').value = messageText; // Input'a yazma
  });
});


function sendMessage() {
  var messageInput = document.getElementById('message-input');
  var messageText = messageInput.innerText.trim();  
  if (messageText !== '') {
      var messagesContent = document.querySelector('.messages-content');

      // Kullanıcı mesajını ekle
      var newMessage = document.createElement('div');
      newMessage.classList.add('message');
      newMessage.innerHTML = '<div class="message-content">' + messageText + '</div>';
      messagesContent.appendChild(newMessage);

      // Kullanıcı mesajı gönderildikten sonra input alanını temizle
      messageInput.innerHTML = '';

      messagesContent.scrollTop = messagesContent.scrollHeight;

      $.ajax({
          url: 'api/get-answer', // Backend URL veya API endpoint
          method: 'POST',
          data: JSON.stringify({ "message": messageText }),
          contentType: 'application/json',
          success: function(response) {
              // Backend cevabını ekle
              var botMessage = document.createElement('div');
              botMessage.classList.add('message', 'bot');
              botMessage.innerHTML = '<div class="message-content">' + response.answer + '</div>';
              messagesContent.appendChild(botMessage);

              // Mesaj kutusunun en altına kaydırma
              messagesContent.scrollTop = messagesContent.scrollHeight;
          },
          error: function() {
              console.log('Mesaj gönderilemedi.');
          }
      });
  }
}
