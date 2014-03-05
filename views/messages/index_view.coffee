SuperCat.Views.Messages ||= {}

class SuperCat.Views.Messages.IndexView extends Backbone.View
  template: _.template(document.getElementById('message_index').innerHTML)

  initialize: (options) ->
    @options = new SuperCat.Collections.MessagesCollection
    @options.reset options.messages
    @options.messages.bind('reset', @addAll)

  addAll: () =>
    @options.messages.each(@addOne)

  addOne: (message) =>
    view = new SuperCat.Views.Messages.MessageView({model : message})
    @$("tbody").append(view.render().el)

  render: =>
    $(@el).html(@template(messages: @options.messages.toJSON() ))
    @addAll()

    return this
