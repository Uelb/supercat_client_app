class SuperCat.Models.User extends Backbone.Model
  paramRoot: 'user'

  defaults:
    email: null
    message_zone: null
    connected: null
    latitude: null
    longitude: null
    pseudo: null
    last_name: null
    first_name: null
    gender: null
    birth_date: null
    provider: null
    uid: null
    authentication_token: null

class SuperCat.Collections.UsersCollection extends Backbone.Collection
  model: SuperCat.Models.User
  url: ->
    SuperCat.rootUrl + '/users'
