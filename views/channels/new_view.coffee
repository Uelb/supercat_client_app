SuperCat.Views.Channels ||= {}

class SuperCat.Views.Channels.NewView extends Backbone.View
  template: _.template(document.getElementById('channel_new').innerHTML)

  events:
    "submit #new-channel": "save"

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
      success: (channel) =>
        @model = channel
        window.location.hash = "/#{@model.id}"

      error: (channel, jqXHR) =>
        @model.set({errors: $.parseJSON(jqXHR.responseText)})
    )

  render: ->
    $(@el).html(@template(@model.toJSON() ))

    this.$("form").backboneLink(@model)

    return this
