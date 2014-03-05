SuperCat.Views.Messages ||= {}

class SuperCat.Views.Messages.NewView extends Backbone.View
  template: _.template(document.getElementById('message_new').innerHTML)

  events:
    "submit #new-message": "save"

  constructor: (options) ->
    super(options)
    @model = new @collection.model()

    @model.bind("change:errors", () =>
      this.render()
    )

  save: (e) ->
    e.preventDefault()
    e.stopPropagation()

    @model.unset("errors")

    @collection.create(@model.toJSON(),
      success: (message) =>
        @model = message
        window.location.hash = "/#{@model.id}"

      error: (message, jqXHR) =>
        @model.set({errors: $.parseJSON(jqXHR.responseText)})
    )

  render: ->
    $(@el).html(@template(@model.toJSON() ))

    this.$("form").backboneLink(@model)

    return this
