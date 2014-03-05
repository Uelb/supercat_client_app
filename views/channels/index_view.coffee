SuperCat.Views.Channels ||= {}

class SuperCat.Views.Channels.IndexView extends Backbone.View
  template: _.template(document.getElementById('channel_index').innerHTML)

  initialize: () ->
    @options = options
    @options.channels.bind('reset', @addAll)

  addAll: () =>
    @options.channels.each(@addOne)

  addOne: (channel) =>
    view = new SuperCat.Views.Channels.ChannelView({model : channel})
    @$("tbody").append(view.render().el)

  render: =>
    $(@el).html(@template(channels: @options.channels.toJSON() ))
    @addAll()

    return this
