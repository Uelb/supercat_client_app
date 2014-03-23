var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SuperCat.Models.Channel = (function(_super) {
  __extends(Channel, _super);

  function Channel() {
    return Channel.__super__.constructor.apply(this, arguments);
  }

  Channel.prototype.paramRoot = 'channel';

  Channel.prototype.defaults = {
    title: null,
    latitude: null,
    longitude: null,
    creator_id: null
  };

  return Channel;

})(Backbone.Model);

SuperCat.Collections.ChannelsCollection = (function(_super) {
  __extends(ChannelsCollection, _super);

  function ChannelsCollection() {
    return ChannelsCollection.__super__.constructor.apply(this, arguments);
  }

  ChannelsCollection.prototype.model = SuperCat.Models.Channel;

  ChannelsCollection.prototype.url = function() {
    return SuperCat.rootUrl + '/channels';
  };

  return ChannelsCollection;

})(Backbone.Collection);

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SuperCat.Models.Message = (function(_super) {
  __extends(Message, _super);

  function Message() {
    return Message.__super__.constructor.apply(this, arguments);
  }

  Message.prototype.paramRoot = 'message';

  Message.prototype.defaults = {
    body: null,
    latitude: null,
    longitude: null,
    author_id: null,
    channel_id: null
  };

  return Message;

})(Backbone.Model);

SuperCat.Collections.MessagesCollection = (function(_super) {
  __extends(MessagesCollection, _super);

  function MessagesCollection() {
    return MessagesCollection.__super__.constructor.apply(this, arguments);
  }

  MessagesCollection.prototype.model = SuperCat.Models.Message;

  MessagesCollection.prototype.url = function() {
    return SuperCat.rootUrl + '/messages';
  };

  return MessagesCollection;

})(Backbone.Collection);

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SuperCat.Models.User = (function(_super) {
  __extends(User, _super);

  function User() {
    return User.__super__.constructor.apply(this, arguments);
  }

  User.prototype.paramRoot = 'user';

  User.prototype.defaults = {
    email: null,
    message_zone: null,
    connected: null,
    latitude: null,
    longitude: null,
    pseudo: null,
    last_name: null,
    first_name: null,
    gender: null,
    birth_date: null,
    provider: null,
    uid: null,
    authentication_token: null
  };

  User.prototype.login = function() {
    return $.ajax({
      type: 'POST',
      url: SuperCat.rootUrl + '/users/sign_in',
      data: {
        user: this.toJSON()
      },
      success: function(data, status, xhr) {
        var token;
        console.log(data);
        token = data.auth_token;
        $("meta[name='csrf-token']").remove();
        $('head').append($('<meta>', {
          name: "csrf-token",
          content: token
        }));
        SuperCat.message_router.messages.fetch();
        return SuperCat.message_router.index();
      },
      error: function(data, status, xhr) {
        return console.log('ko');
      }
    });
  };

  return User;

})(Backbone.Model);

SuperCat.Collections.UsersCollection = (function(_super) {
  __extends(UsersCollection, _super);

  function UsersCollection() {
    return UsersCollection.__super__.constructor.apply(this, arguments);
  }

  UsersCollection.prototype.model = SuperCat.Models.User;

  UsersCollection.prototype.url = function() {
    return SuperCat.rootUrl + '/users';
  };

  return UsersCollection;

})(Backbone.Collection);
