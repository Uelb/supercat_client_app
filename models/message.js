// Generated by CoffeeScript 1.7.1
(function() {
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

}).call(this);
