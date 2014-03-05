SuperCat.Views.Users ||= {}

class SuperCat.Views.Users.ShowView extends Backbone.View
  template: _.template(document.getElementById('user_show').innerHTML)

  render: ->
    $(@el).html(@template(@model.toJSON() ))
    return this
