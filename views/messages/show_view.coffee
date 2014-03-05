SuperCat.Views.Messages ||= {}

class SuperCat.Views.Messages.ShowView extends Backbone.View
  template: _.template(document.getElementById('message_show').innerHTML)

  render: ->
    $(@el).html(@template(@model.toJSON() ))
    return this
