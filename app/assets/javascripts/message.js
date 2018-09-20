$(function() {
$(document).on('turbolinks:load', function() {
  // HTML文の作成
  function buildHTML(message){
    var image  = message.image ? `<img class = "message__message_image" src = ${ message.image }>`: "";
    var html = `<div class = "message" data-message-id="${message.id}">
                  <div class = "message__top">
                    <div class = "message__top__user_name">
                      ${message.name}
                    </div>
                    <div class = "message__top__posted_at">
                      ${message.date}
                    </div>
                  </div>
                  <div class = "message__message_content">
                    ${message.content}
                  </div>
                  ${image}
                </div>`
    return html;
  }
  // メッセージ投稿
  $('#message_form').submit(function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message) {
      var html = buildHTML(message);
      $('.messages').append(html)
      $('.footer__message_form').val('')
      $('.hidden').val('')
      $('.footer__send_button').prop('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 1000, 'swing');
    })
    .fail(function(){
      alert('エラーが発生しました');
    })
  });
  // メッセージ自動更新
    var interval = setInterval(function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)) {
        $.ajax({
          url: location.href,
          type: "GET",
          dataType: 'json',
        })
        .done(function(data) {
          var id = $('.message:last').data('message-id');
          var insertHTML = '';
          data.messages.forEach(function(message) {
            if (message.id > id ) {
              insertHTML += buildHTML(message);
            }
          });
          $('.messages').append(insertHTML);
          if (insertHTML){
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 1000, 'swing');
          }
        })
        .fail(function(data) {
          alert('自動更新に失敗しました');
        });
      } else {
    clearInterval(interval);
  }} , 5 * 1000 );
})
});
