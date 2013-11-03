// Generated by CoffeeScript 1.6.3
(function() {
  "use strict";
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('profile', ['base'], function(_arg) {
    var FormViewMixin, FrameView, ProfileFrameView, User, find, _ref;
    find = _arg.find, FrameView = _arg.FrameView, FormViewMixin = _arg.FormViewMixin, User = _arg.User;
    ProfileFrameView = (function(_super) {
      __extends(ProfileFrameView, _super);

      function ProfileFrameView() {
        _ref = ProfileFrameView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ProfileFrameView.acts_as(FormViewMixin);

      ProfileFrameView.prototype.initialize = function(options) {
        ProfileFrameView.__super__.initialize.call(this, options);
        if (!User.current) {
          throw new Error('not signed in yet');
        }
        this.model = User.current;
        this.initForm();
        this.btn = find('#update_user', this.el);
        return this.avatar = find('#user_avatar img', this.el);
      };

      ProfileFrameView.prototype.render = function() {
        var _this = this;
        ProfileFrameView.__super__.render.apply(this, arguments);
        return this.model.fetch({
          success: function(data) {
            var attrs, sex;
            console.log('fetch tenant', data.attributes);
            _this.model = data;
            attrs = data.toJSON();
            sex = attrs.sex;
            attrs.sex = !sex ? 'Unspecified' : sex.charAt(0).toUpperCase() + sex.slice(1);
            console.log(attrs);
            _this.fill(attrs);
            _this.avatar.src = "https://secure.gravatar.com/avatar/" + attrs.email_md5 + "?s=200&d=mm";
            _this.btn.href = '#config/users/' + data.id;
            $(_this.btn).removeAttr('disabled');
          }
        });
      };

      return ProfileFrameView;

    })(FrameView);
    return ProfileFrameView;
  });

}).call(this);
