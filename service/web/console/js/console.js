(function(){var t={}.hasOwnProperty,e=function(e,n){function i(){this.constructor=e}for(var o in n)t.call(n,o)&&(e[o]=n[o]);return i.prototype=n.prototype,e.prototype=new i,e.__super__=n.prototype,e};define("console",["lib/common"],function(t){var n,i,o,r,s,u,a,c,l,p,h,f,y,d,_,m,g,v,w,b,k,E,L,S,z,B,V;return d=function(t,e){return null==e&&(e=document),e.querySelector(t)},_=function(t,e){return null==e&&(e=document),[].slice.call(e.querySelectorAll(t))},n=function(t){function n(){return m=n.__super__.constructor.apply(this,arguments)}return e(n,t),n.prototype.el="#main",n.get=function(){return null==this.instance&&(this.instance=new this),this.instance},n.prototype.initialize=function(){var t=this;this.frames={},_(".frame",this.el).forEach(function(e){var n;n=d('#navbar a[href="#'+e.id+'"]'),t.frames[e.id]={id:e.id,el:e,navEl:null!=n?n.parentElement:void 0}}),["home","project","content","report","config","profile"].forEach(function(e){return t.frames[e]=new r(t.frames[e])}),this.fixStyles()},n.prototype.fixStyles=function(){var t,e;e=d("#navbar",this.el),t=d("#frames",this.el),(window.onresize=function(){var n;n=e.clientHeight||41,t.style.top=n+"px"})()},n.prototype.showFrame=function(t){var e,n,i=this;t=this.frames[t],null!=t&&(console.log("frame",t),t instanceof r||require([t.id],function(e){t=i.frames[t.id]=new e(t),t.render()}),t.el.classList.contains("active")||(null!=(e=d("#main .frame.active"))&&e.classList.remove("active"),null!=(n=d("#navbar li.active"))&&n.classList.remove("active"),t.el.classList.add("active"),t.navEl.classList.add("active"),$(window).resize()))},n.prototype.signout=function(){delete sessionStorage.user,p.get().show(),this.hide(),this.trigger("signout")},n.prototype.show=function(){this.el.style.visibility="visible",this.el.classList.add("active"),this.el.style.opacity=1},n.prototype.hide=function(){var t=this;this.el.classList.remove("active"),setTimeout(function(){t.el.style.visibility="hidden"},p.prototype.delay)},n}(Backbone.View),r=function(t){function n(){return g=n.__super__.constructor.apply(this,arguments)}return e(n,t),n.prototype.initialize=function(t){var e;this.navEl=t.navEl||(null!=(e=d('#navbar a[href="#'+this.id+'"]'))?e.parentElement:void 0)},n}(Backbone.View),p=function(t){function i(){return b=i.__super__.constructor.apply(this,arguments)}return e(i,t),i.prototype.el="#signin",i.get=function(){return null==this.instance&&(this.instance=new this),this.instance},i.prototype.events={"submit form":"submit"},i.prototype.initialize=function(){sessionStorage.user?this.signedIn():this.show()},i.prototype.submit=function(){return console.log("sign in"),this.signedIn(),!1},i.prototype.signedIn=function(){var t;t={id:"test",name:"test"},sessionStorage.user=JSON.stringify(t),this.trigger("success",t),this.hide(),n.get().show(),/signin/i.test(location.hash)&&(location.hash="")},i.prototype.delay=500,i.prototype.show=function(){var t=this;this.el.style.opacity=0,this.el.style.display="block",setTimeout(function(){t.el.classList.add("active"),t.el.style.opacity=1},1)},i.prototype.hide=function(){var t=this;this.el.classList.remove("active"),this.el.style.opacity=0,setTimeout(function(){t.el.style.display="none"},this.delay)},i}(Backbone.View),i=function(t){function n(){return k=n.__super__.constructor.apply(this,arguments)}return e(n,t),n.prototype.set=function(t){return n.__super__.set.call(this,t)},n.prototype.validate=function(t){return t.name&&t.id?/\w{,10}/.test(t.name)?void 0:"name max len is 10 and must be consist of alphabetic char or _":"id and name are required"},n}(Backbone.Model),f=function(t){function n(){return E=n.__super__.constructor.apply(this,arguments)}return e(n,t),n.prototype.model=h,n.prototype.url="/",n}(Backbone.Collection),h=function(t){function n(){return L=n.__super__.constructor.apply(this,arguments)}return e(n,t),n.prototype.url=function(){return ROOT+"/"+this.name+"/profile"},n}(i),y=function(t){function n(){return S=n.__super__.constructor.apply(this,arguments)}return e(n,t),n}(i),u=function(t){function n(){return z=n.__super__.constructor.apply(this,arguments)}return e(n,t),n.prototype.model=s,n.prototype.url="/users",n}(Backbone.Collection),c=function(t){function n(){return B=n.__super__.constructor.apply(this,arguments)}return e(n,t),n.prototype.model=a,n.prototype.url=function(){return this.tenant.url()+"/users"},n}(Backbone.Collection),s=function(t){function n(){return V=n.__super__.constructor.apply(this,arguments)}return e(n,t),n}(y),a=function(t){function n(){return v=n.__super__.constructor.apply(this,arguments)}return e(n,t),n}(y),o=function(t){function n(){return w=n.__super__.constructor.apply(this,arguments)}return e(n,t),n}(y),l=function(t){function i(){var t=this;this.route("","home",function(){return t.navigate("home",{replace:!0}),t.show("home")}),this.frames.forEach(function(e){t.route(e+"(/:name)",e,function(n){return t.show(e,n)})}),this.route("signin","signin",function(){}),this.route("signout","signout")}return e(i,t),i.get=function(){return null==this.instance&&(this.instance=new this),this.instance},i.prototype.frames=["home","project","workflow","calendar","content","report","config","profile"],i.prototype.show=function(t,e){var i,o;return sessionStorage.user?(console.log("route",t,e||""),t!==this.current&&(this.current=t,null!=(o=n.get())&&o.showFrame(t)),i=this[t],null!=i&&i.call(this,e),void 0):(this.navigate("signin",{replace:!0}),void 0)},i.prototype.home=function(){},i.prototype.project=function(){},i.prototype.workflow=function(){},i.prototype.calendar=function(){},i.prototype.content=function(){},i.prototype.report=function(){},i.prototype.signout=function(){console.log("sign out"),n.get().signout(),this.navigate("signin",{replace:!0})},i}(Backbone.Router),{async:t,find:d,findAll:_,ConsoleView:n,FrameView:r,SignInView:p,Entity:i,Tenants:f,Tenant:h,User:y,Participants:u,Publichers:c,Participant:s,Publicher:a,Evalutator:o,Router:l}})}).call(this);