(function(){var e={}.hasOwnProperty,t=function(t,i){function r(){this.constructor=t}for(var n in i)e.call(i,n)&&(t[n]=i[n]);return r.prototype=i.prototype,t.prototype=new r,t.__super__=i.prototype,t};define("calendar",["console","lib/jquery-ui","lib/fullcalendar"],function(e){var i,r,n,a;return n=e.find,r=e.FrameView,i=function(e){function i(){return a=i.__super__.constructor.apply(this,arguments)}return t(i,e),i.prototype.initialize=function(e){i.__super__.initialize.call(this,e),this.sidebarListEl=n(".sidebar-list",this.el)},i.prototype.render=function(){var e,t,i,r;$("#calendar_view",this.el).fullCalendar({header:{left:"prev,next today",center:"title",right:"month,agendaWeek,agendaDay"},editable:!0}),r=n("#calendar_view",this.el),t=r.parentNode,i=800/645,e=function(){var e,n;n=t.clientWidth,e=t.clientHeight,r.style.width=i>n/e?"100%":Math.floor(e*i)-20+"px"},$(window).resize(e).resize()},i}(r)})}).call(this);