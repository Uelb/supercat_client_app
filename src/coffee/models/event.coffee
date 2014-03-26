class SuperCat.Models.WebsocketEvent extends Backbone.Model
  @listen: (events) ->
    _.each events, (event)->
      console.log 'Binding event ' + event[0] + ' with function ' + event[1].name 
      SuperCat.dispatcher.bind event[0], event[1]

  @listen_to_private_message: (token, user_id) ->
    SuperCat.dispatcher.trigger 'create_user_channel', {token: token}
    SuperCat.dispatcher.subscribe_private 'user_' + user_id

  @user_channel: null

  @message_received_handler: (data)->
    console.log data

events = [
  ['message_received', SuperCat.Models.WebsocketEvent.message_received_handler]
]

SuperCat.Models.WebsocketEvent.listen events