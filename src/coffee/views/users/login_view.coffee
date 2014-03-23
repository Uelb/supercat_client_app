SuperCat.Views.Users ||= {}

class SuperCat.Views.Users.LoginView extends Backbone.View
  initialize: (options)->
    @users = options.users
    @model = new @users.model()

  template : _.template(document.getElementById('user_login').innerHTML)
  
  events :
    "submit" : "login"

  login : (e) ->
    e.preventDefault()
    @model.login()


  render : ->

    $(@el).html(@template(@model))

    this.$("form").backboneLink(@model)

    return this
