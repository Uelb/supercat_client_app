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

  sync: Backbone.localforage.sync('Myuser')

  login: ->
    $.ajax
      type: 'POST'
      url: SuperCat.rootUrl + '/users/sign_in'
      data: {user: this.toJSON()}
      success: @constructor.postLogin
      error: (data, status, xhr) ->
        console.log 'ko'
        alert 'Vos identifiants sont incorrectes'

  @postLogin: (data, status, xhr)->
    console.log data
    token = data.auth_token
    $("meta[name='csrf-token']").remove()        
    $('head').append($('<meta>', { name:"csrf-token", content:token}))
    $('#logins').removeClass('current')
    SuperCat.message_router.messages.fetch({ success : -> 
      SuperCat.message_router.index()
    })

  @googleCallback: (authResult)->
    console.log authResult
    if authResult["code"]
      
      # Hide the sign-in button now that the user is authorized, for example:
      $("#signinButton").attr "style", "display: none"
      
      # Send the code to the server
      $.ajax
        type: "POST"
        dataType: "json"
        url: SuperCat.rootUrl + "/auth/google_oauth2/callback"
        success: (result) ->
          console.log result
          return
        data: authResult
    
    else
      # There was an error.
      # Possible error codes:
      #   "access_denied" - User denied access to your app
      #   "immediate_failed" - Could not automatially log in the user
      console.log "There was an error: " + authResult["error"]  if authResult["error"]    

class SuperCat.Collections.UsersCollection extends Backbone.Collection
  model: SuperCat.Models.User,
  sync: Backbone.localforage.sync('Myusers')

  url: ->
    SuperCat.rootUrl + '/users'
