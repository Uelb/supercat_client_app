SuperCat.Views.Channels ||= {}

class SuperCat.Views.Channels.EditView extends Backbone.View
  template : _.template(document.getElementById('channel_edit').innerHTML)

  events :
    "submit #edit-channel" : "update"

  update : (e) ->
    e.preventDefault()
    e.stopPropagation()

    @model.save(null,
      success : (channel) =>
        @model = channel
        window.location.hash = "/#{@model.id}"
    )

  render : ->
    $(@el).html(@template(@model.toJSON() ))

    this.$("form").backboneLink(@model)

    return this
