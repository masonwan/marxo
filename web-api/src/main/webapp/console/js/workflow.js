// Generated by CoffeeScript 1.6.3
(function() {
  "use strict";
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('workflow', ['base', 'manager', 'models', 'actions', 'lib/jquery-jsplumb'], function(_arg, _arg1, _arg2, ActionsMixin, jsPlumb) {
    var Action, Actions, BoxView, EditorView, Entity, FormDialogView, FrameView, InnerFrameView, Link, LinkEditorView, LinkView, ManagerView, ModalDialogView, NavListView, Node, NodeEditorView, NodeListView, NodeView, Nodes, View, Workflow, WorkflowCreatorView, WorkflowEditorView, WorkflowFrameView, WorkflowManagerView, WorkflowView, Workflows, find, findAll, tpl, tplAll, _ref, _ref1, _ref10, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
    find = _arg.find, findAll = _arg.findAll, tpl = _arg.tpl, tplAll = _arg.tplAll, View = _arg.View, BoxView = _arg.BoxView, FrameView = _arg.FrameView, InnerFrameView = _arg.InnerFrameView, ModalDialogView = _arg.ModalDialogView, FormDialogView = _arg.FormDialogView, NavListView = _arg.NavListView;
    ManagerView = _arg1.ManagerView;
    Entity = _arg2.Entity, Workflows = _arg2.Workflows, Workflow = _arg2.Workflow, Nodes = _arg2.Nodes, Node = _arg2.Node, Link = _arg2.Link, Actions = _arg2.Actions, Action = _arg2.Action;
    WorkflowFrameView = (function(_super) {
      __extends(WorkflowFrameView, _super);

      function WorkflowFrameView() {
        _ref = WorkflowFrameView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      WorkflowFrameView.prototype.initialize = function(options) {
        WorkflowFrameView.__super__.initialize.call(this, options);
        this.editor = new WorkflowEditorView({
          el: '#workflow_editor',
          parent: this
        });
        this.manager = new WorkflowManagerView({
          el: '#workflow_manager',
          parent: this
        });
        return this;
      };

      WorkflowFrameView.prototype.open = function(name, sub) {
        switch (name) {
          case 'new':
            console.log('show workflow editor with create mode');
            this.switchTo(this.manager);
            this.manager.create(name);
            break;
          case 'mgr':
            console.log('show workflow mgr');
            this.switchTo(this.manager);
            break;
          default:
            if (!name) {
              throw new Error('open workflow with a name or id is needed');
            }
            console.log('show workflow editor for', name);
            this.switchTo(this.editor);
            this.editor.load(name, sub);
        }
        return this;
      };

      return WorkflowFrameView;

    })(FrameView);
    WorkflowManagerView = (function(_super) {
      __extends(WorkflowManagerView, _super);

      function WorkflowManagerView() {
        _ref1 = WorkflowManagerView.__super__.constructor.apply(this, arguments);
        return _ref1;
      }

      WorkflowManagerView.prototype.columns = ['checkbox', 'id', 'name:workflow', 'desc', 'type', 'status', 'created_at', 'updated_at', 'actions:workflow'];

      WorkflowManagerView.prototype.collection = new Workflows;

      WorkflowManagerView.prototype.defaultFilterField = 'name';

      WorkflowManagerView.prototype.events = {
        'click #wf_template_list .wf_tempate a': function(e) {
          var wf;
          e.preventDefault();
          wf = e.target.href.match(/#workflow:(\w+)/);
          console.log('wf template clicked', wf);
          if (wf.length === 2) {
            this.create(wf[1]);
          }
          return false;
        }
      };

      WorkflowManagerView.prototype.initialize = function(options) {
        var _remove;
        WorkflowManagerView.__super__.initialize.call(this, options);
        this.creator = new WorkflowCreatorView({
          el: '#workflow_creator',
          parent: this
        });
        _remove = this.remove.bind(this);
        this.on({
          remove: _remove,
          remove_selected: _remove
        });
        return this;
      };

      WorkflowManagerView.prototype.create = function(template) {
        var _this = this;
        if (!template || /^(?:new|empty)$/i.test(template)) {
          template = '';
        }
        this.creator.popup({
          template_id: template
        }, function(action, data) {
          if (action === 'save') {
            console.log('create new wf:', data);
            return _this.collection.create(data, {
              wait: true
            });
          }
        });
        return this;
      };

      WorkflowManagerView.prototype.remove = function(models) {
        var model, _i, _len;
        if (!Array.isArray(models)) {
          models = [models];
        }
        if (confirm('Make sure these selected workflows is not in use!\nDo you realy want to remove selected workflows?')) {
          for (_i = 0, _len = models.length; _i < _len; _i++) {
            model = models[_i];
            if (model != null) {
              model.destroy();
            }
          }
          if (models.length >= this.pageSize / 2) {
            this.reload();
          }
        }
        return this;
      };

      return WorkflowManagerView;

    })(ManagerView);
    WorkflowCreatorView = (function(_super) {
      __extends(WorkflowCreatorView, _super);

      function WorkflowCreatorView() {
        _ref2 = WorkflowCreatorView.__super__.constructor.apply(this, arguments);
        return _ref2;
      }

      WorkflowCreatorView.prototype.el = '#workflow_creator';

      WorkflowCreatorView.prototype.goBackOnHidden = 'workflow/mgr';

      WorkflowCreatorView.prototype.popup = function(data, callback) {
        WorkflowCreatorView.__super__.popup.call(this, data, callback);
        this.fill(data);
        return this;
      };

      WorkflowCreatorView.prototype.save = function() {
        this.data = this.read();
        this.callback('save');
        this.hide(true);
        return this;
      };

      return WorkflowCreatorView;

    })(FormDialogView);
    WorkflowEditorView = (function(_super) {
      __extends(WorkflowEditorView, _super);

      function WorkflowEditorView() {
        _ref3 = WorkflowEditorView.__super__.constructor.apply(this, arguments);
        return _ref3;
      }

      WorkflowEditorView.prototype.events = {
        'click .wf-save': 'save',
        'click .wf-reset': 'reset',
        'click #workflow_header': function() {
          var _this = this;
          return this.renamer.popup(this.model, function(action, wf) {
            if (action === 'save') {
              console.log('save name', wf);
              _this.nameEl.textContent = wf.get('name');
              _this.descEl.textContent = wf.get('desc');
              _this.model.trigger('changed', 'rename_workflow', _this.model);
            }
          });
        }
      };

      WorkflowEditorView.prototype.initialize = function(options) {
        var _this = this;
        WorkflowEditorView.__super__.initialize.call(this, options);
        this.view = new WorkflowView({
          el: find('#workflow_view', this.el),
          nodeEditor: new NodeEditorView,
          linkEditor: new LinkEditorView
        });
        this.nodeList = new NodeListView({
          el: find('#node_list', this.el),
          parent: this
        });
        this.renamer = new EditorView({
          el: find('#workflow_name_editor', this.el)
        });
        this.btnSave = find('.wf-save', this.el);
        this.btnReset = find('.wf-reset', this.el);
        this.nameEl = find('.editable-name', this.el);
        this.descEl = find('.editable-desc', this.el);
        this.listenTo(this.nodeList, 'select', function(id, node) {
          console.log('select from node list', id, node);
          if (id === 'new') {
            node = null;
          } else if (id) {
            if (node == null) {
              node = _this.model.nodes.get(id);
            }
          }
          return _this.view.createNode(node);
        });
        this._changed = this._changed.bind(this);
        return this;
      };

      WorkflowEditorView.prototype.reset = function() {
        if (confirm('All changes will be descarded since last save, are you sure to do that?')) {
          this.reload();
          this.btnSave.disabled = this.btnReset.disabled = true;
        }
        return this;
      };

      WorkflowEditorView.prototype.save = function() {
        console.log('save', this.model.attributes);
        this.btnSave.disabled = this.btnReset.disabled = true;
        this.model.save({}, {
          wait: true,
          success: function(wf) {
            return console.log('saved', wf);
          },
          error: function() {
            this._changed();
            return console.error('save failed', this.model);
          }
        });
        return this;
      };

      WorkflowEditorView.prototype._changed = function() {
        this.btnSave.disabled = this.btnReset.disabled = false;
      };

      WorkflowEditorView.prototype._loaded = function(wf, sub) {
        this.id = wf.id;
        this.nameEl.textContent = wf.get('name');
        this.descEl.textContent = wf.get('desc');
        this.model = wf;
        this.view.load(wf, sub);
        this.nodeList.setNodes(wf.nodes);
        this.listenToOnce(wf, 'changed', this._changed);
        this.listenTo(wf, 'changed', function(action, entity) {
          return console.log('workflow changed', action, entity);
        });
      };

      WorkflowEditorView.prototype._clear = function() {
        this.stopListening(this.model);
        this.id = null;
        this.model = null;
        this.nameEl.textContent = '';
        this.descEl.textContent = '';
        this.btnSave.disabled = true;
        this.btnReset.disabled = true;
        this.view.clear();
      };

      WorkflowEditorView.prototype.load = function(wf, sub) {
        var _this = this;
        if (!wf) {
          this._clear();
        } else if (typeof wf === 'string') {
          if (this.id === wf && !(sub != null ? sub.reload : void 0)) {
            this.load(this.model, sub);
          } else {
            this._clear();
            this.load(new Workflow({
              id: wf
            }), sub);
          }
        } else if (wf.id) {
          if (this.id === wf.id) {
            this._loaded(wf, sub);
          } else {
            if (wf.loaded()) {
              this._loaded(wf, sub);
            } else {
              this._clear();
              wf.fetch({
                silent: true,
                success: function(wf) {
                  return _this._loaded(wf, sub);
                }
              });
            }
          }
        } else {
          throw new Error('load neigher workflow id string nor workflow object');
        }
        return this;
      };

      WorkflowEditorView.prototype.reload = function() {
        return this.load(this.id, {
          reload: true
        });
      };

      WorkflowEditorView.prototype.render = function() {
        this.nodeList.render();
        return this;
      };

      return WorkflowEditorView;

    })(InnerFrameView);
    NodeListView = (function(_super) {
      __extends(NodeListView, _super);

      function NodeListView() {
        _ref4 = NodeListView.__super__.constructor.apply(this, arguments);
        return _ref4;
      }

      NodeListView.prototype.urlRoot = 'node';

      NodeListView.prototype.headerTitle = 'Common Nodes';

      NodeListView.prototype.defaultItem = new Node({
        id: 'new',
        name: 'Empty Node'
      });

      NodeListView.prototype.itemClassName = '';

      NodeListView.prototype.targetClassName = 'node thumb';

      NodeListView.prototype.collection = new Nodes;

      NodeListView.prototype.events = {
        'click': function(e) {
          var el;
          el = e.target;
          if (el.tagName === 'A' && el.dataset.id) {
            e.preventDefault();
            this.trigger('select', el.dataset.id, $(el).data('model'));
            return false;
          }
        },
        'mouseenter .node': function(e) {
          if (!$.data(e.target, 'is-draggable')) {
            $(e.target).draggable({
              containment: this.parent.el,
              helper: 'clone',
              zIndex: 999
            }).data('is-draggable', true);
          }
        }
      };

      NodeListView.prototype.setNodes = function(nodes) {
        var render;
        if (this.nodes !== nodes) {
          if (this.nodes) {
            this.stopListening(this.nodes);
          }
          this.nodes = nodes;
          if (nodes) {
            render = this.render.bind(this);
            this.listenTo(nodes, 'reset', render);
            this.listenTo(nodes, 'add', render);
            this.listenTo(nodes, 'remove', render);
          }
          this.render();
        }
        return this;
      };

      NodeListView.prototype.render = function() {
        this._clear();
        this.el.appendChild(this._renderHeader('Shared Nodes'));
        this._render();
        if (this.nodes) {
          this.el.appendChild(this._renderHeader('Used Nodes'));
          this._render(this.nodes);
        }
        return this;
      };

      return NodeListView;

    })(NavListView);
    EditorView = (function(_super) {
      __extends(EditorView, _super);

      function EditorView() {
        _ref5 = EditorView.__super__.constructor.apply(this, arguments);
        return _ref5;
      }

      EditorView.prototype.popup = function(data, callback) {
        var same;
        if (!(data instanceof Entity)) {
          throw new Error('data must be an model entity');
        }
        same = data === this.data;
        EditorView.__super__.popup.call(this, data, callback);
        if (!same) {
          this.fill(data.attributes);
        }
        return this;
      };

      EditorView.prototype.save = function() {
        this.data.set(this.read());
        this.callback('save');
        this.hide(true);
        return this;
      };

      return EditorView;

    })(FormDialogView);
    NodeEditorView = (function(_super) {
      __extends(NodeEditorView, _super);

      function NodeEditorView() {
        _ref6 = NodeEditorView.__super__.constructor.apply(this, arguments);
        return _ref6;
      }

      NodeEditorView.acts_as(ActionsMixin);

      NodeEditorView.prototype.el = '#node_editor';

      NodeEditorView.prototype.events = {
        'click a.action-thumb': '_addAction',
        'shown': '_fixStyle'
      };

      NodeEditorView.prototype._too_many_actions_limit = 7;

      NodeEditorView.prototype.initialize = function(options) {
        NodeEditorView.__super__.initialize.call(this, options);
        this.initActions(options);
        this._fixStyle = this._fixStyle.bind(this);
        $(window).on('resize', this._fixStyle);
        this._too_many_alert = find('#too_many_actions_alert', this.el);
        this.on('actions_update', this._checkActionLimit.bind(this));
        return this;
      };

      NodeEditorView.prototype.remove = function() {
        $(window).off('resize', this._fixStyle);
        return NodeEditorView.__super__.remove.apply(this, arguments);
      };

      NodeEditorView.prototype._fixStyle = function() {
        this.actionsEl.style.top = 20 + $(this.form).height() + 'px';
      };

      NodeEditorView.prototype._addAction = function(e) {
        var matched, target;
        e.preventDefault();
        target = e.target;
        matched = target.href.match(/action:(\w+)/i);
        if (matched) {
          this.addAction({
            type: matched[1]
          }, {
            scrollIntoView: true
          });
        }
        return false;
      };

      NodeEditorView.prototype.fill = function(attributes) {
        NodeEditorView.__super__.fill.call(this, attributes);
        this.fillActions(attributes);
        return this;
      };

      NodeEditorView.prototype.save = function() {
        this.data.set('actions', this.readActions());
        console.log('save node', this.data);
        NodeEditorView.__super__.save.apply(this, arguments);
        return this;
      };

      NodeEditorView.prototype.reset = function() {
        this.clearActions();
        return NodeEditorView.__super__.reset.apply(this, arguments);
      };

      NodeEditorView.prototype._checkActionLimit = function() {
        var cls, count;
        cls = this._too_many_alert.classList;
        count = findAll('.action', this.actionsEl).length;
        if (count > this._too_many_actions_limit) {
          cls.add('active');
          return this._too_many_alert.scrollIntoView();
        } else {
          return cls.remove('active');
        }
      };

      return NodeEditorView;

    })(EditorView);
    LinkEditorView = (function(_super) {
      __extends(LinkEditorView, _super);

      function LinkEditorView() {
        _ref7 = LinkEditorView.__super__.constructor.apply(this, arguments);
        return _ref7;
      }

      LinkEditorView.prototype.el = '#link_editor';

      return LinkEditorView;

    })(EditorView);
    WorkflowView = (function(_super) {
      __extends(WorkflowView, _super);

      function WorkflowView() {
        _ref8 = WorkflowView.__super__.constructor.apply(this, arguments);
        return _ref8;
      }

      WorkflowView.prototype.jsPlumbDefaults = {
        DragOptions: {
          zIndex: 2000
        },
        Endpoint: [
          'Dot', {
            radius: 3,
            cssClass: 'endpoint'
          }
        ],
        ConnectionsDetachable: true,
        ReattachConnections: true,
        HoverPaintStyle: {
          strokeStyle: '#42a62c',
          lineWidth: 2,
          zIndex: 2000
        },
        Connector: [
          'Flowchart', {
            stub: [40, 60],
            gap: 10,
            cssClass: 'link'
          }
        ],
        ConnectionOverlays: [
          [
            'Arrow', {
              location: -5,
              id: 'arrow'
            }
          ], [
            'Label', {
              location: 0.5,
              label: 'new link',
              id: 'label',
              cssClass: 'link-label'
            }
          ]
        ]
      };

      WorkflowView.prototype.gridDefaults = {
        padding: 30,
        spanX: 300,
        spanY: 150,
        vertical: false
      };

      WorkflowView.prototype.events = {
        'click .node': '_togglePopover',
        'mousedown': '_cancelPopover',
        'click .popover .btn-delete': function(e) {
          return this._action('remove', e);
        },
        'click .popover .btn-edit': function(e) {
          return this._action('edit', e);
        },
        'dblclick .node': function(e) {
          return this._action('edit', e);
        }
      };

      WorkflowView.prototype.initialize = function(options) {
        WorkflowView.__super__.initialize.call(this, options);
        this.nodeEditor = options.nodeEditor;
        this.linkEditor = options.linkEditor;
        jsPlumb.importDefaults(this.jsPlumbDefaults);
        this.render();
        return this;
      };

      WorkflowView.prototype._bind = function() {
        var view,
          _this = this;
        view = this;
        jsPlumb.bind('beforeDrop', function(info) {
          var sourceId, targetId;
          sourceId = info.sourceId.slice(5);
          targetId = info.targetId.slice(5);
          if (!view.model.hasLink(sourceId, targetId)) {
            view.createLink(sourceId, targetId);
          }
          return false;
        });
        jsPlumb.bind('dblclick', function(conn) {
          view.editLink(conn.getParameter('link'));
        });
        jsPlumb.bind('click', function(conn) {
          var label;
          label = conn.getOverlay('label');
          _this._togglePopover({
            target: label.canvas
          });
        });
        this.$el.droppable({
          accept: '.node.thumb',
          drop: function(e, ui) {
            var node;
            node = ui.draggable.data('model');
            if (node instanceof Node) {
              _this.createNode(node, function(node) {
                var $el_offset, x, y;
                $el_offset = _this.$el.offset();
                x = ui.offset.left - $el_offset.left;
                y = ui.offset.top - $el_offset.top;
                node.set('style', "left:" + (x < 0 ? 0 : x) + "px;top:" + (y < 0 ? 0 : y) + "px");
                return true;
              });
              return true;
            } else {
              return false;
            }
          }
        });
      };

      WorkflowView.prototype._hidePopover = function() {
        var _popped;
        _popped = this._popped;
        if (_popped) {
          if (_popped._delay) {
            _popped._delay = clearTimeout(_popped._delay);
          }
          $(_popped).popover('hide');
        }
      };

      WorkflowView.prototype._cancelPopover = function(e) {
        var org_popped;
        if (this._popped && !this.$el.find('.popover').has(e.target).length) {
          this._hidePopover();
          org_popped = this._popped;
          this._popped = null;
          org_popped._hidding = true;
          setTimeout(function() {
            return delete org_popped._hidding;
          }, 300);
        }
      };

      WorkflowView.prototype._togglePopover = function(e) {
        var el,
          _this = this;
        el = e.target;
        if (this._popped !== el && !el._hidding) {
          el._delay = setTimeout(function() {
            if (_this._popped = el) {
              $(el).popover('show');
            }
            return el._delay = null;
          }, 100);
          this._popped = el;
        } else {
          this._hidePopover();
          this._popped = null;
        }
      };

      WorkflowView.prototype._action = function(action, e) {
        var $target, func, model;
        $target = $(e.target);
        if (!$target.hasClass('target')) {
          $target = $target.parents('.target');
        }
        if (model = $target.data('node')) {
          func = this[action + 'Node'];
        } else if (model = $target.data('link')) {
          func = this[action + 'Link'];
        } else {
          console.error('no node or link in data', $target, e);
          return;
        }
        if (func != null) {
          func.call(this, model);
        }
      };

      WorkflowView.prototype.clear = function() {
        this.el.innerHTML = '';
        this.stopListening(this.model);
        return this;
      };

      WorkflowView.prototype.load = function(wf, _arg3) {
        var action, link, node, reload, _ref9;
        _ref9 = _arg3 != null ? _arg3 : {}, link = _ref9.link, node = _ref9.node, action = _ref9.action, reload = _ref9.reload;
        if (action && !node) {
          throw new Error('cannot open a action without given a node');
        }
        if (link && node) {
          throw new Error('node and link cannot be open together');
        }
        if (wf !== this.model || reload) {
          this.clear();
          this.model = wf;
          this.listenTo(this.model.nodes, 'add', this._addNode.bind(this));
          this.listenTo(this.model.links, 'add', this._addLink.bind(this));
          this._renderModel(wf);
          this.hash = "#workflow/" + wf.id;
        }
        if (node) {
          this.editNode(wf.nodes.get(node));
          if (action) {
            this.nodeEditor.viewAction(action);
          }
        } else if (link) {
          this.editLink(wf.links.get(link));
        } else {
          this.nodeEditor.cancel();
          this.linkEditor.cancel();
        }
        return this;
      };

      WorkflowView.prototype._sortNodeViews = function(nodes) {
        var grid, padding, spanX, spanY, traval, vertical, _ref9;
        nodes.lonely = [];
        nodes.start = [];
        nodes.end = [];
        nodes.forEach(function(node) {
          var _ref9;
          if ((node.inLinks.length === (_ref9 = node.outLinks.length) && _ref9 === 0)) {
            return nodes.lonely.push(node);
          } else if (node.inLinks.length === 0) {
            return nodes.start.push(node);
          } else if (node.outLinks.length === 0) {
            return nodes.end.push(node);
          }
        });
        grid = this.grid = [nodes.start.concat(nodes.lonely)];
        _ref9 = this.gridDefaults, vertical = _ref9.vertical, padding = _ref9.padding, spanX = _ref9.spanX, spanY = _ref9.spanY;
        (traval = function(level) {
          var nextLevel, _ref10;
          nextLevel = [];
          if ((_ref10 = grid[level]) != null) {
            _ref10.forEach(function(node, i) {
              var _ref11;
              node.gridX = i;
              node.gridY = level;
              if (vertical) {
                node.x = i * spanX;
                node.y = level * spanY;
              } else {
                node.x = level * spanX;
                node.y = i * spanY;
              }
              node.x += padding;
              node.y += padding;
              if ((_ref11 = node.outLinks) != null) {
                _ref11.forEach(function(link) {
                  if (link.nextNode.gridX == null) {
                    nextLevel.push(link.nextNode);
                  }
                });
              }
            });
          }
          if (nextLevel.length) {
            grid[level + 1] = nextLevel;
            traval(level + 1);
          }
        })(0);
        console.log('grid', grid);
      };

      WorkflowView.prototype._renderModel = function(wf) {
        var _this = this;
        console.log('render wf', wf);
        wf = this.model;
        if (wf == null) {
          throw new Error('workflow not loaded');
        }
        if (!(wf.nodes.length && wf.nodes.at(0).has('style'))) {
          this._sortNodeViews(wf.nodes);
        }
        jsPlumb.ready(function() {
          wf.nodes.forEach(_this._addNode.bind(_this));
          wf.links.forEach(_this._addLink.bind(_this));
        });
      };

      WorkflowView.prototype.addNode = function(node) {
        if (node == null) {
          node = 'emtpy';
        }
        if (node === 'new' || node === 'empty') {
          console.log('add a empty node');
          return this.createNode();
        } else if (!(node instanceof Node)) {
          console.error('add a invalid node', node);
          throw new Error('add a invalid node');
        }
        console.log('add node', node);
        this.model.createNode(node);
        return this;
      };

      WorkflowView.prototype._addNode = function(node) {
        var view;
        view = node.view = new NodeView({
          model: node,
          parent: this
        });
        view.render();
        this.el.appendChild(view.el);
      };

      WorkflowView.prototype.createNode = function(node, callback) {
        var desc, name,
          _this = this;
        if (!node || node.id === 'new') {
          node = new Node;
        } else if (node instanceof Node && node.id) {
          node = node.clone();
          name = node.get('name');
          desc = node.get('desc');
          node.set({
            template_id: node.id,
            key: node.get('key') + '_clone',
            name: name + ' (Clone)',
            desc: desc ? desc + ' (Clone)' : null
          });
          node.unset('style');
          node.unset('id');
        } else if (node.name) {
          node = new Node(node);
        } else {
          console.error('invalid node to create', node);
          return;
        }
        this.nodeEditor.popup(node, function(action, node) {
          if (action === 'save') {
            if (false !== (typeof callback === "function" ? callback(node) : void 0)) {
              _this.model.createNode(node);
            }
            return _this.model.trigger('changed', 'create_node', node);
          } else {
            return console.log('canceled or ignored create node', action);
          }
        });
        return this;
      };

      WorkflowView.prototype.editNode = function(node) {
        var hash,
          _this = this;
        if (!(node != null ? node.id : void 0)) {
          return this;
        }
        this.nodeEditor.popup(node, function(action, node) {
          if (action === 'save') {
            node.view.update(node);
            _this.model.trigger('changed', 'edit_node', node);
          } else {
            console.log('canceled or ignored edit node', action);
          }
          if (action !== 'ignored') {
            return location.hash = _this.hash;
          }
        });
        hash = "" + this.hash + "/node/" + node.id;
        if (location.hash.indexOf(hash) === -1) {
          this.nodeEditor.$el.one('shown', function() {
            return location.hash = hash;
          });
        }
        return this;
      };

      WorkflowView.prototype.removeNode = function(node) {
        if (!(node != null ? node.id : void 0)) {
          return this;
        }
        if (confirm("Delete the node: " + (node.get('name')) + "?")) {
          node.destroy();
          this.model.trigger('changed', 'remove_node', node);
        }
        return this;
      };

      WorkflowView.prototype.createLink = function(from, to, callback) {
        var data, name,
          _this = this;
        if (!(from.id && from.has('name'))) {
          from = this.model.nodes.get(from);
        }
        if (!(to.id && to.has('name'))) {
          to = this.model.nodes.get(to);
        }
        name = "" + (from.get('name')) + "_to_" + (to.get('name'));
        data = new Link({
          name: name.slice(0, 33).toLowerCase(),
          prev_node_id: from.id,
          next_node_id: to.id
        });
        this.linkEditor.popup(data, function(action, link) {
          if (action === 'save') {
            if (false !== (typeof callback === "function" ? callback(link) : void 0)) {
              _this.model.createLink(link);
            }
            return _this.model.trigger('changed', 'create_link', link);
          } else {
            return console.log('canceled or ignored create link', action);
          }
        });
        return this;
      };

      WorkflowView.prototype._addLink = function(link) {
        var view;
        view = link.view = new LinkView({
          model: link,
          parent: this
        });
        view.render();
      };

      WorkflowView.prototype.editLink = function(link) {
        var hash,
          _this = this;
        if (!(link != null ? link.id : void 0)) {
          return this;
        }
        this.linkEditor.popup(link, function(action, link) {
          if (action === 'save') {
            link.view.update(link);
            _this.model.trigger('changed', 'edit_link', link);
          } else {
            console.log('canceled or ignored edit link', action);
          }
          if (action !== 'ignored') {
            return location.hash = _this.hash;
          }
        });
        hash = "" + this.hash + "/link/" + link.id;
        if (location.hash.indexOf(hash) === -1) {
          this.linkEditor.$el.one('shown', function() {
            return location.hash = hash;
          });
        }
        return this;
      };

      WorkflowView.prototype.removeLink = function(link) {
        if (!(link != null ? link.id : void 0)) {
          return this;
        }
        if (confirm("Delete the link: " + (link.get('name') || '(No Name)') + "?")) {
          link.destroy();
          this.model.trigger('changed', 'remove_link', link);
        }
        return this;
      };

      WorkflowView.prototype.render = function() {
        this._bind();
        this.el.onselectstart = function() {
          return false;
        };
        return this;
      };

      return WorkflowView;

    })(View);
    NodeView = (function(_super) {
      __extends(NodeView, _super);

      function NodeView() {
        _ref9 = NodeView.__super__.constructor.apply(this, arguments);
        return _ref9;
      }

      NodeView.prototype.tagName = 'div';

      NodeView.prototype.className = 'node';

      NodeView.prototype.sourceEndpointStyle = {
        isSource: true,
        uniqueEndpoint: true,
        anchor: 'RightMiddle',
        paintStyle: {
          fillStyle: '#225588',
          radius: 9
        },
        connectorStyle: {
          strokeStyle: '#346789',
          lineWidth: 2,
          outlineColor: '#fff',
          outlineWidth: 1
        },
        connectorHoverStyle: {
          strokeStyle: '#42a62c',
          outlineWidth: 2
        },
        maxConnections: -1
      };

      NodeView.prototype.targetEndpointStyle = {
        isTarget: true,
        anchor: ['LeftMiddle', 'BottomCenter'],
        paintStyle: {
          fillStyle: '#225588',
          radius: 5
        },
        dropOptions: {
          hoverClass: 'hover',
          activeClass: 'active'
        }
      };

      NodeView.prototype._popover_tpl = tpl('#t_popover');

      NodeView.prototype.render = function() {
        var node, param,
          _this = this;
        node = this.el.node = this.model;
        this.el.id = 'node_' + node.id;
        this.listenTo(node, 'destroy', this.remove.bind(this));
        this._renderModel(node);
        jsPlumb.draggable(this.$el, {
          stack: '.node',
          stop: function() {
            var style, _ref10;
            node.view.el.style.zIndex = '';
            style = node.view.el.getAttribute('style');
            if (style !== node.get('style')) {
              node.set('style', style);
              console.log('node style', node.id, style);
              return (_ref10 = node.workflow) != null ? _ref10.trigger('changed', 'move_node', node) : void 0;
            }
          }
        });
        this.parentEl.appendChild(this.el);
        param = {
          parameters: {
            node: node,
            view: this
          }
        };
        this.srcEndpoint = jsPlumb.addEndpoint(this.$el, this.sourceEndpointStyle, param);
        jsPlumb.makeTarget(this.$el, this.targetEndpointStyle, param);
        return this;
      };

      NodeView.prototype.update = function(node) {
        if (node == null) {
          node = this.model;
        }
        this.$el.popover('destroy');
        this._renderModel(node);
        jsPlumb.repaint(this.el.id);
        return this;
      };

      NodeView.prototype._renderModel = function(node) {
        var name, _ref10;
        if (node == null) {
          node = this.model;
        }
        this.el.innerHTML = node.escape('name');
        name = node.get('name');
        if (node.has('style')) {
          this.el.setAttribute('style', node.get('style'));
        } else {
          this.el.style.left = node.x + 'px';
          this.el.style.top = node.y + 'px';
        }
        this.$el.addClass('target').data({
          node: node,
          view: this
        });
        this.$el.popover({
          container: this.parentEl,
          trigger: 'manual',
          placement: 'bottom',
          title: name,
          html: true,
          content: this._popover_tpl.replace('{desc}', node.get('desc') || '')
        });
        this.$popover = this.$el.data('popover').tip();
        if ((_ref10 = this.$popover) != null) {
          _ref10.addClass('target').data({
            node: node,
            view: this
          });
        }
      };

      NodeView.prototype.remove = function() {
        this.$el.popover('destroy');
        jsPlumb.deleteEndpoint(this.srcEndpoint);
        jsPlumb.deleteEndpoint(this);
        return NodeView.__super__.remove.apply(this, arguments);
      };

      return NodeView;

    })(View);
    LinkView = (function(_super) {
      __extends(LinkView, _super);

      function LinkView() {
        _ref10 = LinkView.__super__.constructor.apply(this, arguments);
        return _ref10;
      }

      LinkView.prototype._popover_tpl = NodeView.prototype._popover_tpl;

      LinkView.prototype.render = function() {
        var conn, link;
        link = this.model;
        link.view = this;
        conn = this.conn = jsPlumb.connect({
          source: link.prevNode.view.srcEndpoint,
          target: link.nextNode.view.el,
          cssClass: 'link',
          hoverClass: 'hover',
          parameters: {
            link: link,
            view: this
          }
        });
        this.setElement(conn.canvas);
        this.listenTo(link, 'destroy', this.remove.bind(this));
        this.label = conn.getOverlay('label');
        this.labelEl = this.label.canvas;
        this._renderLabel(link);
        return this;
      };

      LinkView.prototype.update = function(link) {
        if (link == null) {
          link = this.model;
        }
        this._destroyPopover();
        this._renderLabel(link);
        return this;
      };

      LinkView.prototype._renderLabel = function(link) {
        var label$el, name, _ref11;
        label$el = $(this.labelEl);
        name = link.get('name');
        this.label.setLabel(name || '');
        label$el.css('visibility', name ? 'visible' : 'hidden');
        label$el.popover({
          container: this.parentEl,
          title: name || 'Link',
          trigger: 'manual',
          placement: 'bottom',
          html: true,
          content: this._popover_tpl.replace('{desc}', link.get('desc') || '')
        });
        this.$popover = label$el.data('popover').tip();
        if ((_ref11 = this.$popover) != null) {
          _ref11.addClass('target').data({
            link: link,
            view: this
          });
        }
        return this;
      };

      LinkView.prototype._destroyPopover = function() {
        return $(this.labelEl).popover('destroy');
      };

      LinkView.prototype.remove = function() {
        console.log('remove', this.conn, this.model, this);
        jsPlumb.detach(this.conn);
        this._destroyPopover();
        return LinkView.__super__.remove.apply(this, arguments);
      };

      return LinkView;

    })(View);
    return WorkflowFrameView;
  });

}).call(this);
