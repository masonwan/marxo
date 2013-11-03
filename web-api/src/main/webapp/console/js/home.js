// Generated by CoffeeScript 1.6.3
(function() {
  "use strict";
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('home', ['base', 'models', 'notification'], function(_arg, _arg1, _arg2) {
    var FrameView, HomeFrameView, NavListView, NotificationListView, Notifications, Project, Projects, fill, find, tpl, _ref;
    find = _arg.find, tpl = _arg.tpl, fill = _arg.fill, FrameView = _arg.FrameView, NavListView = _arg.NavListView;
    Project = _arg1.Project, Projects = _arg1.Projects, Notifications = _arg1.Notifications;
    NotificationListView = _arg2.NotificationListView;
    HomeFrameView = (function(_super) {
      __extends(HomeFrameView, _super);

      function HomeFrameView() {
        _ref = HomeFrameView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      HomeFrameView.prototype.collection = Projects.projects;

      HomeFrameView.prototype.initialize = function(options) {
        var list, _auto_update,
          _this = this;
        HomeFrameView.__super__.initialize.call(this, options);
        list = this.notificationList = new NotificationListView({
          el: find('.sidebar-list', this.el),
          parent: this
        });
        this._render = this._render.bind(this);
        this.listenTo(this.collection, 'reset add remove', this._render);
        _auto_update = list.autoUpdate.bind(list);
        _auto_update(true);
        this.on('activate', function() {
          _this.render();
          return _auto_update(true);
        });
        this.on('deactivate', function() {
          return _auto_update(false);
        });
      };

      HomeFrameView.prototype._tpl = tpl('#project_overview_tpl');

      HomeFrameView.prototype._render = function() {
        var html, _tpl;
        _tpl = this._tpl;
        html = [];
        this.collection.forEach(function(project) {
          var obj, _ref1, _ref2;
          obj = project.toJSON();
          obj.counts = "(" + ((_ref1 = project.get('node_ids')) != null ? _ref1.length : void 0) + " Nodes, " + ((_ref2 = project.get('link_ids')) != null ? _ref2.length : void 0) + " Links)";
          return html.push(fill(_tpl, obj));
        });
        find('#home_view', this.el).innerHTML = html.join('\n');
      };

      HomeFrameView.prototype.render = function() {
        var _this = this;
        this.collection.load(function(ignored, resp) {
          if (!(_this.rendered && resp !== 'loaded')) {
            return _this._render();
          }
        });
        this.notificationList.fetch();
        return this;
      };

      return HomeFrameView;

    })(FrameView);
    return HomeFrameView;
  });

}).call(this);
