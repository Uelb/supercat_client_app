SuperCat.Views.Channels ||= {}

class SuperCat.Views.Channels.ShowView extends Backbone.View
  template: _.template(document.getElementById('channel_show').innerHTML)

  render: ->
    $(@el).html(@template(@model.toJSON() ))
    return this
