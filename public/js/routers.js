var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SuperCat.Routers.ChannelsRouter = (function(_super) {
  __extends(ChannelsRouter, _super);

  function ChannelsRouter() {
    return ChannelsRouter.__super__.constructor.apply(this, arguments);
  }

  ChannelsRouter.prototype.initialize = function(options) {
    this.channels = new SuperCat.Collections.ChannelsCollection();
    return this.channels.reset(options.channels);
  };

  ChannelsRouter.prototype.routes = {
    "new": "newChannel",
    "index": "index",
    ":id/edit": "edit",
    ":id": "show",
    ".*": "index"
  };

  ChannelsRouter.prototype.newChannel = function() {
    this.view = new SuperCat.Views.Channels.NewView({
      collection: this.channels
    });
    return $("#channels").html(this.view.render().el);
  };

  ChannelsRouter.prototype.index = function() {
    this.view = new SuperCat.Views.Channels.IndexView({
      channels: this.channels
    });
    return $("#channels").html(this.view.render().el);
  };

  ChannelsRouter.prototype.show = function(id) {
    var channel;
    channel = this.channels.get(id);
    this.view = new SuperCat.Views.Channels.ShowView({
      model: channel
    });
    return $("#channels").html(this.view.render().el);
  };

  ChannelsRouter.prototype.edit = function(id) {
    var channel;
    channel = this.channels.get(id);
    this.view = new SuperCat.Views.Channels.EditView({
      model: channel
    });
    return $("#channels").html(this.view.render().el);
  };

  return ChannelsRouter;

})(Backbone.Router);

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SuperCat.Routers.MessagesRouter = (function(_super) {
  __extends(MessagesRouter, _super);

  function MessagesRouter() {
    return MessagesRouter.__super__.constructor.apply(this, arguments);
  }

  MessagesRouter.prototype.initialize = function(options) {
    this.messages = new SuperCat.Collections.MessagesCollection();
    return this.messages.reset(options.messages);
  };

  MessagesRouter.prototype.routes = {
    "new": "newMessage",
    "index": "index",
    ":id/edit": "edit",
    ":id": "show",
    ".*": "index"
  };

  MessagesRouter.prototype.newMessage = function() {
    this.view = new SuperCat.Views.Messages.NewView({
      collection: this.messages
    });
    return $("#messages").html(this.view.render().el);
  };

  MessagesRouter.prototype.index = function() {
    $("#messages").addClass('current');
    this.view = new SuperCat.Views.Messages.IndexView({
      messages: this.messages
    });
    return $("#messages").html(this.view.render().el);
  };

  MessagesRouter.prototype.show = function(id) {
    var message;
    message = this.messages.get(id);
    this.view = new SuperCat.Views.Messages.ShowView({
      model: message
    });
    return $("#messages").html(this.view.render().el);
  };

  MessagesRouter.prototype.edit = function(id) {
    var message;
    message = this.messages.get(id);
    this.view = new SuperCat.Views.Messages.EditView({
      model: message
    });
    return $("#messages").html(this.view.render().el);
  };

  return MessagesRouter;

})(Backbone.Router);

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SuperCat.Routers.UsersRouter = (function(_super) {
  __extends(UsersRouter, _super);

  function UsersRouter() {
    return UsersRouter.__super__.constructor.apply(this, arguments);
  }

  UsersRouter.prototype.initialize = function(options) {
    this.users = new SuperCat.Collections.UsersCollection();
    return this.users.reset(options.users);
  };

  UsersRouter.prototype.routes = {
    "new": "newUser",
    "index": "index",
    "login": "login",
    ":id/edit": "edit",
    ":id": "show",
    ".*": "index"
  };

  UsersRouter.prototype.index = function() {
    this.view = new SuperCat.Views.Users.IndexView({
      users: this.users
    });
    return $("#users").html(this.view.render().el);
  };

  UsersRouter.prototype.login = function() {
    this.view = new SuperCat.Views.Users.LoginView({
      users: this.users
    });
    return $("#logins").html(this.view.render().el).addClass('current');
  };

  UsersRouter.prototype.show = function(id) {
    var user;
    user = this.users.get(id);
    this.view = new SuperCat.Views.Users.ShowView({
      model: user
    });
    return $("#users").html(this.view.render().el);
  };

  UsersRouter.prototype.edit = function(id) {
    var user;
    user = this.users.get(id);
    this.view = new SuperCat.Views.Users.EditView({
      model: user
    });
    return $("#users").html(this.view.render().el);
  };

  return UsersRouter;

})(Backbone.Router);
