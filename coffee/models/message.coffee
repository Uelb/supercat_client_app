class SuperCat.Models.Message extends Backbone.Model
  paramRoot: 'message'

  defaults:
    body: null
    latitude: null
    longitude: null
    author_id: null
    channel_id: null

class SuperCat.Collections.MessagesCollection extends Backbone.Collection
  model: SuperCat.Models.Message
  url: ->
    SuperCat.rootUrl + '/messages'
