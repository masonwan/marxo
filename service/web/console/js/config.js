(function(){"use strict";var t={}.hasOwnProperty,e=function(e,n){function r(){this.constructor=e}for(var i in n)t.call(n,i)&&(e[i]=n[i]);return r.prototype=n.prototype,e.prototype=new r,e.__super__=n.prototype,e};define("config",["console"],function(t){var n,r,i,o,a,s,u,l;return r=t.FrameView,i=t.InnerFrameView,n=function(t){function n(){return s=n.__super__.constructor.apply(this,arguments)}return e(n,t),n.prototype.initialize=function(t){n.__super__.initialize.call(this,t),this.profile=new o({el:"#tenant_profile",parent:this}),this.manager=new a({el:"#user_manager",parent:this})},n.prototype.open=function(t){/^users/.test(t)?this.switchTo(this.manager):t&&this.switchTo(this.profile)},n}(r),o=function(t){function n(){return u=n.__super__.constructor.apply(this,arguments)}return e(n,t),n.prototype.initialize=function(t){return n.__super__.initialize.call(this,t)},n}(i),a=function(t){function n(){return l=n.__super__.constructor.apply(this,arguments)}return e(n,t),n.prototype.initialize=function(t){return n.__super__.initialize.call(this,t)},n}(i),n})}).call(this);
