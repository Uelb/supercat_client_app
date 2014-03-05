SuperCat.Views.Users ||= {}

class SuperCat.Views.Users.EditView extends Backbone.View
  template : _.template(document.getElementById('user_edit').innerHTML)

  events :
    "submit #edit-user" : "update"

  update : (e) ->
    e.preventDefault()
    e.stopPropagation()

    @model.save(null,
      success : (user) =>
        @model = user
        window.location.hash = "/#{@model.id}"
    )

  render : ->
    $(@el).html(@template(@model.toJSON() ))

    this.$("form").backboneLink(@model)

    return this
