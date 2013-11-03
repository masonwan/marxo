// Generated by CoffeeScript 1.6.3
(function() {
  "use strict";
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('project', ['base', 'manager', 'models', 'actions'], function(_arg, _arg1, _arg2, ActionsMixin) {
    var FormDialogView, FormView, FrameView, InnerFrameView, ManagerView, NavListView, NodeLinkDataEditor, Project, ProjectActionCell, ProjectEditorView, ProjectFrameView, ProjectManagemerView, ProjectViewerView, Projects, Workflow, WorkflowCell, WorkflowFilterView, WorkflowListView, Workflows, find, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
    find = _arg.find, FrameView = _arg.FrameView, InnerFrameView = _arg.InnerFrameView, NavListView = _arg.NavListView, FormView = _arg.FormView, FormDialogView = _arg.FormDialogView;
    ManagerView = _arg1.ManagerView, WorkflowFilterView = _arg1.WorkflowFilterView;
    Workflow = _arg2.Workflow, Workflows = _arg2.Workflows, Project = _arg2.Project, Projects = _arg2.Projects;
    ProjectFrameView = (function(_super) {
      __extends(ProjectFrameView, _super);

      function ProjectFrameView() {
        _ref = ProjectFrameView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ProjectFrameView.prototype.initialize = function(options) {
        var _this = this;
        ProjectFrameView.__super__.initialize.call(this, options);
        this.editor = new ProjectEditorView({
          el: '#project_editor',
          parent: this
        });
        this.viewer = new ProjectViewerView({
          el: '#project_viewer',
          parent: this
        });
        this.manager = new ProjectManagemerView({
          el: '#project_manager',
          parent: this
        });
        this.listenTo(this.manager, 'create', function(id) {
          return _this.editor.create(id);
        });
        return this;
      };

      ProjectFrameView.prototype.open = function(name, sub) {
        var _this = this;
        switch (name) {
          case 'new':
            this.editor.create(sub);
            break;
          case 'mgr':
            this.switchTo(this.manager);
            break;
          default:
            if (!name) {
              throw new Error('open project with a name or id is needed');
            }
            Projects.find({
              projectId: name,
              callback: function(_arg3) {
                var project;
                project = _arg3.project;
                if (!project) {
                  throw new Error("project with id " + name + " cannot found");
                }
                return _this.editor.edit(project, sub);
              }
            });
        }
        return this;
      };

      return ProjectFrameView;

    })(FrameView);
    ProjectEditorView = (function(_super) {
      __extends(ProjectEditorView, _super);

      function ProjectEditorView() {
        _ref1 = ProjectEditorView.__super__.constructor.apply(this, arguments);
        return _ref1;
      }

      ProjectEditorView.prototype.goBackOnHidden = 'project/mgr';

      ProjectEditorView.prototype.workflows = Workflows.workflows;

      ProjectEditorView.prototype.projects = Projects.projects;

      ProjectEditorView.prototype.events = {
        'change select[name=workflow_id]': function(e) {
          var cur, wf;
          wf = e.currentTarget.value;
          cur = this.model.get('workflow_id');
          this.$wfbtns.hide();
          this.sidebar.classList.remove('active');
          this.btnSave.disabled = true;
          if (wf && cur) {
            if (wf === cur) {
              this.sidebar.classList.add('active');
              this.btnSave.disabled = false;
            } else {
              this.$wfbtns.show();
            }
          } else if (cur && !wf) {
            this.$wfbtns.not(this.$btnSelect).show();
          } else if (wf && !cur) {
            this.$btnSelect.show();
          }
        },
        'click .btn-select': '_selectWorkflow',
        'click .btn-revert': function() {
          this.form.workflow_id.value = this.model.get('workflow_id') || '';
          $(this.form.workflow_id).change();
        },
        'click li.sidebar-item > a, a.linked-item': function(e) {
          e.preventDefault();
          this.navTo($(e.currentTarget).data('model') || e.currentTarget.dataset.item);
          return false;
        }
      };

      ProjectEditorView.prototype.initialize = function(options) {
        ProjectEditorView.__super__.initialize.call(this, options);
        this.sidebar = find('.sidebar', this.el);
        this.$btnSelect = $(find('.btn-select', this.form));
        this.$wfbtns = this.$btnSelect.add(find('.btn-revert', this.form));
        this.$wfPreview = $(find('#wf_preview', this.el));
        this.$nodeLinkSection = $(find('section.node-link', this.el));
        this.$projectForm = $(this.form);
        this.$actions = $(find('.node-actions', this.el));
        this.dataEditor = new NodeLinkDataEditor({
          el: this.$nodeLinkSection[0],
          actionEl: this.$actions[0]
        });
        return this;
      };

      ProjectEditorView.prototype.create = function(wf) {
        var _this = this;
        wf = (wf != null ? wf.id : void 0) || wf;
        if (typeof wf !== 'string') {
          wf = null;
        }
        this.popup(new Project({
          workflow_id: wf
        }), function(action, data) {
          if (action === 'save') {
            console.log('wf created', action, data);
            _this.projects.create(data, {
              wait: true
            });
            return _this.trigger('create', _this.model, _this);
          }
        });
        return this;
      };

      ProjectEditorView.prototype.edit = function(project, opt) {
        var action, link, node,
          _this = this;
        if (opt == null) {
          opt = {};
        }
        link = opt.link, node = opt.node, action = opt.action;
        if (action && !node) {
          throw new Error('cannot open a action without given a node');
        }
        if (link && node) {
          throw new Error('node and link cannot be open together');
        }
        console.log('popup node/link editor', {
          link: link,
          node: node,
          action: action
        });
        this.popup(project, function(action, data) {
          if (action === 'save') {
            console.log('project saved', action, data);
            _this.model.save(data);
            return _this.trigger('edit', _this.model, _this);
          }
        });
        return this;
      };

      ProjectEditorView.prototype.popup = function(model, callback) {
        var data, select,
          _this = this;
        data = model.toJSON();
        this.model = model;
        if (!this.rendered) {
          this.render();
        }
        ProjectEditorView.__super__.popup.call(this, data, callback);
        select = this.form.workflow_id;
        select.disabled = true;
        this.workflows.load(function(ignored, ret) {
          var _ref2;
          if ('loaded' === ret) {
            _this._renderSelect();
          }
          _this.fill(data);
          if (!model.isNew()) {
            if (model.has('created_by')) {
              _this.$el.find('#project_created_by').val(model.get('created_by')).parents('.control-group').show();
            }
            _this.$el.find('#project_created_at').val(new Date(model.get('created_at')).toLocaleString()).parents('.control-group').show();
          }
          select.disabled = !model.isNew() || model.has('node_ids') || ((_ref2 = model.nodes) != null ? _ref2.length : void 0);
          if (select.disabled) {
            _this._renderProject(model);
          } else {
            _this._selectWorkflow();
          }
          return setTimeout(function() {
            if (select.value) {
              return _this.form.name.focus();
            } else {
              return select.focus();
            }
          }, 550);
        });
        return this;
      };

      ProjectEditorView.prototype.navTo = function(model) {
        var $linkOptions, $nodeOptions, $section, type;
        type = (typeof model === 'string' ? model : model != null ? model._name : void 0) || 'project';
        if (this._cur_type !== type) {
          this.$projectForm.hide();
          this.$actions.hide();
          $section = this.$nodeLinkSection.hide();
          $nodeOptions = $section.find('.node-options').hide();
          $linkOptions = $section.find('.link-options').hide();
          if (type === 'project') {
            this.$projectForm.show();
            model = null;
          } else if (type === 'users') {
            this.$projectForm.show();
            model = null;
          } else {
            $section.show();
            if (type === 'node') {
              this.$wfPreview.show();
              this.$actions.show();
              $nodeOptions.show();
            } else if (type === 'link') {
              $linkOptions.show();
            } else {
              throw new Error("unknown type to nav " + type);
            }
          }
          this._cur_type = type;
        } else if (this._cur_model === model) {
          return this;
        }
        this._readData();
        this._cur_model = model;
        console.log('nav to', type, model);
        if (model) {
          this.dataEditor.fill(model);
        }
        return this;
      };

      ProjectEditorView.prototype._readData = function() {
        var data, model;
        if (model = this._cur_model) {
          data = this.dataEditor.read();
          console.log('data', data, 'for', model);
          model.set(data);
          model._changed = true;
        }
      };

      ProjectEditorView.prototype._selectWorkflow = function() {
        var project, wf, _ref2;
        wf = this.form.workflow_id.value;
        if (!wf) {
          return;
        }
        if (!(wf instanceof Workflow)) {
          wf = this.workflows.get(wf);
        }
        project = this.model;
        if (((_ref2 = project.nodes) != null ? _ref2.length : void 0) || project.has('node_ids')) {
          project.set({
            node_ids: null,
            nodes: null,
            link_ids: null,
            links: null
          });
          project._warp();
        }
        console.log('selected wf for project', wf.name);
        project.copy(wf, this._renderProject.bind(this));
      };

      ProjectEditorView.prototype._renderProject = function(project) {
        var $sidebar, links, nodes, _renderSidebarItem;
        this.sidebar.classList.add('active');
        this.$wfbtns.hide();
        this.btnSave.disabled = false;
        $sidebar = $(this.sidebar);
        $sidebar.find('li.node-item, li.link-item').remove();
        nodes = document.createDocumentFragment();
        _renderSidebarItem = this._renderSidebarItem.bind(this);
        project.nodes.forEach(function(node) {
          return nodes.appendChild(_renderSidebarItem(node));
        });
        links = document.createDocumentFragment();
        project.links.forEach(function(link) {
          return links.appendChild(_renderSidebarItem(link));
        });
        $sidebar.find('.node-header').after(nodes);
        $sidebar.find('.link-header').after(links);
      };

      ProjectEditorView.prototype._renderSidebarItem = function(model) {
        var $a, a, el, name;
        el = document.createElement('li');
        el.className = "sidebar-item " + model._name + "-item";
        a = document.createElement('a');
        name = a.textContent = model.name();
        a.dataset.id = model.id;
        $a = $(a).data('model', model);
        if (name.length > 15) {
          $a.tooltip({
            title: name,
            placement: 'right',
            container: this.el
          });
        }
        el.appendChild(a);
        return el;
      };

      ProjectEditorView.prototype.render = function() {
        var _this = this;
        this.workflows.load(function() {
          return _this._renderSelect();
        });
        return ProjectEditorView.__super__.render.apply(this, arguments);
      };

      ProjectEditorView.prototype.reset = function() {
        this.$wfbtns.hide();
        $(this._find('created_at')).parents('.control-group').hide();
        $(this.sidebar).find('li.node-item, li.link-item').remove();
        this.navTo(null);
        return ProjectEditorView.__super__.reset.apply(this, arguments);
      };

      ProjectEditorView.prototype._renderSelect = function() {
        var op, owned, select, shared, wfs;
        select = this.form.workflow_id;
        wfs = this.workflows.fullCollection;
        if (wfs.length) {
          owned = document.createElement('optgroup');
          owned.label = 'Owned Workflows';
          shared = document.createElement('optgroup');
          shared.label = 'Shared Workflows';
          wfs.forEach(function(wf) {
            var op;
            op = document.createElement('option');
            op.value = wf.id;
            op.textContent = wf.get('name');
            if (!wf.has('tanent_id')) {
              return shared.appendChild(op);
            } else {
              return owned.appendChild(op);
            }
          });
          select.innerHTML = '';
          op = document.createElement('option');
          op.value = '';
          op.textContent = '(Please Select)';
          select.appendChild(op);
          if (owned.childElementCount) {
            select.appendChild(owned);
          }
          if (shared.childElementCount) {
            select.appendChild(shared);
          }
        }
      };

      ProjectEditorView.prototype.save = function() {
        this._readData();
        this.data = this.read();
        this.callback('save');
        this.hide(true);
        return this;
      };

      return ProjectEditorView;

    })(FormDialogView);
    NodeLinkDataEditor = (function(_super) {
      __extends(NodeLinkDataEditor, _super);

      function NodeLinkDataEditor() {
        _ref2 = NodeLinkDataEditor.__super__.constructor.apply(this, arguments);
        return _ref2;
      }

      NodeLinkDataEditor.acts_as(ActionsMixin);

      NodeLinkDataEditor.prototype.initialize = function(options) {
        NodeLinkDataEditor.__super__.initialize.call(this, options);
        options.projectMode = true;
        this.initActions(options);
        this.nameEl = find('.node-link-name', this.el);
        this.keyEl = find('.node-link-key', this.el);
        this.$inLinks = $(find('[name=in_links]', this.form));
        this.$outLinks = $(find('[name=out_links]', this.form));
        this.$prevNode = $(find('[name=prev_node]', this.form));
        this.$nextNode = $(find('[name=next_node]', this.form));
        this.$linkedNodeLinks = this.$inLinks.add(this.$outLinks.add(this.$prevNode.add(this.$nextNode)));
        return this;
      };

      NodeLinkDataEditor.prototype.fill = function(model) {
        var name, _ref3, _ref4, _renderLinked;
        this.reset();
        NodeLinkDataEditor.__super__.fill.call(this, model.attributes);
        _renderLinked = this._renderLinked.bind(this);
        if (model.actions != null) {
          name = model.name();
          if ((_ref3 = model.inLinks) != null ? _ref3.length : void 0) {
            this.$inLinks.append(model.inLinks.map(_renderLinked));
          } else {
            this.$inLinks.append(_renderLinked(null));
          }
          if ((_ref4 = model.outLinks) != null ? _ref4.length : void 0) {
            this.$outLinks.append(model.outLinks.map(_renderLinked));
          } else {
            this.$outLinks.append(_renderLinked(null));
          }
          this.fillActions(model.actions());
        } else {
          name = "Link: " + (model.name());
          this.$prevNode.append(_renderLinked(model.prevNode));
          this.$nextNode.append(_renderLinked(model.nextNode));
        }
        this.nameEl.textContent = name;
        this.keyEl.textContent = model.get('key');
        return this;
      };

      NodeLinkDataEditor.prototype._renderLinked = function(model) {
        var btn;
        if (model) {
          btn = document.createElement('a');
          btn.className = 'btn btn-link linked-item';
          btn.textContent = model.name();
          $.data(btn, 'model', model);
        } else {
          btn = document.createElement('button');
          btn.className = 'btn btn-link';
          btn.disabled = true;
          btn.textContent = '(None)';
        }
        return btn;
      };

      NodeLinkDataEditor.prototype.read = function() {
        var data;
        data = NodeLinkDataEditor.__super__.read.apply(this, arguments);
        data.actions = this.readActions();
        return data;
      };

      NodeLinkDataEditor.prototype.reset = function() {
        this.clearActions();
        this.$linkedNodeLinks.empty();
        return NodeLinkDataEditor.__super__.reset.apply(this, arguments);
      };

      return NodeLinkDataEditor;

    })(FormView);
    ProjectViewerView = (function(_super) {
      __extends(ProjectViewerView, _super);

      function ProjectViewerView() {
        _ref3 = ProjectViewerView.__super__.constructor.apply(this, arguments);
        return _ref3;
      }

      ProjectViewerView.prototype.initialize = function(options) {
        return ProjectViewerView.__super__.initialize.call(this, options);
      };

      ProjectViewerView.prototype.load = function(name) {
        console.log('load project', name);
        return this;
      };

      ProjectViewerView.prototype.focus = function(opt) {
        var action, link, node;
        if (opt == null) {
          opt = {};
        }
        link = opt.link, node = opt.node, action = opt.action;
        if (action && !node) {
          throw new Error('cannot open a action without given a node');
        }
        if (link && node) {
          throw new Error('node and link cannot be open together');
        }
        return console.log('focus node/link', {
          link: link,
          node: node,
          action: action
        });
      };

      return ProjectViewerView;

    })(InnerFrameView);
    WorkflowListView = (function(_super) {
      __extends(WorkflowListView, _super);

      function WorkflowListView() {
        _ref4 = WorkflowListView.__super__.constructor.apply(this, arguments);
        return _ref4;
      }

      WorkflowListView.prototype.auto = false;

      WorkflowListView.prototype.urlRoot = 'worklfow';

      WorkflowListView.prototype.headerTitle = 'Workflows';

      WorkflowListView.prototype.itemClassName = 'workflow-list-item';

      WorkflowListView.prototype.collection = Workflows.workflows;

      WorkflowListView.prototype.defaultItem = null;

      WorkflowListView.prototype.events = {
        'click': function(e) {
          var el;
          el = e.target;
          if (el.tagName === 'A' && el.dataset.id) {
            e.preventDefault();
            this.trigger('select', el.dataset.id, $(el).data('model'));
            return false;
          }
        }
      };

      WorkflowListView.prototype.render = function() {
        this._clear();
        this._render();
        return this;
      };

      return WorkflowListView;

    })(NavListView);
    WorkflowCell = (function(_super) {
      __extends(WorkflowCell, _super);

      function WorkflowCell() {
        _ref5 = WorkflowCell.__super__.constructor.apply(this, arguments);
        return _ref5;
      }

      WorkflowCell.prototype.collection = Workflows.workflows;

      WorkflowCell.prototype.initialize = function(options) {
        WorkflowCell.__super__.initialize.call(this, options);
        this.urlRoot = this.column.get('urlRoot') || this.urlRoot;
        if (this.urlRoot && this.urlRoot.slice(-1) !== '/') {
          return this.urlRoot += '/';
        }
      };

      WorkflowCell.prototype.render = function() {
        var id, _callback, _render,
          _this = this;
        this.$el.empty();
        id = this.model.get('workflow_id');
        _render = function(wf) {
          var name;
          name = _.escape(wf.get('name'));
          _this.$el.addClass('workflow-link-cell').append($('<a>', {
            tabIndex: -1,
            href: '#workflow/' + id
          }).attr('title', name).text(name));
          return _this.delegateEvents();
        };
        _callback = function(wfs) {
          var wf;
          wf = wfs.get(id);
          if (wf) {
            return _render(wf);
          } else {
            wf = new Workflow({
              id: id
            });
            return wf.fetch({
              success: _render
            });
          }
        };
        if (!this.collection.length) {
          this.collection.fetch({
            success: function(wfs) {
              wfs._last_load = Date.now();
              return _callback(wfs);
            }
          });
        } else {
          _callback(this.collection);
        }
        return this;
      };

      return WorkflowCell;

    })(Backgrid.UriCell);
    ProjectActionCell = (function(_super) {
      __extends(ProjectActionCell, _super);

      function ProjectActionCell() {
        _ref6 = ProjectActionCell.__super__.constructor.apply(this, arguments);
        return _ref6;
      }

      ProjectActionCell.prototype.render = function() {
        return ProjectActionCell.__super__.render.apply(this, arguments);
      };

      return ProjectActionCell;

    })(Backgrid.ActionsCell);
    ProjectManagemerView = (function(_super) {
      __extends(ProjectManagemerView, _super);

      function ProjectManagemerView() {
        _ref7 = ProjectManagemerView.__super__.constructor.apply(this, arguments);
        return _ref7;
      }

      ProjectManagemerView.prototype.columns = [
        'checkbox', 'id', 'name:project', 'desc', {
          name: 'workflow_id',
          label: 'Workflow',
          editable: false,
          cell: WorkflowCell
        }, 'created_at', 'updated_at', 'status', {
          name: 'project',
          label: '',
          editable: false,
          sortable: false,
          cell: ProjectActionCell
        }
      ];

      ProjectManagemerView.prototype.collection = new Projects;

      ProjectManagemerView.prototype.defaultFilterField = 'name';

      ProjectManagemerView.prototype.initialize = function(options) {
        var projects,
          _this = this;
        ProjectManagemerView.__super__.initialize.call(this, options);
        this.list = new WorkflowListView({
          el: find('ul.workflow-list', this.el)
        });
        this.listenTo(this.list, 'select', function(id, model) {
          console.log('create project from workflow', id, model);
          return this.trigger('create', id, model);
        });
        this.on('remove', this.remove.bind(this));
        projects = Projects.projects.fullCollection;
        this.listenTo(projects, 'add', function(model) {
          _this.collection.add(model);
          _this.refresh();
        });
        this.listenTo(this.collection, 'remove', function(model) {
          projects.remove(model);
        });
        return this;
      };

      ProjectManagemerView.prototype.remove = function(models) {
        var names;
        if (!Array.isArray(models)) {
          models = [models];
        }
        names = models.map(function(model) {
          return model.get('name');
        });
        if (confirm("Are you sure to remove these projects: " + (names.join(', ')) + "?\n\nThis action cannot be undone!")) {
          models.forEach(function(model) {
            return model.destroy();
          });
        }
        return this;
      };

      ProjectManagemerView.prototype.render = function() {
        this.list.fetch();
        return ProjectManagemerView.__super__.render.apply(this, arguments);
      };

      return ProjectManagemerView;

    })(ManagerView);
    return ProjectFrameView;
  });

}).call(this);
