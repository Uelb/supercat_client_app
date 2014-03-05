SuperCat.Views.Users ||= {}

class SuperCat.Views.Users.UserView extends Backbone.View
  template: _.template(document.getElementById('user').innerHTML)

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
