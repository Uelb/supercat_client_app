SuperCat.Views.Messages ||= {}

class SuperCat.Views.Messages.EditView extends Backbone.View
  template : _.template(document.getElementById('message_edit').innerHTML)

  events :
    "submit #edit-message" : "update"

  update : (e) ->
    e.preventDefault()
    e.stopPropagation()

    @model.save(null,
      success : (message) =>
        @model = message
        window.location.hash = "/#{@model.id}"
    )

  render : ->
    $(@el).html(@template(@model.toJSON() ))

    this.$("form").backboneLink(@model)

    return this
