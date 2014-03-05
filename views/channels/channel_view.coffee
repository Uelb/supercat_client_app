SuperCat.Views.Channels ||= {}

class SuperCat.Views.Channels.ChannelView extends Backbone.View
  template: _.template(document.getElementById('channel').innerHTML)

  events:
    "click .destroy" : "destroy"

  tagName: "tr"

  destroy: () ->
    @model.destroy()
    this.remove()

    return false

  render: ->
    $(@el).html(@template(@model.toJSON() ))
    return this
