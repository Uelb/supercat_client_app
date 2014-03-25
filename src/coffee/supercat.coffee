#= require_self
#= require_tree ./templates
#= require_tree ./models
#= require_tree ./views
#= require_tree ./routers
window.SuperCat =
  Models: {}
  Collections: {}
  Routers: {}
  Views: {}
  rootUrl: 'http://0.0.0.0:3000'
  dispatcher: {}

Zepto ($)->
  SuperCat.dispatcher = new WebSocketRails SuperCat.rootUrl.split('//')[1] + '/websocket'
  
  router_login = ->
    router = new SuperCat.Routers.UsersRouter({})
    router.login()

  Backbone.old_sync = Backbone.sync
  Backbone.sync = (method, model, options) ->
    token = $("meta[name=\"csrf-token\"]").attr("content")
    if !token
      router_login()
      return false
    new_options = _.extend(
      beforeSend: (xhr) ->
        xhr.setRequestHeader "X-CSRF-Token", token
        return
    , options)
    Backbone.old_sync method, model, new_options

  Backbone.history.start({pushState: true})
  SuperCat.user_router = new SuperCat.Routers.UsersRouter({})
  SuperCat.message_router = new SuperCat.Routers.MessagesRouter({})
  SuperCat.message_router.messages.fetch
    success: SuperCat.message_router.index
  window.googleCallback = SuperCat.Models.User.googleCallback