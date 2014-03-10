var _base,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

(_base = SuperCat.Views).Channels || (_base.Channels = {});

SuperCat.Views.Channels.ChannelView = (function(_super) {
  __extends(ChannelView, _super);

  function ChannelView() {
    return ChannelView.__super__.constructor.apply(this, arguments);
  }

  ChannelView.prototype.template = _.template(document.getElementById('channel').innerHTML);

  ChannelView.prototype.events = {
    "click .destroy": "destroy"
  };

  ChannelView.prototype.tagName = "tr";

  ChannelView.prototype.destroy = function() {
    this.model.destroy();
    this.remove();
    return false;
  };

  ChannelView.prototype.render = function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  };

  return ChannelView;

})(Backbone.View);

var _base,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

(_base = SuperCat.Views).Channels || (_base.Channels = {});

SuperCat.Views.Channels.EditView = (function(_super) {
  __extends(EditView, _super);

  function EditView() {
    return EditView.__super__.constructor.apply(this, arguments);
  }

  EditView.prototype.template = _.template(document.getElementById('channel_edit').innerHTML);

  EditView.prototype.events = {
    "submit #edit-channel": "update"
  };

  EditView.prototype.update = function(e) {
    e.preventDefault();
    e.stopPropagation();
    return this.model.save(null, {
      success: (function(_this) {
        return function(channel) {
          _this.model = channel;
          return window.location.hash = "/" + _this.model.id;
        };
      })(this)
    });
  };

  EditView.prototype.render = function() {
    $(this.el).html(this.template(this.model.toJSON()));
    this.$("form").backboneLink(this.model);
    return this;
  };

  return EditView;

})(Backbone.View);

var _base,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

(_base = SuperCat.Views).Channels || (_base.Channels = {});

SuperCat.Views.Channels.IndexView = (function(_super) {
  __extends(IndexView, _super);

  function IndexView() {
    this.render = __bind(this.render, this);
    this.addOne = __bind(this.addOne, this);
    this.addAll = __bind(this.addAll, this);
    return IndexView.__super__.constructor.apply(this, arguments);
  }

  IndexView.prototype.template = _.template(document.getElementById('channel_index').innerHTML);

  IndexView.prototype.initialize = function() {
    this.options = options;
    return this.options.channels.bind('reset', this.addAll);
  };

  IndexView.prototype.addAll = function() {
    return this.options.channels.each(this.addOne);
  };

  IndexView.prototype.addOne = function(channel) {
    var view;
    view = new SuperCat.Views.Channels.ChannelView({
      model: channel
    });
    return this.$("tbody").append(view.render().el);
  };

  IndexView.prototype.render = function() {
    $(this.el).html(this.template({
      channels: this.options.channels.toJSON()
    }));
    this.addAll();
    return this;
  };

  return IndexView;

})(Backbone.View);

var _base,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

(_base = SuperCat.Views).Channels || (_base.Channels = {});

SuperCat.Views.Channels.NewView = (function(_super) {
  __extends(NewView, _super);

  NewView.prototype.template = _.template(document.getElementById('channel_new').innerHTML);

  NewView.prototype.events = {
    "submit #new-channel": "save"
  };

  function NewView(options) {
    NewView.__super__.constructor.call(this, options);
    this.model = new this.collection.model();
    this.model.bind("change:errors", (function(_this) {
      return function() {
        return _this.render();
      };
    })(this));
  }

  NewView.prototype.save = function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.model.unset("errors");
    return this.collection.create(this.model.toJSON(), {
      success: (function(_this) {
        return function(channel) {
          _this.model = channel;
          return window.location.hash = "/" + _this.model.id;
        };
      })(this),
      error: (function(_this) {
        return function(channel, jqXHR) {
          return _this.model.set({
            errors: $.parseJSON(jqXHR.responseText)
          });
        };
      })(this)
    });
  };

  NewView.prototype.render = function() {
    $(this.el).html(this.template(this.model.toJSON()));
    this.$("form").backboneLink(this.model);
    return this;
  };

  return NewView;

})(Backbone.View);

var _base,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

(_base = SuperCat.Views).Channels || (_base.Channels = {});

SuperCat.Views.Channels.ShowView = (function(_super) {
  __extends(ShowView, _super);

  function ShowView() {
    return ShowView.__super__.constructor.apply(this, arguments);
  }

  ShowView.prototype.template = _.template(document.getElementById('channel_show').innerHTML);

  ShowView.prototype.render = function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  };

  return ShowView;

})(Backbone.View);

var _base,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

(_base = SuperCat.Views).Messages || (_base.Messages = {});

SuperCat.Views.Messages.EditView = (function(_super) {
  __extends(EditView, _super);

  function EditView() {
    return EditView.__super__.constructor.apply(this, arguments);
  }

  EditView.prototype.template = _.template(document.getElementById('message_edit').innerHTML);

  EditView.prototype.events = {
    "submit #edit-message": "update"
  };

  EditView.prototype.update = function(e) {
    e.preventDefault();
    e.stopPropagation();
    return this.model.save(null, {
      success: (function(_this) {
        return function(message) {
          _this.model = message;
          return window.location.hash = "/" + _this.model.id;
        };
      })(this)
    });
  };

  EditView.prototype.render = function() {
    $(this.el).html(this.template(this.model.toJSON()));
    this.$("form").backboneLink(this.model);
    return this;
  };

  return EditView;

})(Backbone.View);

var _base,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

(_base = SuperCat.Views).Messages || (_base.Messages = {});

SuperCat.Views.Messages.IndexView = (function(_super) {
  __extends(IndexView, _super);

  function IndexView() {
    this.render = __bind(this.render, this);
    this.addOne = __bind(this.addOne, this);
    this.addAll = __bind(this.addAll, this);
    return IndexView.__super__.constructor.apply(this, arguments);
  }

  IndexView.prototype.template = _.template(document.getElementById('message_index').innerHTML);

  IndexView.prototype.initialize = function(options) {
    this.options = options;
    return this.options.messages.bind('reset', this.addAll);
  };

  IndexView.prototype.addAll = function() {
    return this.options.messages.each(this.addOne);
  };

  IndexView.prototype.addOne = function(message) {
    var view;
    view = new SuperCat.Views.Messages.MessageView({
      model: message
    });
    return this.$("tbody").append(view.render().el);
  };

  IndexView.prototype.render = function() {
    $(this.el).html(this.template({
      messages: this.options.messages.toJSON()
    }));
    this.addAll();
    return this;
  };

  return IndexView;

})(Backbone.View);

var _base,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

(_base = SuperCat.Views).Messages || (_base.Messages = {});

SuperCat.Views.Messages.MessageView = (function(_super) {
  __extends(MessageView, _super);

  function MessageView() {
    return MessageView.__super__.constructor.apply(this, arguments);
  }

  MessageView.prototype.template = _.template(document.getElementById('message').innerHTML);

  MessageView.prototype.events = {
    "click .destroy": "destroy"
  };

  MessageView.prototype.tagName = "tr";

  MessageView.prototype.destroy = function() {
    this.model.destroy();
    this.remove();
    return false;
  };

  MessageView.prototype.render = function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  };

  return MessageView;

})(Backbone.View);

var _base,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

(_base = SuperCat.Views).Messages || (_base.Messages = {});

SuperCat.Views.Messages.NewView = (function(_super) {
  __extends(NewView, _super);

  NewView.prototype.template = _.template(document.getElementById('message_new').innerHTML);

  NewView.prototype.events = {
    "submit #new-message": "save"
  };

  function NewView(options) {
    NewView.__super__.constructor.call(this, options);
    this.model = new this.collection.model();
    this.model.bind("change:errors", (function(_this) {
      return function() {
        return _this.render();
      };
    })(this));
  }

  NewView.prototype.save = function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.model.unset("errors");
    return this.collection.create(this.model.toJSON(), {
      success: (function(_this) {
        return function(message) {
          _this.model = message;
          return window.location.hash = "/" + _this.model.id;
        };
      })(this),
      error: (function(_this) {
        return function(message, jqXHR) {
          return _this.model.set({
            errors: $.parseJSON(jqXHR.responseText)
          });
        };
      })(this)
    });
  };

  NewView.prototype.render = function() {
    $(this.el).html(this.template(this.model.toJSON()));
    this.$("form").backboneLink(this.model);
    return this;
  };

  return NewView;

})(Backbone.View);

var _base,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

(_base = SuperCat.Views).Messages || (_base.Messages = {});

SuperCat.Views.Messages.ShowView = (function(_super) {
  __extends(ShowView, _super);

  function ShowView() {
    return ShowView.__super__.constructor.apply(this, arguments);
  }

  ShowView.prototype.template = _.template(document.getElementById('message_show').innerHTML);

  ShowView.prototype.render = function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  };

  return ShowView;

})(Backbone.View);

var _base,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

(_base = SuperCat.Views).Users || (_base.Users = {});

SuperCat.Views.Users.EditView = (function(_super) {
  __extends(EditView, _super);

  function EditView() {
    return EditView.__super__.constructor.apply(this, arguments);
  }

  EditView.prototype.template = _.template(document.getElementById('user_edit').innerHTML);

  EditView.prototype.events = {
    "submit #edit-user": "update"
  };

  EditView.prototype.update = function(e) {
    e.preventDefault();
    e.stopPropagation();
    return this.model.save(null, {
      success: (function(_this) {
        return function(user) {
          _this.model = user;
          return window.location.hash = "/" + _this.model.id;
        };
      })(this)
    });
  };

  EditView.prototype.render = function() {
    $(this.el).html(this.template(this.model.toJSON()));
    this.$("form").backboneLink(this.model);
    return this;
  };

  return EditView;

})(Backbone.View);

var _base,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

(_base = SuperCat.Views).Users || (_base.Users = {});

SuperCat.Views.Users.IndexView = (function(_super) {
  __extends(IndexView, _super);

  function IndexView() {
    this.render = __bind(this.render, this);
    this.addOne = __bind(this.addOne, this);
    this.addAll = __bind(this.addAll, this);
    return IndexView.__super__.constructor.apply(this, arguments);
  }

  IndexView.prototype.template = _.template(document.getElementById('user_index').innerHTML);

  IndexView.prototype.initialize = function() {
    this.options = options;
    return this.options.users.bind('reset', this.addAll);
  };

  IndexView.prototype.addAll = function() {
    return this.options.users.each(this.addOne);
  };

  IndexView.prototype.addOne = function(user) {
    var view;
    view = new SuperCat.Views.Users.UserView({
      model: user
    });
    return this.$("tbody").append(view.render().el);
  };

  IndexView.prototype.render = function() {
    $(this.el).html(this.template({
      users: this.options.users.toJSON()
    }));
    this.addAll();
    return this;
  };

  return IndexView;

})(Backbone.View);

var _base,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

(_base = SuperCat.Views).Users || (_base.Users = {});

SuperCat.Views.Users.NewView = (function(_super) {
  __extends(NewView, _super);

  NewView.prototype.template = _.template(document.getElementById('user_new').innerHTML);

  NewView.prototype.events = {
    "submit #new-user": "save"
  };

  function NewView(options) {
    NewView.__super__.constructor.call(this, options);
    this.model = new this.collection.model();
    this.model.bind("change:errors", (function(_this) {
      return function() {
        return _this.render();
      };
    })(this));
  }

  NewView.prototype.save = function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.model.unset("errors");
    return this.collection.create(this.model.toJSON(), {
      success: (function(_this) {
        return function(user) {
          _this.model = user;
          return window.location.hash = "/" + _this.model.id;
        };
      })(this),
      error: (function(_this) {
        return function(user, jqXHR) {
          return _this.model.set({
            errors: $.parseJSON(jqXHR.responseText)
          });
        };
      })(this)
    });
  };

  NewView.prototype.render = function() {
    $(this.el).html(this.template(this.model.toJSON()));
    this.$("form").backboneLink(this.model);
    return this;
  };

  return NewView;

})(Backbone.View);

var _base,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

(_base = SuperCat.Views).Users || (_base.Users = {});

SuperCat.Views.Users.ShowView = (function(_super) {
  __extends(ShowView, _super);

  function ShowView() {
    return ShowView.__super__.constructor.apply(this, arguments);
  }

  ShowView.prototype.template = _.template(document.getElementById('user_show').innerHTML);

  ShowView.prototype.render = function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  };

  return ShowView;

})(Backbone.View);

var _base,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

(_base = SuperCat.Views).Users || (_base.Users = {});

SuperCat.Views.Users.UserView = (function(_super) {
  __extends(UserView, _super);

  function UserView() {
    return UserView.__super__.constructor.apply(this, arguments);
  }

  UserView.prototype.template = _.template(document.getElementById('user').innerHTML);

  UserView.prototype.events = {
    "click .destroy": "destroy"
  };

  UserView.prototype.tagName = "tr";

  UserView.prototype.destroy = function() {
    this.model.destroy();
    this.remove();
    return false;
  };

  UserView.prototype.render = function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  };

  return UserView;

})(Backbone.View);
