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

  login: ->
    $.ajax
      type: 'POST'
      url: SuperCat.rootUrl + '/users/sign_in'
      data: {user: this.toJSON()}
      success: (data, status, xhr) ->
        console.log data
        token = data.auth_token
        $("meta[name='csrf-token']").remove()        
        $('head').append($('<meta>', { name:"csrf-token", content:token}))
        SuperCat.message_router.messages.fetch()
        SuperCat.message_router.index()

      error: (data, status, xhr) ->
        console.log 'ko'

class SuperCat.Collections.UsersCollection extends Backbone.Collection
  model: SuperCat.Models.User
  url: ->
    SuperCat.rootUrl + '/users'
