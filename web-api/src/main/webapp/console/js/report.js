// Generated by CoffeeScript 1.6.3
(function() {
  'use strict';
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('report', ['base', 'models', 'manager', 'lib/d3v3', 'lib/nvd3'], function(_arg, _arg1, _arg2, d3, nv) {
    var FrameView, ManagerView, ModalDialogView, ProjectFilterView, Report, ReportFrameView, ReportManagerView, ReportView, Reports, find, _ref, _ref1, _ref2;
    find = _arg.find, FrameView = _arg.FrameView, ModalDialogView = _arg.ModalDialogView;
    Reports = _arg1.Reports, Report = _arg1.Report;
    ManagerView = _arg2.ManagerView, ProjectFilterView = _arg2.ProjectFilterView;
    ReportFrameView = (function(_super) {
      __extends(ReportFrameView, _super);

      function ReportFrameView() {
        _ref = ReportFrameView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ReportFrameView.prototype.initialize = function(options) {
        ReportFrameView.__super__.initialize.call(this, options);
        this.viewer = new ReportView({
          parent: this
        });
        this.manager = new ReportManagerView({
          el: this.el,
          parent: this
        });
        return this;
      };

      ReportFrameView.prototype.open = function(name) {
        if (name) {
          this.viewer.popup({}, function(action, data) {
            return console.log('report dialog', action, data);
          });
        } else if (!this.manager.rendered) {
          this.manager.render();
        }
        return this;
      };

      return ReportFrameView;

    })(FrameView);
    ReportManagerView = (function(_super) {
      __extends(ReportManagerView, _super);

      function ReportManagerView() {
        _ref1 = ReportManagerView.__super__.constructor.apply(this, arguments);
        return _ref1;
      }

      ReportManagerView.prototype.columns = [
        'checkbox', 'id', 'name:report', 'project', 'node_action', 'status', 'created_at', 'updated_at', {
          name: 'ended_at',
          label: 'Date Ended',
          cell: 'readonly-datetime',
          editable: false
        }, 'actions:report'
      ];

      ReportManagerView.prototype.collection = new Reports;

      ReportManagerView.prototype.initialize = function(options) {
        var collection, _remove;
        ReportManagerView.__super__.initialize.call(this, options);
        collection = this.collection.fullCollection;
        console.log('prj', find('ul.project-list', this.el));
        this.projectFilter = new ProjectFilterView({
          el: find('ul.project-list', this.el),
          collection: collection
        });
        _remove = this.remove.bind(this);
        this.on({
          remove: _remove,
          remove_selected: _remove
        });
        return this;
      };

      ReportManagerView.prototype.remove = function(models) {
        if (!Array.isArray(models)) {
          models = [models];
        }
        console.log('remove', models);
        return this;
      };

      ReportManagerView.prototype.reload = function() {
        ReportManagerView.__super__.reload.apply(this, arguments);
        return this.projectFilter.clear();
      };

      ReportManagerView.prototype.render = function() {
        ReportManagerView.__super__.render.apply(this, arguments);
        this.projectFilter.render();
        return this;
      };

      return ReportManagerView;

    })(ManagerView);
    ReportView = (function(_super) {
      __extends(ReportView, _super);

      function ReportView() {
        _ref2 = ReportView.__super__.constructor.apply(this, arguments);
        return _ref2;
      }

      ReportView.prototype.el = '#report_viewer';

      ReportView.prototype.goBackOnHidden = 'report';

      ReportView.prototype.popup = function(model, callback) {
        if (!this.rendered) {
          this.render();
        }
        return ReportView.__super__.popup.call(this, model, callback);
      };

      ReportView.prototype.render = function() {
        var _this = this;
        setTimeout(function() {
          var vote;
          vote = [
            {
              name: 'Submission 1',
              value: 30
            }, {
              name: 'Submission 2',
              value: 50
            }, {
              name: 'Submission 3',
              value: 100
            }
          ];
          _this.pieChart('#pie', vote, 'percent');
          _this.barChart('#bar', vote);
          return _this.stackedAreaChart('#stacked', [
            {
              key: 'Facebook Likes',
              values: [["2006-01-31T05:00:00.000Z", 27], ["2006-02-28T05:00:00.000Z", 27], ["2006-03-31T05:00:00.000Z", 26], ["2006-04-30T04:00:00.000Z", 26], ["2006-05-31T04:00:00.000Z", 27], ["2006-06-30T04:00:00.000Z", 24], ["2006-07-31T04:00:00.000Z", 23], ["2006-08-31T04:00:00.000Z", 23], ["2006-09-30T04:00:00.000Z", 28], ["2006-10-31T05:00:00.000Z", 29], ["2006-11-30T05:00:00.000Z", 29], ["2006-12-31T05:00:00.000Z", 23], ["2007-01-31T05:00:00.000Z", 22], ["2007-02-28T05:00:00.000Z", 22], ["2007-03-31T04:00:00.000Z", 18], ["2007-04-30T04:00:00.000Z", 17], ["2007-05-31T04:00:00.000Z", 16], ["2007-06-30T04:00:00.000Z", 19], ["2007-07-31T04:00:00.000Z", 19], ["2007-08-31T04:00:00.000Z", 20], ["2007-09-30T04:00:00.000Z", 17], ["2007-10-31T04:00:00.000Z", 16], ["2007-11-30T05:00:00.000Z", 15], ["2007-12-31T05:00:00.000Z", 17], ["2008-01-31T05:00:00.000Z", 17], ["2008-02-29T05:00:00.000Z", 16], ["2008-03-31T04:00:00.000Z", 19], ["2008-04-30T04:00:00.000Z", 18], ["2008-05-31T04:00:00.000Z", 18], ["2008-06-30T04:00:00.000Z", 16], ["2008-07-31T04:00:00.000Z", 15], ["2008-08-31T04:00:00.000Z", 16], ["2008-09-30T04:00:00.000Z", 13], ["2008-10-31T04:00:00.000Z", 12], ["2008-11-30T05:00:00.000Z", 12], ["2008-12-31T05:00:00.000Z", 16], ["2009-01-31T05:00:00.000Z", 15], ["2009-02-28T05:00:00.000Z", 15], ["2009-03-31T04:00:00.000Z", 14], ["2009-04-30T04:00:00.000Z", 15], ["2009-05-31T04:00:00.000Z", 14], ["2009-06-30T04:00:00.000Z", 16], ["2009-07-31T04:00:00.000Z", 16], ["2009-08-31T04:00:00.000Z", 17], ["2009-09-30T04:00:00.000Z", 19], ["2009-10-31T04:00:00.000Z", 17], ["2009-11-30T05:00:00.000Z", 19], ["2009-12-31T05:00:00.000Z", 23], ["2010-01-31T05:00:00.000Z", 24], ["2010-02-28T05:00:00.000Z", 26], ["2010-03-31T04:00:00.000Z", 27], ["2010-04-30T04:00:00.000Z", 26], ["2010-05-31T04:00:00.000Z", 25], ["2010-06-30T04:00:00.000Z", 26], ["2010-07-31T04:00:00.000Z", 29], ["2010-08-31T04:00:00.000Z", 27], ["2010-09-30T04:00:00.000Z", 29], ["2010-10-31T04:00:00.000Z", 29], ["2010-11-30T05:00:00.000Z", 29], ["2010-12-31T05:00:00.000Z", 29], ["2011-01-31T05:00:00.000Z", 26], ["2011-02-28T05:00:00.000Z", 29], ["2011-03-31T04:00:00.000Z", 22], ["2011-04-30T04:00:00.000Z", 25], ["2011-05-31T04:00:00.000Z", 24], ["2011-06-30T04:00:00.000Z", 23], ["2011-07-31T04:00:00.000Z", 23], ["2011-08-31T04:00:00.000Z", 32], ["2011-09-30T04:00:00.000Z", 31], ["2011-10-31T04:00:00.000Z", 27], ["2011-11-30T05:00:00.000Z", 27], ["2011-12-31T05:00:00.000Z", 20], ["2012-01-31T05:00:00.000Z", 20], ["2012-02-29T05:00:00.000Z", 20], ["2012-03-31T04:00:00.000Z", 17], ["2012-04-30T04:00:00.000Z", 17], ["2012-05-31T04:00:00.000Z", 16]]
            }, {
              key: 'Facebook Link Clicks',
              values: [["2006-01-31T05:00:00.000Z", 7], ["2006-02-28T05:00:00.000Z", 7], ["2006-03-31T05:00:00.000Z", 8], ["2006-04-30T04:00:00.000Z", 8], ["2006-05-31T04:00:00.000Z", 8], ["2006-06-30T04:00:00.000Z", 6], ["2006-07-31T04:00:00.000Z", 6], ["2006-08-31T04:00:00.000Z", 6], ["2006-09-30T04:00:00.000Z", 5], ["2006-10-31T05:00:00.000Z", 5], ["2006-11-30T05:00:00.000Z", 4], ["2006-12-31T05:00:00.000Z", 7], ["2007-01-31T05:00:00.000Z", 7], ["2007-02-28T05:00:00.000Z", 7], ["2007-03-31T04:00:00.000Z", 11], ["2007-04-30T04:00:00.000Z", 11], ["2007-05-31T04:00:00.000Z", 11], ["2007-06-30T04:00:00.000Z", 8], ["2007-07-31T04:00:00.000Z", 8], ["2007-08-31T04:00:00.000Z", 8], ["2007-09-30T04:00:00.000Z", 8], ["2007-10-31T04:00:00.000Z", 8], ["2007-11-30T05:00:00.000Z", 9], ["2007-12-31T05:00:00.000Z", 7], ["2008-01-31T05:00:00.000Z", 7], ["2008-02-29T05:00:00.000Z", 7], ["2008-03-31T04:00:00.000Z", 4], ["2008-04-30T04:00:00.000Z", 4], ["2008-05-31T04:00:00.000Z", 4], ["2008-06-30T04:00:00.000Z", 7], ["2008-07-31T04:00:00.000Z", 6], ["2008-08-31T04:00:00.000Z", 6], ["2008-09-30T04:00:00.000Z", 5], ["2008-10-31T04:00:00.000Z", 5], ["2008-11-30T05:00:00.000Z", 5], ["2008-12-31T05:00:00.000Z", 4], ["2009-01-31T05:00:00.000Z", 4], ["2009-02-28T05:00:00.000Z", 4], ["2009-03-31T04:00:00.000Z", 7], ["2009-04-30T04:00:00.000Z", 7], ["2009-05-31T04:00:00.000Z", 7], ["2009-06-30T04:00:00.000Z", 6], ["2009-07-31T04:00:00.000Z", 6], ["2009-08-31T04:00:00.000Z", 6], ["2009-09-30T04:00:00.000Z", 5], ["2009-10-31T04:00:00.000Z", 5], ["2009-11-30T05:00:00.000Z", 5], ["2009-12-31T05:00:00.000Z", 6], ["2010-01-31T05:00:00.000Z", 6], ["2010-02-28T05:00:00.000Z", 7], ["2010-03-31T04:00:00.000Z", 6], ["2010-04-30T04:00:00.000Z", 6], ["2010-05-31T04:00:00.000Z", 6], ["2010-06-30T04:00:00.000Z", 1], ["2010-07-31T04:00:00.000Z", 1], ["2010-08-31T04:00:00.000Z", 1], ["2010-09-30T04:00:00.000Z", 1], ["2010-10-31T04:00:00.000Z", 1], ["2010-11-30T05:00:00.000Z", 1], ["2010-12-31T05:00:00.000Z", 1], ["2011-01-31T05:00:00.000Z", 0], ["2011-02-28T05:00:00.000Z", 0], ["2011-03-31T04:00:00.000Z", 0], ["2011-04-30T04:00:00.000Z", 0], ["2011-05-31T04:00:00.000Z", 0], ["2011-06-30T04:00:00.000Z", 0], ["2011-07-31T04:00:00.000Z", 0], ["2011-08-31T04:00:00.000Z", 0], ["2011-09-30T04:00:00.000Z", 4], ["2011-10-31T04:00:00.000Z", 4], ["2011-11-30T05:00:00.000Z", 4], ["2011-12-31T05:00:00.000Z", 6], ["2012-01-31T05:00:00.000Z", 5], ["2012-02-29T05:00:00.000Z", 6], ["2012-03-31T04:00:00.000Z", 9], ["2012-04-30T04:00:00.000Z", 9], ["2012-05-31T04:00:00.000Z", 8]]
            }, {
              key: 'Facebook Comments',
              values: [["2006-01-31T05:00:00.000Z", 2], ["2006-02-28T05:00:00.000Z", 1], ["2006-03-31T05:00:00.000Z", 0], ["2006-04-30T04:00:00.000Z", 0], ["2006-05-31T04:00:00.000Z", 0], ["2006-06-30T04:00:00.000Z", 1], ["2006-07-31T04:00:00.000Z", 1], ["2006-08-31T04:00:00.000Z", 1], ["2006-09-30T04:00:00.000Z", 1], ["2006-10-31T05:00:00.000Z", 1], ["2006-11-30T05:00:00.000Z", 1], ["2006-12-31T05:00:00.000Z", 1], ["2007-01-31T05:00:00.000Z", 1], ["2007-02-28T05:00:00.000Z", 1], ["2007-03-31T04:00:00.000Z", 1], ["2007-04-30T04:00:00.000Z", 1], ["2007-05-31T04:00:00.000Z", 1], ["2007-06-30T04:00:00.000Z", 0], ["2007-07-31T04:00:00.000Z", 0], ["2007-08-31T04:00:00.000Z", 0], ["2007-09-30T04:00:00.000Z", 0], ["2007-10-31T04:00:00.000Z", 0], ["2007-11-30T05:00:00.000Z", 0], ["2007-12-31T05:00:00.000Z", 0], ["2008-01-31T05:00:00.000Z", 0], ["2008-02-29T05:00:00.000Z", 0], ["2008-03-31T04:00:00.000Z", 0], ["2008-04-30T04:00:00.000Z", 0], ["2008-05-31T04:00:00.000Z", 0], ["2008-06-30T04:00:00.000Z", 0], ["2008-07-31T04:00:00.000Z", 0], ["2008-08-31T04:00:00.000Z", 0], ["2008-09-30T04:00:00.000Z", 1], ["2008-10-31T04:00:00.000Z", 1], ["2008-11-30T05:00:00.000Z", 1], ["2008-12-31T05:00:00.000Z", 2], ["2009-01-31T05:00:00.000Z", 2], ["2009-02-28T05:00:00.000Z", 2], ["2009-03-31T04:00:00.000Z", 2], ["2009-04-30T04:00:00.000Z", 2], ["2009-05-31T04:00:00.000Z", 2], ["2009-06-30T04:00:00.000Z", 3], ["2009-07-31T04:00:00.000Z", 3], ["2009-08-31T04:00:00.000Z", 3], ["2009-09-30T04:00:00.000Z", 3], ["2009-10-31T04:00:00.000Z", 3], ["2009-11-30T05:00:00.000Z", 3], ["2009-12-31T05:00:00.000Z", 3], ["2010-01-31T05:00:00.000Z", 3], ["2010-02-28T05:00:00.000Z", 3], ["2010-03-31T04:00:00.000Z", 0], ["2010-04-30T04:00:00.000Z", 0], ["2010-05-31T04:00:00.000Z", 0], ["2010-06-30T04:00:00.000Z", 1], ["2010-07-31T04:00:00.000Z", 1], ["2010-08-31T04:00:00.000Z", 1], ["2010-09-30T04:00:00.000Z", 0], ["2010-10-31T04:00:00.000Z", 0], ["2010-11-30T05:00:00.000Z", 0], ["2010-12-31T05:00:00.000Z", 0], ["2011-01-31T05:00:00.000Z", 2], ["2011-02-28T05:00:00.000Z", 2], ["2011-03-31T04:00:00.000Z", 2], ["2011-04-30T04:00:00.000Z", 3], ["2011-05-31T04:00:00.000Z", 2], ["2011-06-30T04:00:00.000Z", 2], ["2011-07-31T04:00:00.000Z", 2], ["2011-08-31T04:00:00.000Z", 4], ["2011-09-30T04:00:00.000Z", 2], ["2011-10-31T04:00:00.000Z", 2], ["2011-11-30T05:00:00.000Z", 2], ["2011-12-31T05:00:00.000Z", 0], ["2012-01-31T05:00:00.000Z", 0], ["2012-02-29T05:00:00.000Z", 0], ["2012-03-31T04:00:00.000Z", 0], ["2012-04-30T04:00:00.000Z", 0], ["2012-05-31T04:00:00.000Z", 0]]
            }, {
              key: 'Twitter Favorites',
              values: [["2006-01-31T05:00:00.000Z", 13], ["2006-02-28T05:00:00.000Z", 14], ["2006-03-31T05:00:00.000Z", 7], ["2006-04-30T04:00:00.000Z", 7], ["2006-05-31T04:00:00.000Z", 7], ["2006-06-30T04:00:00.000Z", 6], ["2006-07-31T04:00:00.000Z", 6], ["2006-08-31T04:00:00.000Z", 5], ["2006-09-30T04:00:00.000Z", 7], ["2006-10-31T05:00:00.000Z", 7], ["2006-11-30T05:00:00.000Z", 7], ["2006-12-31T05:00:00.000Z", 9], ["2007-01-31T05:00:00.000Z", 9], ["2007-02-28T05:00:00.000Z", 9], ["2007-03-31T04:00:00.000Z", 10], ["2007-04-30T04:00:00.000Z", 10], ["2007-05-31T04:00:00.000Z", 10], ["2007-06-30T04:00:00.000Z", 11], ["2007-07-31T04:00:00.000Z", 10], ["2007-08-31T04:00:00.000Z", 10], ["2007-09-30T04:00:00.000Z", 11], ["2007-10-31T04:00:00.000Z", 10], ["2007-11-30T05:00:00.000Z", 9], ["2007-12-31T05:00:00.000Z", 8], ["2008-01-31T05:00:00.000Z", 9], ["2008-02-29T05:00:00.000Z", 8], ["2008-03-31T04:00:00.000Z", 9], ["2008-04-30T04:00:00.000Z", 9], ["2008-05-31T04:00:00.000Z", 8], ["2008-06-30T04:00:00.000Z", 7], ["2008-07-31T04:00:00.000Z", 7], ["2008-08-31T04:00:00.000Z", 7], ["2008-09-30T04:00:00.000Z", 7], ["2008-10-31T04:00:00.000Z", 6], ["2008-11-30T05:00:00.000Z", 6], ["2008-12-31T05:00:00.000Z", 5], ["2009-01-31T05:00:00.000Z", 5], ["2009-02-28T05:00:00.000Z", 4], ["2009-03-31T04:00:00.000Z", 6], ["2009-04-30T04:00:00.000Z", 6], ["2009-05-31T04:00:00.000Z", 6], ["2009-06-30T04:00:00.000Z", 7], ["2009-07-31T04:00:00.000Z", 8], ["2009-08-31T04:00:00.000Z", 8], ["2009-09-30T04:00:00.000Z", 10], ["2009-10-31T04:00:00.000Z", 9], ["2009-11-30T05:00:00.000Z", 10], ["2009-12-31T05:00:00.000Z", 11], ["2010-01-31T05:00:00.000Z", 11], ["2010-02-28T05:00:00.000Z", 12], ["2010-03-31T04:00:00.000Z", 8], ["2010-04-30T04:00:00.000Z", 8], ["2010-05-31T04:00:00.000Z", 8], ["2010-06-30T04:00:00.000Z", 8], ["2010-07-31T04:00:00.000Z", 9], ["2010-08-31T04:00:00.000Z", 9], ["2010-09-30T04:00:00.000Z", 10], ["2010-10-31T04:00:00.000Z", 10], ["2010-11-30T05:00:00.000Z", 10], ["2010-12-31T05:00:00.000Z", 10], ["2011-01-31T05:00:00.000Z", 17], ["2011-02-28T05:00:00.000Z", 18], ["2011-03-31T04:00:00.000Z", 17], ["2011-04-30T04:00:00.000Z", 18], ["2011-05-31T04:00:00.000Z", 17], ["2011-06-30T04:00:00.000Z", 16], ["2011-07-31T04:00:00.000Z", 15], ["2011-08-31T04:00:00.000Z", 25], ["2011-09-30T04:00:00.000Z", 18], ["2011-10-31T04:00:00.000Z", 15], ["2011-11-30T05:00:00.000Z", 15], ["2011-12-31T05:00:00.000Z", 16], ["2012-01-31T05:00:00.000Z", 16], ["2012-02-29T05:00:00.000Z", 18], ["2012-03-31T04:00:00.000Z", 7], ["2012-04-30T04:00:00.000Z", 8], ["2012-05-31T04:00:00.000Z", 7]]
            }, {
              key: 'Twitter Retweets',
              values: [["2006-01-31T05:00:00.000Z", 14], ["2006-02-28T05:00:00.000Z", 14], ["2006-03-31T05:00:00.000Z", 15], ["2006-04-30T04:00:00.000Z", 14], ["2006-05-31T04:00:00.000Z", 14], ["2006-06-30T04:00:00.000Z", 16], ["2006-07-31T04:00:00.000Z", 16], ["2006-08-31T04:00:00.000Z", 16], ["2006-09-30T04:00:00.000Z", 14], ["2006-10-31T05:00:00.000Z", 14], ["2006-11-30T05:00:00.000Z", 13], ["2006-12-31T05:00:00.000Z", 13], ["2007-01-31T05:00:00.000Z", 13], ["2007-02-28T05:00:00.000Z", 13], ["2007-03-31T04:00:00.000Z", 16], ["2007-04-30T04:00:00.000Z", 16], ["2007-05-31T04:00:00.000Z", 16], ["2007-06-30T04:00:00.000Z", 18], ["2007-07-31T04:00:00.000Z", 18], ["2007-08-31T04:00:00.000Z", 18], ["2007-09-30T04:00:00.000Z", 16], ["2007-10-31T04:00:00.000Z", 15], ["2007-11-30T05:00:00.000Z", 16], ["2007-12-31T05:00:00.000Z", 19], ["2008-01-31T05:00:00.000Z", 20], ["2008-02-29T05:00:00.000Z", 19], ["2008-03-31T04:00:00.000Z", 19], ["2008-04-30T04:00:00.000Z", 17], ["2008-05-31T04:00:00.000Z", 17], ["2008-06-30T04:00:00.000Z", 18], ["2008-07-31T04:00:00.000Z", 19], ["2008-08-31T04:00:00.000Z", 18], ["2008-09-30T04:00:00.000Z", 16], ["2008-10-31T04:00:00.000Z", 15], ["2008-11-30T05:00:00.000Z", 15], ["2008-12-31T05:00:00.000Z", 14], ["2009-01-31T05:00:00.000Z", 14], ["2009-02-28T05:00:00.000Z", 14], ["2009-03-31T04:00:00.000Z", 11], ["2009-04-30T04:00:00.000Z", 10], ["2009-05-31T04:00:00.000Z", 10], ["2009-06-30T04:00:00.000Z", 12], ["2009-07-31T04:00:00.000Z", 12], ["2009-08-31T04:00:00.000Z", 11], ["2009-09-30T04:00:00.000Z", 11], ["2009-10-31T04:00:00.000Z", 10], ["2009-11-30T05:00:00.000Z", 11], ["2009-12-31T05:00:00.000Z", 13], ["2010-01-31T05:00:00.000Z", 15], ["2010-02-28T05:00:00.000Z", 15], ["2010-03-31T04:00:00.000Z", 14], ["2010-04-30T04:00:00.000Z", 12], ["2010-05-31T04:00:00.000Z", 12], ["2010-06-30T04:00:00.000Z", 13], ["2010-07-31T04:00:00.000Z", 14], ["2010-08-31T04:00:00.000Z", 14], ["2010-09-30T04:00:00.000Z", 14], ["2010-10-31T04:00:00.000Z", 14], ["2010-11-30T05:00:00.000Z", 14], ["2010-12-31T05:00:00.000Z", 14], ["2011-01-31T05:00:00.000Z", 20], ["2011-02-28T05:00:00.000Z", 21], ["2011-03-31T04:00:00.000Z", 23], ["2011-04-30T04:00:00.000Z", 25], ["2011-05-31T04:00:00.000Z", 25], ["2011-06-30T04:00:00.000Z", 24], ["2011-07-31T04:00:00.000Z", 22], ["2011-08-31T04:00:00.000Z", 16], ["2011-09-30T04:00:00.000Z", 15], ["2011-10-31T04:00:00.000Z", 13], ["2011-11-30T05:00:00.000Z", 13], ["2011-12-31T05:00:00.000Z", 16], ["2012-01-31T05:00:00.000Z", 15], ["2012-02-29T05:00:00.000Z", 16], ["2012-03-31T04:00:00.000Z", 19], ["2012-04-30T04:00:00.000Z", 18], ["2012-05-31T04:00:00.000Z", 18]]
            }, {
              key: 'Twitter Replies',
              values: [["2006-01-31T05:00:00.000Z", 7], ["2006-02-28T05:00:00.000Z", 7], ["2006-03-31T05:00:00.000Z", 6], ["2006-04-30T04:00:00.000Z", 5], ["2006-05-31T04:00:00.000Z", 6], ["2006-06-30T04:00:00.000Z", 4], ["2006-07-31T04:00:00.000Z", 4], ["2006-08-31T04:00:00.000Z", 4], ["2006-09-30T04:00:00.000Z", 6], ["2006-10-31T05:00:00.000Z", 6], ["2006-11-30T05:00:00.000Z", 5], ["2006-12-31T05:00:00.000Z", 5], ["2007-01-31T05:00:00.000Z", 5], ["2007-02-28T05:00:00.000Z", 5], ["2007-03-31T04:00:00.000Z", 5], ["2007-04-30T04:00:00.000Z", 6], ["2007-05-31T04:00:00.000Z", 6], ["2007-06-30T04:00:00.000Z", 4], ["2007-07-31T04:00:00.000Z", 4], ["2007-08-31T04:00:00.000Z", 5], ["2007-09-30T04:00:00.000Z", 5], ["2007-10-31T04:00:00.000Z", 5], ["2007-11-30T05:00:00.000Z", 5], ["2007-12-31T05:00:00.000Z", 5], ["2008-01-31T05:00:00.000Z", 5], ["2008-02-29T05:00:00.000Z", 5], ["2008-03-31T04:00:00.000Z", 6], ["2008-04-30T04:00:00.000Z", 6], ["2008-05-31T04:00:00.000Z", 6], ["2008-06-30T04:00:00.000Z", 5], ["2008-07-31T04:00:00.000Z", 5], ["2008-08-31T04:00:00.000Z", 5], ["2008-09-30T04:00:00.000Z", 5], ["2008-10-31T04:00:00.000Z", 5], ["2008-11-30T05:00:00.000Z", 5], ["2008-12-31T05:00:00.000Z", 5], ["2009-01-31T05:00:00.000Z", 5], ["2009-02-28T05:00:00.000Z", 4], ["2009-03-31T04:00:00.000Z", 5], ["2009-04-30T04:00:00.000Z", 5], ["2009-05-31T04:00:00.000Z", 5], ["2009-06-30T04:00:00.000Z", 6], ["2009-07-31T04:00:00.000Z", 6], ["2009-08-31T04:00:00.000Z", 7], ["2009-09-30T04:00:00.000Z", 6], ["2009-10-31T04:00:00.000Z", 5], ["2009-11-30T05:00:00.000Z", 6], ["2009-12-31T05:00:00.000Z", 6], ["2010-01-31T05:00:00.000Z", 6], ["2010-02-28T05:00:00.000Z", 6], ["2010-03-31T04:00:00.000Z", 4], ["2010-04-30T04:00:00.000Z", 4], ["2010-05-31T04:00:00.000Z", 4], ["2010-06-30T04:00:00.000Z", 3], ["2010-07-31T04:00:00.000Z", 3], ["2010-08-31T04:00:00.000Z", 3], ["2010-09-30T04:00:00.000Z", 4], ["2010-10-31T04:00:00.000Z", 5], ["2010-11-30T05:00:00.000Z", 5], ["2010-12-31T05:00:00.000Z", 5], ["2011-01-31T05:00:00.000Z", 7], ["2011-02-28T05:00:00.000Z", 8], ["2011-03-31T04:00:00.000Z", 7], ["2011-04-30T04:00:00.000Z", 8], ["2011-05-31T04:00:00.000Z", 7], ["2011-06-30T04:00:00.000Z", 8], ["2011-07-31T04:00:00.000Z", 7], ["2011-08-31T04:00:00.000Z", 5], ["2011-09-30T04:00:00.000Z", 5], ["2011-10-31T04:00:00.000Z", 4], ["2011-11-30T05:00:00.000Z", 5], ["2011-12-31T05:00:00.000Z", 8], ["2012-01-31T05:00:00.000Z", 8], ["2012-02-29T05:00:00.000Z", 9], ["2012-03-31T04:00:00.000Z", 5], ["2012-04-30T04:00:00.000Z", 5], ["2012-05-31T04:00:00.000Z", 5]]
            }, {
              key: 'Twitter Link Clicks',
              values: [["2006-01-31T05:00:00.000Z", 13], ["2006-02-28T05:00:00.000Z", 13], ["2006-03-31T05:00:00.000Z", 21], ["2006-04-30T04:00:00.000Z", 21], ["2006-05-31T04:00:00.000Z", 21], ["2006-06-30T04:00:00.000Z", 27], ["2006-07-31T04:00:00.000Z", 25], ["2006-08-31T04:00:00.000Z", 25], ["2006-09-30T04:00:00.000Z", 26], ["2006-10-31T05:00:00.000Z", 26], ["2006-11-30T05:00:00.000Z", 26], ["2006-12-31T05:00:00.000Z", 28], ["2007-01-31T05:00:00.000Z", 29], ["2007-02-28T05:00:00.000Z", 30], ["2007-03-31T04:00:00.000Z", 28], ["2007-04-30T04:00:00.000Z", 28], ["2007-05-31T04:00:00.000Z", 27], ["2007-06-30T04:00:00.000Z", 29], ["2007-07-31T04:00:00.000Z", 29], ["2007-08-31T04:00:00.000Z", 28], ["2007-09-30T04:00:00.000Z", 33], ["2007-10-31T04:00:00.000Z", 34], ["2007-11-30T05:00:00.000Z", 33], ["2007-12-31T05:00:00.000Z", 31], ["2008-01-31T05:00:00.000Z", 29], ["2008-02-29T05:00:00.000Z", 28], ["2008-03-31T04:00:00.000Z", 27], ["2008-04-30T04:00:00.000Z", 28], ["2008-05-31T04:00:00.000Z", 29], ["2008-06-30T04:00:00.000Z", 29], ["2008-07-31T04:00:00.000Z", 28], ["2008-08-31T04:00:00.000Z", 28], ["2008-09-30T04:00:00.000Z", 25], ["2008-10-31T04:00:00.000Z", 21], ["2008-11-30T05:00:00.000Z", 20], ["2008-12-31T05:00:00.000Z", 16], ["2009-01-31T05:00:00.000Z", 17], ["2009-02-28T05:00:00.000Z", 17], ["2009-03-31T04:00:00.000Z", 22], ["2009-04-30T04:00:00.000Z", 25], ["2009-05-31T04:00:00.000Z", 25], ["2009-06-30T04:00:00.000Z", 17], ["2009-07-31T04:00:00.000Z", 17], ["2009-08-31T04:00:00.000Z", 17], ["2009-09-30T04:00:00.000Z", 25], ["2009-10-31T04:00:00.000Z", 23], ["2009-11-30T05:00:00.000Z", 26], ["2009-12-31T05:00:00.000Z", 24], ["2010-01-31T05:00:00.000Z", 23], ["2010-02-28T05:00:00.000Z", 24], ["2010-03-31T04:00:00.000Z", 36], ["2010-04-30T04:00:00.000Z", 34], ["2010-05-31T04:00:00.000Z", 30], ["2010-06-30T04:00:00.000Z", 30], ["2010-07-31T04:00:00.000Z", 33], ["2010-08-31T04:00:00.000Z", 32], ["2010-09-30T04:00:00.000Z", 30], ["2010-10-31T04:00:00.000Z", 32], ["2010-11-30T05:00:00.000Z", 31], ["2010-12-31T05:00:00.000Z", 32], ["2011-01-31T05:00:00.000Z", 42], ["2011-02-28T05:00:00.000Z", 46], ["2011-03-31T04:00:00.000Z", 40], ["2011-04-30T04:00:00.000Z", 44], ["2011-05-31T04:00:00.000Z", 40], ["2011-06-30T04:00:00.000Z", 38], ["2011-07-31T04:00:00.000Z", 36], ["2011-08-31T04:00:00.000Z", 49], ["2011-09-30T04:00:00.000Z", 43], ["2011-10-31T04:00:00.000Z", 36], ["2011-11-30T05:00:00.000Z", 35], ["2011-12-31T05:00:00.000Z", 32], ["2012-01-31T05:00:00.000Z", 32], ["2012-02-29T05:00:00.000Z", 35], ["2012-03-31T04:00:00.000Z", 26], ["2012-04-30T04:00:00.000Z", 25], ["2012-05-31T04:00:00.000Z", 25]]
            }, {
              key: 'Email Replies',
              values: [["2006-01-31T05:00:00.000Z", 0], ["2006-02-28T05:00:00.000Z", 0], ["2006-03-31T05:00:00.000Z", 0], ["2006-04-30T04:00:00.000Z", 0], ["2006-05-31T04:00:00.000Z", 0], ["2006-06-30T04:00:00.000Z", 0], ["2006-07-31T04:00:00.000Z", 0], ["2006-08-31T04:00:00.000Z", 0], ["2006-09-30T04:00:00.000Z", 0], ["2006-10-31T05:00:00.000Z", 0], ["2006-11-30T05:00:00.000Z", 0], ["2006-12-31T05:00:00.000Z", 0], ["2007-01-31T05:00:00.000Z", 0], ["2007-02-28T05:00:00.000Z", 0], ["2007-03-31T04:00:00.000Z", 0], ["2007-04-30T04:00:00.000Z", 0], ["2007-05-31T04:00:00.000Z", 0], ["2007-06-30T04:00:00.000Z", 0], ["2007-07-31T04:00:00.000Z", 0], ["2007-08-31T04:00:00.000Z", 0], ["2007-09-30T04:00:00.000Z", 0], ["2007-10-31T04:00:00.000Z", 0], ["2007-11-30T05:00:00.000Z", 0], ["2007-12-31T05:00:00.000Z", 0], ["2008-01-31T05:00:00.000Z", 0], ["2008-02-29T05:00:00.000Z", 0], ["2008-03-31T04:00:00.000Z", 0], ["2008-04-30T04:00:00.000Z", 0], ["2008-05-31T04:00:00.000Z", 0], ["2008-06-30T04:00:00.000Z", 0], ["2008-07-31T04:00:00.000Z", 0], ["2008-08-31T04:00:00.000Z", 0], ["2008-09-30T04:00:00.000Z", 0], ["2008-10-31T04:00:00.000Z", 0], ["2008-11-30T05:00:00.000Z", 0], ["2008-12-31T05:00:00.000Z", 0], ["2009-01-31T05:00:00.000Z", 0], ["2009-02-28T05:00:00.000Z", 0], ["2009-03-31T04:00:00.000Z", 0], ["2009-04-30T04:00:00.000Z", 0], ["2009-05-31T04:00:00.000Z", 0], ["2009-06-30T04:00:00.000Z", 0], ["2009-07-31T04:00:00.000Z", 0], ["2009-08-31T04:00:00.000Z", 0], ["2009-09-30T04:00:00.000Z", 0], ["2009-10-31T04:00:00.000Z", 0], ["2009-11-30T05:00:00.000Z", 0], ["2009-12-31T05:00:00.000Z", 0], ["2010-01-31T05:00:00.000Z", 0], ["2010-02-28T05:00:00.000Z", 0], ["2010-03-31T04:00:00.000Z", 0], ["2010-04-30T04:00:00.000Z", 0], ["2010-05-31T04:00:00.000Z", 0], ["2010-06-30T04:00:00.000Z", 0], ["2010-07-31T04:00:00.000Z", 0], ["2010-08-31T04:00:00.000Z", 0], ["2010-09-30T04:00:00.000Z", 0], ["2010-10-31T04:00:00.000Z", 0], ["2010-11-30T05:00:00.000Z", 0], ["2010-12-31T05:00:00.000Z", 0], ["2011-01-31T05:00:00.000Z", 0], ["2011-02-28T05:00:00.000Z", 0], ["2011-03-31T04:00:00.000Z", 0], ["2011-04-30T04:00:00.000Z", 0], ["2011-05-31T04:00:00.000Z", 0], ["2011-06-30T04:00:00.000Z", 0], ["2011-07-31T04:00:00.000Z", 0], ["2011-08-31T04:00:00.000Z", 0], ["2011-09-30T04:00:00.000Z", 0], ["2011-10-31T04:00:00.000Z", 0], ["2011-11-30T05:00:00.000Z", 0], ["2011-12-31T05:00:00.000Z", 0], ["2012-01-31T05:00:00.000Z", 0], ["2012-02-29T05:00:00.000Z", 0], ["2012-03-31T04:00:00.000Z", 0], ["2012-04-30T04:00:00.000Z", 0], ["2012-05-31T04:00:00.000Z", 0]]
            }, {
              key: 'Email Link Clicks',
              values: [["2006-01-31T05:00:00.000Z", 0], ["2006-02-28T05:00:00.000Z", 0], ["2006-03-31T05:00:00.000Z", 0], ["2006-04-30T04:00:00.000Z", 0], ["2006-05-31T04:00:00.000Z", 0], ["2006-06-30T04:00:00.000Z", 0], ["2006-07-31T04:00:00.000Z", 0], ["2006-08-31T04:00:00.000Z", 0], ["2006-09-30T04:00:00.000Z", 0], ["2006-10-31T05:00:00.000Z", 0], ["2006-11-30T05:00:00.000Z", 0], ["2006-12-31T05:00:00.000Z", 0], ["2007-01-31T05:00:00.000Z", 0], ["2007-02-28T05:00:00.000Z", 0], ["2007-03-31T04:00:00.000Z", 0], ["2007-04-30T04:00:00.000Z", 0], ["2007-05-31T04:00:00.000Z", 0], ["2007-06-30T04:00:00.000Z", 0], ["2007-07-31T04:00:00.000Z", 0], ["2007-08-31T04:00:00.000Z", 0], ["2007-09-30T04:00:00.000Z", 0], ["2007-10-31T04:00:00.000Z", 0], ["2007-11-30T05:00:00.000Z", 0], ["2007-12-31T05:00:00.000Z", 0], ["2008-01-31T05:00:00.000Z", 0], ["2008-02-29T05:00:00.000Z", 0], ["2008-03-31T04:00:00.000Z", 0], ["2008-04-30T04:00:00.000Z", 0], ["2008-05-31T04:00:00.000Z", 0], ["2008-06-30T04:00:00.000Z", 0], ["2008-07-31T04:00:00.000Z", 0], ["2008-08-31T04:00:00.000Z", 0], ["2008-09-30T04:00:00.000Z", 0], ["2008-10-31T04:00:00.000Z", 0], ["2008-11-30T05:00:00.000Z", 0], ["2008-12-31T05:00:00.000Z", 0], ["2009-01-31T05:00:00.000Z", 0], ["2009-02-28T05:00:00.000Z", 0], ["2009-03-31T04:00:00.000Z", 0], ["2009-04-30T04:00:00.000Z", 0], ["2009-05-31T04:00:00.000Z", 0], ["2009-06-30T04:00:00.000Z", 0], ["2009-07-31T04:00:00.000Z", 0], ["2009-08-31T04:00:00.000Z", 0], ["2009-09-30T04:00:00.000Z", 0], ["2009-10-31T04:00:00.000Z", 0], ["2009-11-30T05:00:00.000Z", 0], ["2009-12-31T05:00:00.000Z", 0], ["2010-01-31T05:00:00.000Z", 0], ["2010-02-28T05:00:00.000Z", 0], ["2010-03-31T04:00:00.000Z", 0], ["2010-04-30T04:00:00.000Z", 0], ["2010-05-31T04:00:00.000Z", 0], ["2010-06-30T04:00:00.000Z", 0], ["2010-07-31T04:00:00.000Z", 0], ["2010-08-31T04:00:00.000Z", 0], ["2010-09-30T04:00:00.000Z", 0], ["2010-10-31T04:00:00.000Z", 0], ["2010-11-30T05:00:00.000Z", 0], ["2010-12-31T05:00:00.000Z", 0], ["2011-01-31T05:00:00.000Z", 0], ["2011-02-28T05:00:00.000Z", 0], ["2011-03-31T04:00:00.000Z", 0], ["2011-04-30T04:00:00.000Z", 0], ["2011-05-31T04:00:00.000Z", 0], ["2011-06-30T04:00:00.000Z", 0], ["2011-07-31T04:00:00.000Z", 0], ["2011-08-31T04:00:00.000Z", 0], ["2011-09-30T04:00:00.000Z", 0], ["2011-10-31T04:00:00.000Z", 0], ["2011-11-30T05:00:00.000Z", 0], ["2011-12-31T05:00:00.000Z", 0], ["2012-01-31T05:00:00.000Z", 0], ["2012-02-29T05:00:00.000Z", 0], ["2012-03-31T04:00:00.000Z", 0], ["2012-04-30T04:00:00.000Z", 0], ["2012-05-31T04:00:00.000Z", 0]]
            }, {
              key: 'Page Visit',
              values: [["2006-01-31T05:00:00.000Z", 6], ["2006-02-28T05:00:00.000Z", 5], ["2006-03-31T05:00:00.000Z", 8], ["2006-04-30T04:00:00.000Z", 8], ["2006-05-31T04:00:00.000Z", 8], ["2006-06-30T04:00:00.000Z", 8], ["2006-07-31T04:00:00.000Z", 8], ["2006-08-31T04:00:00.000Z", 9], ["2006-09-30T04:00:00.000Z", 5], ["2006-10-31T05:00:00.000Z", 5], ["2006-11-30T05:00:00.000Z", 5], ["2006-12-31T05:00:00.000Z", 6], ["2007-01-31T05:00:00.000Z", 6], ["2007-02-28T05:00:00.000Z", 6], ["2007-03-31T04:00:00.000Z", 5], ["2007-04-30T04:00:00.000Z", 5], ["2007-05-31T04:00:00.000Z", 6], ["2007-06-30T04:00:00.000Z", 5], ["2007-07-31T04:00:00.000Z", 6], ["2007-08-31T04:00:00.000Z", 6], ["2007-09-30T04:00:00.000Z", 4], ["2007-10-31T04:00:00.000Z", 5], ["2007-11-30T05:00:00.000Z", 5], ["2007-12-31T05:00:00.000Z", 4], ["2008-01-31T05:00:00.000Z", 4], ["2008-02-29T05:00:00.000Z", 5], ["2008-03-31T04:00:00.000Z", 4], ["2008-04-30T04:00:00.000Z", 4], ["2008-05-31T04:00:00.000Z", 4], ["2008-06-30T04:00:00.000Z", 3], ["2008-07-31T04:00:00.000Z", 3], ["2008-08-31T04:00:00.000Z", 3], ["2008-09-30T04:00:00.000Z", 3], ["2008-10-31T04:00:00.000Z", 2], ["2008-11-30T05:00:00.000Z", 2], ["2008-12-31T05:00:00.000Z", 0], ["2009-01-31T05:00:00.000Z", 0], ["2009-02-28T05:00:00.000Z", 0], ["2009-03-31T04:00:00.000Z", 0], ["2009-04-30T04:00:00.000Z", 0], ["2009-05-31T04:00:00.000Z", 0], ["2009-06-30T04:00:00.000Z", 0], ["2009-07-31T04:00:00.000Z", 0], ["2009-08-31T04:00:00.000Z", 0], ["2009-09-30T04:00:00.000Z", 0], ["2009-10-31T04:00:00.000Z", 0], ["2009-11-30T05:00:00.000Z", 0], ["2009-12-31T05:00:00.000Z", 0], ["2010-01-31T05:00:00.000Z", 0], ["2010-02-28T05:00:00.000Z", 0], ["2010-03-31T04:00:00.000Z", 0], ["2010-04-30T04:00:00.000Z", 0], ["2010-05-31T04:00:00.000Z", 0], ["2010-06-30T04:00:00.000Z", 0], ["2010-07-31T04:00:00.000Z", 0], ["2010-08-31T04:00:00.000Z", 0], ["2010-09-30T04:00:00.000Z", 0], ["2010-10-31T04:00:00.000Z", 0], ["2010-11-30T05:00:00.000Z", 0], ["2010-12-31T05:00:00.000Z", 0], ["2011-01-31T05:00:00.000Z", 1], ["2011-02-28T05:00:00.000Z", 1], ["2011-03-31T04:00:00.000Z", 0], ["2011-04-30T04:00:00.000Z", 0], ["2011-05-31T04:00:00.000Z", 0], ["2011-06-30T04:00:00.000Z", 0], ["2011-07-31T04:00:00.000Z", 0], ["2011-08-31T04:00:00.000Z", 0], ["2011-09-30T04:00:00.000Z", 0], ["2011-10-31T04:00:00.000Z", 0], ["2011-11-30T05:00:00.000Z", 0], ["2011-12-31T05:00:00.000Z", 0], ["2012-01-31T05:00:00.000Z", 0], ["2012-02-29T05:00:00.000Z", 0], ["2012-03-31T04:00:00.000Z", 0], ["2012-04-30T04:00:00.000Z", 0], ["2012-05-31T04:00:00.000Z", 0]]
            }, {
              key: 'Submission',
              values: [["2006-01-31T05:00:00.000Z", 4], ["2006-02-28T05:00:00.000Z", 4], ["2006-03-31T05:00:00.000Z", 3], ["2006-04-30T04:00:00.000Z", 3], ["2006-05-31T04:00:00.000Z", 3], ["2006-06-30T04:00:00.000Z", 3], ["2006-07-31T04:00:00.000Z", 3], ["2006-08-31T04:00:00.000Z", 3], ["2006-09-30T04:00:00.000Z", 2], ["2006-10-31T05:00:00.000Z", 2], ["2006-11-30T05:00:00.000Z", 2], ["2006-12-31T05:00:00.000Z", 2], ["2007-01-31T05:00:00.000Z", 2], ["2007-02-28T05:00:00.000Z", 2], ["2007-03-31T04:00:00.000Z", 2], ["2007-04-30T04:00:00.000Z", 2], ["2007-05-31T04:00:00.000Z", 3], ["2007-06-30T04:00:00.000Z", 3], ["2007-07-31T04:00:00.000Z", 3], ["2007-08-31T04:00:00.000Z", 3], ["2007-09-30T04:00:00.000Z", 4], ["2007-10-31T04:00:00.000Z", 4], ["2007-11-30T05:00:00.000Z", 4], ["2007-12-31T05:00:00.000Z", 5], ["2008-01-31T05:00:00.000Z", 5], ["2008-02-29T05:00:00.000Z", 5], ["2008-03-31T04:00:00.000Z", 4], ["2008-04-30T04:00:00.000Z", 3], ["2008-05-31T04:00:00.000Z", 3], ["2008-06-30T04:00:00.000Z", 5], ["2008-07-31T04:00:00.000Z", 4], ["2008-08-31T04:00:00.000Z", 4], ["2008-09-30T04:00:00.000Z", 4], ["2008-10-31T04:00:00.000Z", 3], ["2008-11-30T05:00:00.000Z", 3], ["2008-12-31T05:00:00.000Z", 2], ["2009-01-31T05:00:00.000Z", 2], ["2009-02-28T05:00:00.000Z", 2], ["2009-03-31T04:00:00.000Z", 1], ["2009-04-30T04:00:00.000Z", 1], ["2009-05-31T04:00:00.000Z", 1], ["2009-06-30T04:00:00.000Z", 3], ["2009-07-31T04:00:00.000Z", 3], ["2009-08-31T04:00:00.000Z", 2], ["2009-09-30T04:00:00.000Z", 1], ["2009-10-31T04:00:00.000Z", 1], ["2009-11-30T05:00:00.000Z", 1], ["2009-12-31T05:00:00.000Z", 0], ["2010-01-31T05:00:00.000Z", 0], ["2010-02-28T05:00:00.000Z", 0], ["2010-03-31T04:00:00.000Z", 0], ["2010-04-30T04:00:00.000Z", 0], ["2010-05-31T04:00:00.000Z", 0], ["2010-06-30T04:00:00.000Z", 0], ["2010-07-31T04:00:00.000Z", 0], ["2010-08-31T04:00:00.000Z", 0], ["2010-09-30T04:00:00.000Z", 1], ["2010-10-31T04:00:00.000Z", 1], ["2010-11-30T05:00:00.000Z", 1], ["2010-12-31T05:00:00.000Z", 1], ["2011-01-31T05:00:00.000Z", 0], ["2011-02-28T05:00:00.000Z", 0], ["2011-03-31T04:00:00.000Z", 0], ["2011-04-30T04:00:00.000Z", 0], ["2011-05-31T04:00:00.000Z", 0], ["2011-06-30T04:00:00.000Z", 0], ["2011-07-31T04:00:00.000Z", 0], ["2011-08-31T04:00:00.000Z", 2], ["2011-09-30T04:00:00.000Z", 1], ["2011-10-31T04:00:00.000Z", 1], ["2011-11-30T05:00:00.000Z", 1], ["2011-12-31T05:00:00.000Z", 0], ["2012-01-31T05:00:00.000Z", 0], ["2012-02-29T05:00:00.000Z", 0], ["2012-03-31T04:00:00.000Z", 0], ["2012-04-30T04:00:00.000Z", 0], ["2012-05-31T04:00:00.000Z", 0]]
            }
          ]);
        }, 550);
        return this;
      };

      ReportView.prototype.pieChart = function(el, data, labelType) {
        nv.addGraph(function() {
          var chart;
          chart = nv.models.pieChart().x(function(d) {
            return d.name;
          }).y(function(d) {
            return d.value;
          }).color(d3.scale.category10().range()).labelType(labelType);
          d3.select("" + el + " svg").datum(data).transition().duration(1200).call(chart);
          nv.utils.windowResize(chart.update);
          return chart;
        });
        return this;
      };

      ReportView.prototype.barChart = function(el, data) {
        nv.addGraph(function() {
          var chart;
          chart = nv.models.discreteBarChart().x(function(d) {
            return d.name;
          }).y(function(d) {
            return d.value;
          }).staggerLabels(true).showValues(true).transitionDuration(250);
          d3.select("" + el + " svg").datum([
            {
              values: data
            }
          ]).call(chart);
          nv.utils.windowResize(chart.update);
          return chart;
        });
        return this;
      };

      ReportView.prototype.stackedAreaChart = function(el, data) {
        nv.addGraph(function() {
          var chart;
          chart = nv.models.stackedAreaChart().useInteractiveGuideline(true).x(function(d) {
            return new Date(d[0]).getTime();
          }).y(function(d) {
            return d[1];
          }).transitionDuration(300);
          chart.xAxis.tickFormat(function(d) {
            return d3.time.format("%x")(new Date(d));
          });
          chart.yAxis.tickFormat(d3.format(",d"));
          d3.select("" + el + " svg").datum(data).transition().duration(0).call(chart);
          nv.utils.windowResize(chart.update);
          return chart;
        });
        return this;
      };

      return ReportView;

    })(ModalDialogView);
    return ReportFrameView;
  });

}).call(this);