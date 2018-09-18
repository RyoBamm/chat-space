json.id           @message.id
json.content      @message.content
json.image_url    @message.image.url
json.user_name    @message.user.name
json.date         format_posted_time(@message.created_at)
