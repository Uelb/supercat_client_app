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

Backbone.old_sync = Backbone.sync
Backbone.sync = (method, model, options) ->
  new_options = _.extend(
    beforeSend: (xhr) ->
      token = $("meta[name=\"csrf-token\"]").attr("content")
      xhr.setRequestHeader "X-CSRF-Token", token  if token
      return
  , options)
  Backbone.old_sync method, model, new_options