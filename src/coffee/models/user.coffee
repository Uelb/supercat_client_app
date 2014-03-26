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
      success: SuperCat.Models.User.postLogin
      error: (data, status, xhr) ->
        console.log 'ko'
        alert 'Vos identifiants sont incorrectes'

  @postLogin: (data, status, xhr)->
    console.log "Server connected", data
    token = data.auth_token
    $("meta[name='csrf-token']").remove()        
    $('head').append($('<meta>', { name:"csrf-token", content:token}))
    $('#logins').removeClass('current')
    SuperCat.message_router.messages.fetch({ success : -> 
      SuperCat.message_router.index()
      $('#avatar').attr('src', 'http://www.gravatar.com/avatar/' + data.email_md5)
    })

  @googleCallback: (authResult)->
    console.log "Connected via Google", authResult
    if authResult["code"]
      
      # Hide the sign-in button now that the user is authorized, for example:
      $("#signinButton").attr "style", "display: none"
      # Send the code to the server
      $.ajax
        type: "POST"
        dataType: "json"
        url: SuperCat.rootUrl + "/auth/google_oauth2/callback"
        success: SuperCat.Models.User.postLogin
        data: authResult
    
    else
      # There was an error.
      # Possible error codes:
      #   "access_denied" - User denied access to your app
      #   "immediate_failed" - Could not automatially log in the user
      console.log "There was an error: " + authResult["error"]  if authResult["error"]    

  @facebookCallback: (authResult) ->
    console.log "Connected via facebook", authResult
    $(".fb-login-button").attr "style", "display:none"
    if authResult
      $.get SuperCat.rootUrl + '/auth/facebook/callback',
        { signed_request: authResult.authResponse.signedRequest },
        SuperCat.Models.User.postLogin
    else
      console.log "There was an error facebook connect."
class SuperCat.Collections.UsersCollection extends Backbone.Collection
  model: SuperCat.Models.User,
  sync: Backbone.localforage.sync('Myusers')

  url: ->
    SuperCat.rootUrl + '/users'
