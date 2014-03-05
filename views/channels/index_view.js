// Generated by CoffeeScript 1.7.1
(function() {
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

}).call(this);
