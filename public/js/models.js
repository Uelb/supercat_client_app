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

var events,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SuperCat.Models.WebsocketEvent = (function(_super) {
  __extends(WebsocketEvent, _super);

  function WebsocketEvent() {
    return WebsocketEvent.__super__.constructor.apply(this, arguments);
  }

  WebsocketEvent.listen = function(events) {
    return _.each(events, function(event) {
      console.log('Binding event ' + event[0] + ' with function ' + event[1].name);
      return SuperCat.dispatcher.bind(event[0], event[1]);
    });
  };

  WebsocketEvent.listen_to_private_message = function(token, user_id) {
    SuperCat.dispatcher.trigger('create_user_channel', {
      token: token
    });
    return SuperCat.dispatcher.subscribe_private('user_' + user_id);
  };

  WebsocketEvent.user_channel = null;

  WebsocketEvent.message_received_handler = function(data) {
    return console.log(data);
  };

  return WebsocketEvent;

})(Backbone.Model);

events = [['message_received', SuperCat.Models.WebsocketEvent.message_received_handler]];

SuperCat.Models.WebsocketEvent.listen(events);

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

  User.prototype.sync = Backbone.localforage.sync('Myuser');

  User.prototype.login = function() {
    return $.ajax({
      type: 'POST',
      url: SuperCat.rootUrl + '/users/sign_in',
      data: {
        user: this.toJSON()
      },
      success: SuperCat.Models.User.postLogin,
      error: function(data, status, xhr) {
        console.log('ko');
        return alert('Vos identifiants sont incorrectes');
      }
    });
  };

  User.postLogin = function(data, status, xhr) {
    var token;
    console.log("Server connected", data);
    token = data.auth_token;
    $("meta[name='csrf-token']").remove();
    $('head').append($('<meta>', {
      name: "csrf-token",
      content: token
    }));
    $('#logins').removeClass('current');
    return SuperCat.message_router.messages.fetch({
      success: function() {
        SuperCat.message_router.index();
        return $('#avatar').attr('src', 'http://www.gravatar.com/avatar/' + data.email_md5);
      }
    });
  };

  User.googleCallback = function(authResult) {
    console.log("Connected via Google", authResult);
    if (authResult["code"]) {
      $("#signinButton").attr("style", "display: none");
      return $.ajax({
        type: "POST",
        dataType: "json",
        url: SuperCat.rootUrl + "/auth/google_oauth2/callback",
        success: SuperCat.Models.User.postLogin,
        data: authResult
      });
    } else {
      if (authResult["error"]) {
        return console.log("There was an error: " + authResult["error"]);
      }
    }
  };

  User.facebookCallback = function(authResult) {
    console.log("Connected via facebook", authResult);
    $(".fb-login-button").attr("style", "display:none");
    if (authResult) {
      return $.get(SuperCat.rootUrl + '/auth/facebook/callback', {
        signed_request: authResult.authResponse.signedRequest
      }, SuperCat.Models.User.postLogin);
    } else {
      return console.log("There was an error facebook connect.");
    }
  };

  return User;

})(Backbone.Model);

SuperCat.Collections.UsersCollection = (function(_super) {
  __extends(UsersCollection, _super);

  function UsersCollection() {
    return UsersCollection.__super__.constructor.apply(this, arguments);
  }

  UsersCollection.prototype.model = SuperCat.Models.User;

  UsersCollection.prototype.sync = Backbone.localforage.sync('Myusers');

  UsersCollection.prototype.url = function() {
    return SuperCat.rootUrl + '/users';
  };

  return UsersCollection;

})(Backbone.Collection);
