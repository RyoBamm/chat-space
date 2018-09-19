json.id           @message.id
json.content      @message.content
json.image        @message.image.url
json.name         @message.user.name
json.date         format_posted_time(@message.created_at)
