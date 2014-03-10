window.SuperCat = {
  Models: {},
  Collections: {},
  Routers: {},
  Views: {},
  rootUrl: 'http://0.0.0.0:3000'
};

Backbone.old_sync = Backbone.sync;

Backbone.sync = function(method, model, options) {
  var new_options;
  new_options = _.extend({
    beforeSend: function(xhr) {
      var token;
      token = $("meta[name=\"csrf-token\"]").attr("content");
      if (token) {
        xhr.setRequestHeader("X-CSRF-Token", token);
      }
    }
  }, options);
  return Backbone.old_sync(method, model, new_options);
};
