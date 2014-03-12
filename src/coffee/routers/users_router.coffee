class SuperCat.Routers.UsersRouter extends Backbone.Router
  initialize: (options) ->
    @users = new SuperCat.Collections.UsersCollection()
    @users.reset options.users

  routes:
    "new"      : "newUser"
    "index"    : "index"
    "login"    : "login"
    ":id/edit" : "edit"
    ":id"      : "show"
    ".*"        : "index"


  index: ->
    @view = new SuperCat.Views.Users.IndexView(users: @users)
    $("#users").html(@view.render().el)
    


  login: ->
    @view = new SuperCat.Views.Users.LoginView(users: @users)
    $("#logins").html(@view.render().el)

  show: (id) ->
    user = @users.get(id)

    @view = new SuperCat.Views.Users.ShowView(model: user)
    $("#users").html(@view.render().el)

  edit: (id) ->
    user = @users.get(id)

    @view = new SuperCat.Views.Users.EditView(model: user)
    $("#users").html(@view.render().el)
