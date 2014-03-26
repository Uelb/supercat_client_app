window.SuperCat = {
  Models: {},
  Collections: {},
  Routers: {},
  Views: {},
  rootUrl: 'http://0.0.0.0:3000'
};

SuperCat.dispatcher = new WebSocketRails(SuperCat.rootUrl.split('//')[1] + '/websocket');

Zepto(function($) {
  var router_login;
  router_login = function() {
    var router;
    router = new SuperCat.Routers.UsersRouter({});
    return router.login();
  };
  Backbone.old_sync = Backbone.sync;
  Backbone.sync = function(method, model, options) {
    var new_options, token;
    token = $("meta[name=\"csrf-token\"]").attr("content");
    if (!token) {
      router_login();
      return false;
    }
    new_options = _.extend({
      beforeSend: function(xhr) {
        xhr.setRequestHeader("X-CSRF-Token", token);
      }
    }, options);
    return Backbone.old_sync(method, model, new_options);
  };
  Backbone.history.start({
    pushState: true
  });
  SuperCat.user_router = new SuperCat.Routers.UsersRouter({});
  SuperCat.message_router = new SuperCat.Routers.MessagesRouter({});
  SuperCat.message_router.messages.fetch({
    success: SuperCat.message_router.index
  });
  window.googleCallback = SuperCat.Models.User.googleCallback;
  return window.facebookCallback = SuperCat.Models.User.facebookCallback;
});
