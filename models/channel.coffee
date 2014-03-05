class SuperCat.Models.Channel extends Backbone.Model
  paramRoot: 'channel'

  defaults:
    title: null
    latitude: null
    longitude: null
    creator_id: null

class SuperCat.Collections.ChannelsCollection extends Backbone.Collection
  model: SuperCat.Models.Channel
  url: ->
    SuperCat.rootUrl + '/channels'
