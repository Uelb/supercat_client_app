SuperCat.Views.Messages ||= {}

class SuperCat.Views.Messages.MessageView extends Backbone.View
  template: _.template(document.getElementById('message').innerHTML)

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
