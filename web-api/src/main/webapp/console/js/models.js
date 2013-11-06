// Generated by CoffeeScript 1.6.3
(function() {
  "use strict";
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  define('models', ['module', 'lib/common'], function(module) {
    var Action, Actions, ChangeObserableEntity, Collection, Content, Contents, Entity, Event, Events, Link, Links, ManagerCollection, Node, Nodes, Notification, Notifications, Project, Projects, Publisher, Publishers, ROOT, Report, Reports, Service, SimpleCollection, Tenant, User, Workflow, Workflows, _ref, _ref1, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _ref16, _ref17, _ref18, _ref19, _ref2, _ref20, _ref21, _ref22, _ref23, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _setAuth;
    ROOT = module.config().BASE_URL;
    if (ROOT.slice(-1) === '/') {
      ROOT = ROOT.slice(0, -1);
    }
    _setAuth = function(options) {
      var _base, _base1, _ref;
      if (options.headers == null) {
        options.headers = {};
      }
      if ((_base = options.headers).Accept == null) {
        _base.Accept = 'application/json';
      }
      if ((_base1 = options.headers).Authorization == null) {
        _base1.Authorization = ((_ref = User.current) != null ? _ref.get('credential') : void 0) || '';
      }
      return options;
    };
    Entity = (function(_super) {
      __extends(Entity, _super);

      function Entity() {
        _ref = Entity.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Entity.prototype.sync = function(method, model, options) {
        if (options == null) {
          options = {};
        }
        return Entity.__super__.sync.call(this, method, model, _setAuth(options));
      };

      return Entity;

    })(Backbone.Model);
    Collection = Backbone.Collection;
    SimpleCollection = (function(_super) {
      __extends(SimpleCollection, _super);

      function SimpleCollection() {
        _ref1 = SimpleCollection.__super__.constructor.apply(this, arguments);
        return _ref1;
      }

      SimpleCollection.prototype.sync = function(method, model, options) {
        if (options == null) {
          options = {};
        }
        return SimpleCollection.__super__.sync.call(this, method, model, _setAuth(options));
      };

      return SimpleCollection;

    })(Collection);
    ManagerCollection = (function(_super) {
      __extends(ManagerCollection, _super);

      ManagerCollection.prototype.mode = 'client';

      ManagerCollection.prototype.defaultState = {
        pageSize: 15
      };

      ManagerCollection.prototype._delay = 1000;

      function ManagerCollection() {
        var key, options, value, _ref2;
        options = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        if (this.state == null) {
          this.state = {};
        }
        _ref2 = this.defaultState;
        for (key in _ref2) {
          value = _ref2[key];
          this.state[key] = value;
        }
        ManagerCollection.__super__.constructor.apply(this, options);
      }

      ManagerCollection.prototype.load = function(callback, delay) {
        var _this = this;
        if (delay == null) {
          delay = this._delay;
        }
        if (!this._last_load || delay < 1 || (Date.now() - this._last_load) > delay) {
          this.fetch({
            reset: true,
            success: function(collection, response, options) {
              _this._last_load = Date.now();
              return typeof callback === "function" ? callback(collection, 'loaded', response, options) : void 0;
            },
            error: function(collection, response, options) {
              return typeof callback === "function" ? callback(this, 'error', response, options) : void 0;
            }
          });
        } else {
          if (typeof callback === "function") {
            callback(this, 'skipped');
          }
        }
        return this;
      };

      ManagerCollection.prototype.sync = function(method, model, options) {
        if (options == null) {
          options = {};
        }
        return ManagerCollection.__super__.sync.call(this, method, model, _setAuth(options));
      };

      return ManagerCollection;

    })(Backbone.PageableCollection);
    Tenant = (function(_super) {
      __extends(Tenant, _super);

      function Tenant() {
        _ref2 = Tenant.__super__.constructor.apply(this, arguments);
        return _ref2;
      }

      Tenant.prototype.urlRoot = ROOT + '/tenants';

      return Tenant;

    })(Entity);
    User = (function(_super) {
      __extends(User, _super);

      function User() {
        _ref3 = User.__super__.constructor.apply(this, arguments);
        return _ref3;
      }

      User.prototype.urlRoot = ROOT + '/users';

      User.prototype.idAttribute = 'email';

      User.prototype.fullname = function() {
        if (this.has('full_name')) {
          return this.get('full_name');
        } else if (this.has('first_name') && this.has('last_name')) {
          return "" + (this.get('first_name')) + " " + (this.get('last_name'));
        } else if (this.has('name')) {
          return this.get('name');
        } else {
          return this.get('first_name') || this.get('last_name') || null;
        }
      };

      return User;

    })(Entity);
    Publisher = (function(_super) {
      __extends(Publisher, _super);

      function Publisher() {
        _ref4 = Publisher.__super__.constructor.apply(this, arguments);
        return _ref4;
      }

      return Publisher;

    })(User);
    Publishers = (function(_super) {
      __extends(Publishers, _super);

      function Publishers() {
        _ref5 = Publishers.__super__.constructor.apply(this, arguments);
        return _ref5;
      }

      Publishers.prototype.model = Publisher;

      Publishers.prototype.url = Publisher.prototype.urlRoot;

      return Publishers;

    })(ManagerCollection);
    Workflow = (function(_super) {
      __extends(Workflow, _super);

      Workflow.prototype._name = 'workflow';

      Workflow.prototype.urlRoot = ROOT + '/workflows';

      function Workflow(model, options) {
        Workflow.__super__.constructor.call(this, model, options);
        this._warp(model);
      }

      Workflow.prototype._warp = function(model) {
        var links, nodes, url, _createLinkRef, _createNodeRef, _deleted, _links_loaded, _nodes_loaded,
          _this = this;
        if (model == null) {
          model = this;
        }
        if (model instanceof this.constructor) {
          model = model.attributes;
        }
        url = (typeof this.url === "function" ? this.url() : void 0) || this.url || '';
        _nodes_loaded = Array.isArray(model.nodes);
        nodes = _nodes_loaded ? model.nodes : [];
        nodes = this.nodes = new Nodes(nodes, {
          url: url + '/nodes'
        });
        nodes._loaded = _nodes_loaded;
        _links_loaded = Array.isArray(model.links);
        links = _links_loaded ? model.links : [];
        links = this.links = new Links(links, {
          url: url + '/links'
        });
        links._loaded = _links_loaded;
        _deleted = this._deleted = [];
        _createNodeRef = this._createNodeRef.bind(this);
        nodes.forEach(_createNodeRef);
        this.listenTo(nodes, {
          add: _createNodeRef,
          remove: function(node) {
            _this._removeNodeRef(node);
            if (!node.isNew()) {
              _deleted.push(node);
            }
          }
        });
        _createLinkRef = this._createLinkRef.bind(this);
        links.forEach(_createLinkRef);
        this.listenTo(links, {
          add: _createLinkRef,
          remove: function(link) {
            _this._removeLinkRef(link);
            if (!link.isNew()) {
              _deleted.push(link);
            }
          }
        });
        this.set({});
      };

      Workflow.prototype.fetch = function(options) {
        var _ref6, _success,
          _this = this;
        if (options == null) {
          options = {};
        }
        _success = (_ref6 = options.success) != null ? _ref6.bind(this) : void 0;
        options.success = function(collection, response, options) {
          _this._warp(collection);
          return typeof _success === "function" ? _success(collection, response, options) : void 0;
        };
        Workflow.__super__.fetch.call(this, options);
        return this;
      };

      Workflow.prototype.loaded = function() {
        var _ref6, _ref7;
        return Boolean(((_ref6 = this.nodes) != null ? _ref6._loaded : void 0) && ((_ref7 = this.links) != null ? _ref7._loaded : void 0));
      };

      Workflow.prototype.save = function(attributes, options) {
        var isLocalTest, link_ids, node_ids, _ref10, _ref11, _ref12, _ref13, _ref6, _ref7, _ref8, _ref9,
          _this = this;
        if (attributes == null) {
          attributes = {};
        }
        node_ids = (_ref6 = this.nodes) != null ? _ref6.map(function(r) {
          return r.id;
        }) : void 0;
        link_ids = (_ref7 = this.links) != null ? _ref7.map(function(r) {
          return r.id;
        }) : void 0;
        if ((node_ids != null ? node_ids.join(',') : void 0) !== ((_ref8 = this.get('node_ids')) != null ? _ref8.join(',') : void 0)) {
          attributes.node_ids = node_ids;
        }
        if ((link_ids != null ? link_ids.join(',') : void 0) !== ((_ref9 = this.get('link_ids')) != null ? _ref9.join(',') : void 0)) {
          attributes.link_ids = link_ids;
        }
        if (isLocalTest = (Backbone.LocalStorage != null) && this.sync !== Backbone.ajaxSync) {
          if (this.nodes != null) {
            attributes.nodes = (_ref10 = this.nodes) != null ? _ref10.map(function(r) {
              return r.attributes;
            }) : void 0;
          }
          if (this.links != null) {
            attributes.links = (_ref11 = this.links) != null ? _ref11.map(function(r) {
              return r.attributes;
            }) : void 0;
          }
        }
        if ((_ref12 = this.nodes) != null) {
          _ref12.forEach(function(node) {
            if (node.isNew()) {
              return _this.nodes.create(node, {
                wait: true
              });
            } else if (node._changed) {
              node.resetChangeFlag();
              return node.save();
            }
          });
        }
        if ((_ref13 = this.links) != null) {
          _ref13.forEach(function(link) {
            if (link.isNew()) {
              return _this.links.create(link, {
                wait: true
              });
            } else if (link._changed) {
              link.resetChangeFlag();
              return link.save();
            }
          });
        }
        console.log('save', this._name, attributes, this);
        Workflow.__super__.save.call(this, attributes, options);
        if (!isLocalTest) {
          this._deleted.forEach(function(model) {
            return model.destroy();
          });
        }
        return this;
      };

      Workflow.prototype.find = function(_arg) {
        var action, actionId, callback, id, link, linkId, n, node, nodeId, projectId;
        nodeId = _arg.nodeId, linkId = _arg.linkId, actionId = _arg.actionId, callback = _arg.callback;
        n = this._name;
        if (this.loaded()) {
          if (linkId) {
            link = this.links.get(linkId);
          } else if (nodeId) {
            node = this.nodes.get(nodeId);
            if (actionId) {
              action = node.actions().get(actionId);
            }
          }
          if (typeof callback === "function") {
            callback({
              node: node,
              link: link,
              action: action
            });
          }
        } else if (linkId) {
          id = this.id;
          new Link({
            id: linkId
          }).fetch({
            error: function() {
              return typeof callback === "function" ? callback({}) : void 0;
            },
            success: function(link) {
              if (id !== link.get(n + '_id')) {
                link = null;
              }
              return typeof callback === "function" ? callback({
                link: link
              }) : void 0;
            }
          });
        } else if (nodeId) {
          projectId = this.id;
          new Node({
            id: nodeId
          }).fetch({
            error: function() {
              return typeof callback === "function" ? callback({}) : void 0;
            },
            success: function(node) {
              if (projectId !== node.get(n + '_id')) {
                node = null;
              }
              if (node && actionId) {
                action = node.actions().get(actionId);
              }
              return typeof callback === "function" ? callback({
                node: node,
                action: action
              }) : void 0;
            }
          });
        } else {
          if (typeof callback === "function") {
            callback({});
          }
        }
        return this;
      };

      Workflow.prototype.createNode = function(data) {
        this.nodes.create(data, {
          wait: true
        });
        return this;
      };

      Workflow.prototype._createNodeRef = function(node) {
        if (!(node instanceof Node)) {
          throw new Error('it must be a Node object');
        }
        if (this._name === 'workflow') {
          node.workflow = this;
        }
        node.inLinks = [];
        node.outLinks = [];
      };

      Workflow.prototype._removeNodeRef = function(node) {
        node.inLinks.concat(node.outLinks).forEach(function(link) {
          return link.destroy();
        });
      };

      Workflow.prototype.createLink = function(data) {
        this.links.create(data, {
          wait: true
        });
        return this;
      };

      Workflow.prototype._createLinkRef = function(link) {
        var nextNodeId, prevNodeId;
        if (!(link instanceof Link)) {
          throw new Error('it must be a Link object');
        }
        if (!(link.has('prev_node_id') && link.has('next_node_id'))) {
          throw new Error('link ' + (link.key || link.id) + 'is broken, prev/next node missing');
        }
        if (this._name === 'workflow') {
          link.workflow = this;
        }
        prevNodeId = link.get('prev_node_id');
        nextNodeId = link.get('next_node_id');
        link.prevNode = this.nodes.get(prevNodeId);
        if (!link.prevNode) {
          throw new Error("cannot find prev node with id " + prevNodeId + " for link " + link.id);
        }
        link.nextNode = this.nodes.get(nextNodeId);
        if (!link.nextNode) {
          throw new Error("cannot find next node with id " + prevNodeId + " for link " + link.id);
        }
        link.prevNode.outLinks.push(link);
        link.nextNode.inLinks.push(link);
      };

      Workflow.prototype._removeLinkRef = function(link) {
        var idx, inLinks, outLinks;
        outLinks = link.prevNode.outLinks;
        idx = outLinks.indexOf(link);
        outLinks.splice(idx, 1);
        inLinks = link.nextNode.inLinks;
        idx = inLinks.indexOf(link);
        inLinks.splice(idx, 1);
      };

      Workflow.prototype.hasLink = function(from, to) {
        var link, _i, _len, _ref6;
        if (typeof from === 'string') {
          from = this.nodes.get(from);
        }
        if (typeof to === 'string') {
          to = this.nodes.get(to);
        }
        _ref6 = from.outLinks;
        for (_i = 0, _len = _ref6.length; _i < _len; _i++) {
          link = _ref6[_i];
          if (link.nextNode === to) {
            return true;
          }
        }
        return false;
      };

      return Workflow;

    })(Entity);
    Workflows = (function(_super) {
      __extends(Workflows, _super);

      function Workflows() {
        _ref6 = Workflows.__super__.constructor.apply(this, arguments);
        return _ref6;
      }

      Workflows.workflows = new Workflows;

      Workflows.prototype.model = Workflow;

      Workflows.prototype.url = Workflow.prototype.urlRoot;

      Workflows.prototype._delay = 600000;

      return Workflows;

    })(ManagerCollection);
    ChangeObserableEntity = (function(_super) {
      __extends(ChangeObserableEntity, _super);

      function ChangeObserableEntity(model, options) {
        ChangeObserableEntity.__super__.constructor.call(this, model, options);
        this.setChangeFlag = this.setChangeFlag.bind(this);
        this.resetChangeFlag();
      }

      ChangeObserableEntity.prototype.resetChangeFlag = function() {
        return this.setChangeFlag(false);
      };

      ChangeObserableEntity.prototype.setChangeFlag = function(val) {
        if (val != null) {
          this._changed = Boolean(val);
          this.off('change', this.setChangeFlag);
          if (!val) {
            this.set({});
            this.on('change', this.setChangeFlag);
          }
        } else if (!this._changed && this.hasChanged() && !this.isNew()) {
          this._changed = true;
          this.off('change', this.setChangeFlag);
        }
        return this;
      };

      return ChangeObserableEntity;

    })(Entity);
    Node = (function(_super) {
      __extends(Node, _super);

      function Node() {
        _ref7 = Node.__super__.constructor.apply(this, arguments);
        return _ref7;
      }

      Node.prototype._name = 'node';

      Node.prototype.urlRoot = ROOT + '/nodes';

      Node.prototype.name = function() {
        return this.get('name');
      };

      Node.prototype.actions = function() {
        return this._actions != null ? this._actions : this._actions = new Actions(this.get('actions'));
      };

      return Node;

    })(ChangeObserableEntity);
    Nodes = (function(_super) {
      __extends(Nodes, _super);

      function Nodes() {
        _ref8 = Nodes.__super__.constructor.apply(this, arguments);
        return _ref8;
      }

      Nodes.prototype.model = Node;

      Nodes.prototype.url = Node.prototype.urlRoot;

      return Nodes;

    })(SimpleCollection);
    Link = (function(_super) {
      __extends(Link, _super);

      function Link() {
        _ref9 = Link.__super__.constructor.apply(this, arguments);
        return _ref9;
      }

      Link.prototype._name = 'link';

      Link.prototype.urlRoot = ROOT + '/links';

      Link.prototype.name = function() {
        return this.get('name') || this.get('desc') || this.get('key');
      };

      return Link;

    })(ChangeObserableEntity);
    Links = (function(_super) {
      __extends(Links, _super);

      function Links() {
        _ref10 = Links.__super__.constructor.apply(this, arguments);
        return _ref10;
      }

      Links.prototype.model = Link;

      Links.prototype.url = Link.prototype.urlRoot;

      return Links;

    })(SimpleCollection);
    Action = (function(_super) {
      __extends(Action, _super);

      function Action() {
        _ref11 = Action.__super__.constructor.apply(this, arguments);
        return _ref11;
      }

      return Action;

    })(Entity);
    Actions = (function(_super) {
      __extends(Actions, _super);

      function Actions() {
        _ref12 = Actions.__super__.constructor.apply(this, arguments);
        return _ref12;
      }

      Actions.prototype.model = Action;

      return Actions;

    })(SimpleCollection);
    Project = (function(_super) {
      __extends(Project, _super);

      function Project() {
        _ref13 = Project.__super__.constructor.apply(this, arguments);
        return _ref13;
      }

      Project.prototype._name = 'project';

      Project.prototype.urlRoot = ROOT + '/projects';

      Project.prototype.copy = function(workflow, callback) {
        var id, links, nodes,
          _this = this;
        if (workflow == null) {
          workflow = this.get('workflow_id');
        }
        if (typeof workflow === 'string') {
          workflow = new Workflow({
            id: workflow
          });
        }
        if (!(workflow instanceof Workflow)) {
          throw new Error('must be create from a workflow');
        }
        if (!workflow.loaded()) {
          workflow.fetch({
            success: function(wf) {
              return _this.copy(wf, callback);
            }
          });
        } else {
          id = this.id;
          nodes = [];
          links = [];
          workflow.nodes.forEach(function(node) {
            var cloned_node, node_id;
            cloned_node = node.clone();
            node_id = node.id + 1000000;
            cloned_node.set({
              id: node_id,
              template_id: node.id,
              project_id: id
            });
            if (node.has('actions')) {
              cloned_node.set('actions', node.get('actions').map(function(action, i) {
                action.id = i;
                return action;
              }));
            }
            return nodes.push(cloned_node);
          });
          workflow.links.forEach(function(link) {
            var cloned_link, link_id;
            cloned_link = link.clone();
            link_id = link.id + 1000000;
            cloned_link.set({
              id: link_id,
              template_id: link.id,
              project_id: id,
              prev_node_id: link.get('prev_node_id') + 1000000,
              next_node_id: link.get('next_node_id') + 1000000
            });
            return links.push(cloned_link);
          });
          this.set({
            workflow_id: workflow.id,
            template_id: null,
            node_ids: nodes.map(function(n) {
              return n.id;
            }),
            link_ids: links.map(function(l) {
              return l.id;
            }),
            nodes: nodes,
            links: links
          });
          this._warp(this);
          console.log(this);
          if (typeof callback === "function") {
            callback(this, workflow);
          }
        }
        return this;
      };

      Project.prototype._createNodeRef = function(node) {
        Project.__super__._createNodeRef.call(this, node);
        node.project = this;
        return this;
      };

      Project.prototype._createLinkRef = function(link) {
        Project.__super__._createLinkRef.call(this, link);
        link.project = this;
        return this;
      };

      return Project;

    })(Workflow);
    Projects = (function(_super) {
      __extends(Projects, _super);

      function Projects() {
        _ref14 = Projects.__super__.constructor.apply(this, arguments);
        return _ref14;
      }

      Projects.projects = new Projects;

      Projects.find = function(options) {
        if (!this.projects.length) {
          this.projects.load(function(projects) {
            return projects.find(options);
          });
        } else {
          this.projects.find(options);
        }
        return this.projects;
      };

      Projects.prototype.model = Project;

      Projects.prototype.url = Project.prototype.urlRoot;

      Projects.prototype._delay = 60000;

      Projects.prototype.find = function(_arg) {
        var actionId, callback, linkId, nodeId, project, projectId, _find;
        projectId = _arg.projectId, nodeId = _arg.nodeId, linkId = _arg.linkId, actionId = _arg.actionId, callback = _arg.callback;
        if (!projectId) {
          throw new Error('projectId is required');
        }
        project = this.get(projectId);
        _find = function(project) {
          if (nodeId || linkId || actionId) {
            return project.find({
              nodeId: nodeId,
              linkId: linkId,
              actionId: actionId,
              callback: function(results) {
                results.project = project;
                return typeof callback === "function" ? callback(results) : void 0;
              }
            });
          } else {
            return typeof callback === "function" ? callback({
              project: project
            }) : void 0;
          }
        };
        if (project) {
          _find(project);
        } else {
          new Project({
            id: projectId
          }).fetch({
            success: _find,
            error: function() {
              return typeof callback === "function" ? callback({}) : void 0;
            }
          });
        }
        return this;
      };

      return Projects;

    })(ManagerCollection);
    Notification = (function(_super) {
      __extends(Notification, _super);

      function Notification() {
        _ref15 = Notification.__super__.constructor.apply(this, arguments);
        return _ref15;
      }

      Notification.prototype.urlRoot = ROOT + '/notifications';

      Notification.prototype.get = function(attribute) {
        var value;
        value = Notification.__super__.get.call(this, attribute);
        if (attribute === 'desc' && this.has('date')) {
          return value.replace('{{date}}', new Date(this.get('date')).toLocaleString());
        } else {
          return value;
        }
      };

      return Notification;

    })(Entity);
    Notifications = (function(_super) {
      __extends(Notifications, _super);

      function Notifications() {
        _ref16 = Notifications.__super__.constructor.apply(this, arguments);
        return _ref16;
      }

      Notifications.notifications = new Notifications;

      Notifications.prototype.model = Notification;

      Notifications.prototype.url = Notification.prototype.urlRoot;

      return Notifications;

    })(ManagerCollection);
    Event = (function(_super) {
      __extends(Event, _super);

      function Event() {
        _ref17 = Event.__super__.constructor.apply(this, arguments);
        return _ref17;
      }

      Event.prototype.urlRoot = ROOT + '/events';

      return Event;

    })(Entity);
    Events = (function(_super) {
      __extends(Events, _super);

      function Events() {
        _ref18 = Events.__super__.constructor.apply(this, arguments);
        return _ref18;
      }

      Events.prototype.model = Event;

      Events.prototype.url = Event.prototype.urlRoot;

      return Events;

    })(ManagerCollection);
    Content = (function(_super) {
      __extends(Content, _super);

      function Content() {
        _ref19 = Content.__super__.constructor.apply(this, arguments);
        return _ref19;
      }

      Content.prototype.urlRoot = ROOT + '/contents';

      return Content;

    })(Entity);
    Contents = (function(_super) {
      __extends(Contents, _super);

      function Contents() {
        _ref20 = Contents.__super__.constructor.apply(this, arguments);
        return _ref20;
      }

      Contents.prototype.model = Content;

      Contents.prototype.url = Content.prototype.urlRoot;

      return Contents;

    })(ManagerCollection);
    Report = (function(_super) {
      __extends(Report, _super);

      function Report() {
        _ref21 = Report.__super__.constructor.apply(this, arguments);
        return _ref21;
      }

      return Report;

    })(Entity);
    Reports = (function(_super) {
      __extends(Reports, _super);

      function Reports() {
        _ref22 = Reports.__super__.constructor.apply(this, arguments);
        return _ref22;
      }

      Reports.prototype.model = Report;

      Reports.prototype.url = ROOT + '/reports';

      return Reports;

    })(ManagerCollection);
    Service = (function(_super) {
      __extends(Service, _super);

      function Service() {
        _ref23 = Service.__super__.constructor.apply(this, arguments);
        return _ref23;
      }

      Service.prototype.idAttribute = 'service';

      Service.prototype.urlRoot = ROOT + '/services';

      Service.prototype.connected = function() {
        return /CONNECTED/i.test(this.get('status'));
      };

      return Service;

    })(Entity);
    return {
      Entity: Entity,
      Collection: Collection,
      ManagerCollection: ManagerCollection,
      Tenant: Tenant,
      User: User,
      Publishers: Publishers,
      Publisher: Publisher,
      Workflows: Workflows,
      Workflow: Workflow,
      Nodes: Nodes,
      Node: Node,
      Links: Links,
      Link: Link,
      Actions: Actions,
      Action: Action,
      Projects: Projects,
      Project: Project,
      Notifications: Notifications,
      Notification: Notification,
      Event: Event,
      Events: Events,
      Content: Content,
      Contents: Contents,
      Report: Report,
      Reports: Reports,
      Service: Service
    };
  });

}).call(this);
