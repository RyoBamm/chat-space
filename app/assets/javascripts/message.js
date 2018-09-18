$(function() {
  function buildHTML(message){
    var image  = message.image_url ? `<img class = "message__message_image" src = ${ message.image_url }>`: "";
    var html = `<div class = "message">
                  <div class = "message__top">
                    <div class = "message__top__user_name">
                      ${message.user_name}
                    </div>
                    <div class = "message__top__posted_at">
                      ${message.date}
                    </div>
                  </div>
                  <div class = "message__message_content">
                    ${message.content}
                    ${image}
                  </div>
                </div>`
    return html;
  }
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
});
