SuperCat.Views.Users ||= {}

class SuperCat.Views.Users.LoginView extends Backbone.View
  template : _.template(document.getElementById('user_login').innerHTML)

  events :
    "submit" : "update"

  update : (e) ->
    e.preventDefault()

  render : ->
    $(@el).html(@template(@model))

    this.$("form").backboneLink(@model)

    return this
