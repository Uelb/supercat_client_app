SuperCat.Views.Users ||= {}

class SuperCat.Views.Users.IndexView extends Backbone.View
  template: _.template(document.getElementById('user_index').innerHTML)

  initialize: (options) ->
    @options = options
    @options.users.bind('reset', @addAll)

  addAll: () =>
    @options.users.each(@addOne)

  addOne: (user) =>
    view = new SuperCat.Views.Users.UserView({model : user})
    @$("tbody").append(view.render().el)

  render: =>
    $(@el).html(@template(users: @options.users.toJSON() ))
    @addAll()

    return this
