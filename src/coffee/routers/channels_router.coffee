class SuperCat.Routers.ChannelsRouter extends Backbone.Router
  initialize: (options) ->
    @channels = new SuperCat.Collections.ChannelsCollection()
    @channels.reset options.channels

  routes:
    "new"      : "newChannel"
    "index"    : "index"
    ":id/edit" : "edit"
    ":id"      : "show"
    ".*"        : "index"

  newChannel: ->
    @view = new SuperCat.Views.Channels.NewView(collection: @channels)
    $("#channels").html(@view.render().el)

  index: ->
    @view = new SuperCat.Views.Channels.IndexView(channels: @channels)
    $("#channels").html(@view.render().el)

  show: (id) ->
    channel = @channels.get(id)

    @view = new SuperCat.Views.Channels.ShowView(model: channel)
    $("#channels").html(@view.render().el)

  edit: (id) ->
    channel = @channels.get(id)

    @view = new SuperCat.Views.Channels.EditView(model: channel)
    $("#channels").html(@view.render().el)
