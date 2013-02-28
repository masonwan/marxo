// Generated by CoffeeScript 1.5.0
(function() {
  var Action, Entity, Link, LinkView, Node, NodeView, SharedLink, SharedLinks, SharedNode, SharedNodes, SharedWorkflow, SharedWorkflows, Tenant, TenantLink, TenantLinks, TenantNode, TenantNodes, TenantWorkflow, TenantWorkflows, Workflow, WorkflowView, createLink, data, deleteLink, procData, removeFromArray,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  data = {
    name: 'demo_wf',
    desc: 'Demo Workflow',
    tenantId: "507f81413d070321728fdeff",
    nodes: [
      {
        id: "507f81413d070321728fde10",
        name: 'Post Idea',
        desc: 'Post software project ideas'
      }, {
        id: "507f81413d070321728fde11",
        name: 'Post Cancel',
        desc: 'Post cancel notification'
      }, {
        id: "507f81413d070321728fde12",
        name: 'Post Requrement',
        desc: 'Post project requirement'
      }, {
        id: "507f81413d070321728fde13",
        name: 'Submit Design',
        desc: 'Retrieve theme design submissions & e-mail to stackholders'
      }, {
        id: "507f81413d070321728fde14",
        name: 'Notification',
        desc: 'Notification'
      }, {
        id: "507f81413d070321728fde15",
        name: 'Post Result',
        desc: 'Post & e-mail result everyone'
      }
    ],
    links: [
      {
        id: "507f81413d070321728fde21",
        name: 'Like count >= 300',
        desc: 'Continue to post requirement if like count >= 300',
        from: "507f81413d070321728fde10",
        to: "507f81413d070321728fde12"
      }, {
        id: "507f81413d070321728fde21",
        name: 'Like count &lt; 300',
        desc: 'Cancel if like count &lt; 300',
        from: "507f81413d070321728fde10",
        to: "507f81413d070321728fde11"
      }, {
        id: "507f81413d070321728fde22",
        from: "507f81413d070321728fde12",
        to: "507f81413d070321728fde13"
      }, {
        id: "507f81413d070321728fde22",
        name: 'Pass rate &lt;= 50%',
        desc: 'Notification if pass rate &lt;= 50%',
        from: "507f81413d070321728fde13",
        to: "507f81413d070321728fde14"
      }, {
        id: "507f81413d070321728fde23",
        name: 'Pass rate &gt; 50%',
        desc: 'Post & e-mail to everyone if pass rate &gt; 50%',
        from: "507f81413d070321728fde13",
        to: "507f81413d070321728fde15"
      }
    ]
  };

  createLink = function(sourceId, targetId) {
    var fromNode, link, toNode, uuid;
    uuid = sourceId + '-' + targetId;
    console.log('create link', uuid);
    fromNode = data.nodes.index[sourceId];
    toNode = data.nodes.index[targetId];
    link = {
      uuid: uuid,
      fromNode: fromNode,
      toNode: toNode
    };
    data.links.push(link);
    fromNode.toLinks.push(link);
    toNode.fromLinks.push(link);
    data.links.index[uuid] = link;
    return link;
  };

  deleteLink = function(link) {
    console.log('delete link', link.uuid);
    delete data.links.index[link.id];
    delete data.links.index[link.uuid];
    removeFromArray(data.links, link);
    removeFromArray(link.fromNode.toLinks, link);
    removeFromArray(link.toNode.fromLinks, link);
  };

  removeFromArray = function(array, item) {
    var idx;
    idx = array.indexOf(item);
    if (idx !== -1) {
      return array.splice(idx, 1);
    }
  };

  (procData = function() {
    var endNodes, grid, linkIndex, lonelyNodes, nodeIndex, startNodes, traval;
    nodeIndex = data.nodes.index = {};
    linkIndex = data.links.index = {};
    startNodes = data.nodes.starts = [];
    endNodes = data.nodes.ends = [];
    lonelyNodes = data.nodes.alones = [];
    data.nodes.forEach(function(node) {
      var uuid;
      uuid = node.uuid = node.name.toLowerCase().replace(/\W/g, '_');
      nodeIndex[uuid] = nodeIndex[node.id] = node;
      node.toLinks = [];
      node.fromLinks = [];
    });
    data.links.forEach(function(link) {
      link.fromNode = nodeIndex[link.from];
      link.fromNode.toLinks.push(link);
      link.toNode = nodeIndex[link.to];
      link.toNode.fromLinks.push(link);
      link.uuid = link.fromNode.uuid + '-' + link.toNode.uuid;
      linkIndex[link.id] = linkIndex[link.uuid] = link;
    });
    data.nodes.forEach(function(node) {
      var _ref;
      if ((node.fromLinks.length === (_ref = node.toLinks.length) && _ref === 0)) {
        lonelyNodes.push(node);
      } else if (node.fromLinks.length === 0) {
        startNodes.push(node);
      } else if (node.toLinks.length === 0) {
        endNodes.push(node);
      }
    });
    grid = window.grid = [startNodes.concat(lonelyNodes)];
    grid.spanX = 350;
    grid.spanY = 150;
    grid.vertical = false;
    (traval = function(level) {
      var nextLevel, _ref;
      nextLevel = [];
      if ((_ref = grid[level]) != null) {
        _ref.forEach(function(node, i) {
          var _ref1;
          node.gridX = i;
          node.gridY = level;
          if (grid.vertical) {
            node.x = i * grid.spanX;
            node.y = level * grid.spanY;
          } else {
            node.x = level * grid.spanX;
            node.y = i * grid.spanY;
          }
          if ((_ref1 = node.toLinks) != null) {
            _ref1.forEach(function(link) {
              return nextLevel.push(link.toNode);
            });
          }
        });
      }
      if (nextLevel.length) {
        grid[level + 1] = nextLevel;
        traval(level + 1);
      }
    })(0);
  })();

  jsPlumb.ready(function() {});

  WorkflowView = (function(_super) {

    __extends(WorkflowView, _super);

    function WorkflowView() {
      WorkflowView.__super__.constructor.apply(this, arguments);
    }

    WorkflowView.prototype.tagName = 'div';

    WorkflowView.prototype.className = 'workflow';

    WorkflowView.prototype.jsPlumbDefaults = {
      Endpoint: [
        'Dot', {
          radius: 3
        }
      ],
      ConnectionsDetachable: true,
      ReattachConnections: true,
      HoverPaintStyle: {
        strokeStyle: '#42a62c',
        lineWidth: 2
      },
      ConnectionOverlays: [
        [
          'Arrow', {
            location: 1,
            id: 'arrow'
          }
        ], [
          'Label', {
            location: 0.5,
            label: 'new link',
            id: 'label',
            cssClass: 'aLabel'
          }
        ]
      ]
    };

    WorkflowView.prototype.initialize = function() {
      jsPlumb.importDefaults(this.jsPlumbDefaults);
    };

    WorkflowView.prototype.render = function() {
      this.el.onselectstart = function() {
        return false;
      };
      return this;
    };

    return WorkflowView;

  })(Backbone.View);

  NodeView = (function(_super) {

    __extends(NodeView, _super);

    function NodeView() {
      NodeView.__super__.constructor.apply(this, arguments);
    }

    NodeView.prototype.tagName = 'div';

    NodeView.prototype.className = 'node';

    NodeView.prototype.sourceEndpointStyle = {
      isSource: true,
      uniqueEndpoint: true,
      anchor: 'RightMiddle',
      paintStyle: {
        fillStyle: '#225588',
        radius: 7
      },
      connector: [
        'Flowchart', {
          stub: [40, 60],
          gap: 10
        }
      ],
      connectorStyle: {
        strokeStyle: '#346789',
        lineWidth: 2
      },
      maxConnections: -1
    };

    NodeView.prototype.targetEndpointStyle = {
      dropOptions: {
        hoverClass: 'hover'
      },
      anchor: ['LeftMiddle', 'BottomCenter']
    };

    NodeView.prototype.render = function() {
      this.el.innerHTML = this.model.escape('name');
      return this;
    };

    return NodeView;

  })(Backbone.View);

  LinkView = (function(_super) {

    __extends(LinkView, _super);

    function LinkView() {
      LinkView.__super__.constructor.apply(this, arguments);
    }

    return LinkView;

  })(Backbone.View);

  Entity = (function(_super) {

    __extends(Entity, _super);

    function Entity() {
      Entity.__super__.constructor.apply(this, arguments);
    }

    Entity.prototype.idAttribute = '_id';

    Entity.prototype.set = function(attrs) {
      if (attrs.name) {
        this._name = attrs.name.tolowerCase().replace(/\W+/g, '_');
      }
      return Entity.__super__.set.call(this, attrs);
    };

    Entity.prototype.validate = function(attrs) {
      if (!(attrs.name && attrs.id)) {
        return 'id and name are required';
      } else if (attrs.name.length > 10) {
        return 'name max len is 10';
      } else {

      }
    };

    return Entity;

  })(Backbone.Model);

  Tenant = (function(_super) {

    __extends(Tenant, _super);

    function Tenant() {
      Tenant.__super__.constructor.apply(this, arguments);
    }

    Tenant.prototype.idAttribute = '_name';

    return Tenant;

  })(Entity);

  SharedWorkflows = (function(_super) {

    __extends(SharedWorkflows, _super);

    function SharedWorkflows() {
      SharedWorkflows.__super__.constructor.apply(this, arguments);
    }

    SharedWorkflows.prototype.model = SharedWorkflow;

    SharedWorkflows.prototype.url = '/shared/workflows';

    return SharedWorkflows;

  })(Backbone.Collection);

  TenantWorkflows = (function(_super) {

    __extends(TenantWorkflows, _super);

    function TenantWorkflows() {
      TenantWorkflows.__super__.constructor.apply(this, arguments);
    }

    TenantWorkflows.prototype.model = TenantWorkflow;

    TenantWorkflows.prototype.url = function() {
      return this.tenant.url() + '/workflows';
    };

    return TenantWorkflows;

  })(Backbone.Collection);

  Workflow = (function(_super) {

    __extends(Workflow, _super);

    function Workflow() {
      Workflow.__super__.constructor.apply(this, arguments);
    }

    return Workflow;

  })(Entity);

  SharedWorkflow = (function(_super) {

    __extends(SharedWorkflow, _super);

    function SharedWorkflow() {
      SharedWorkflow.__super__.constructor.apply(this, arguments);
    }

    return SharedWorkflow;

  })(Workflow);

  TenantWorkflow = (function(_super) {

    __extends(TenantWorkflow, _super);

    function TenantWorkflow() {
      TenantWorkflow.__super__.constructor.apply(this, arguments);
    }

    return TenantWorkflow;

  })(Workflow);

  SharedNodes = (function(_super) {

    __extends(SharedNodes, _super);

    function SharedNodes() {
      SharedNodes.__super__.constructor.apply(this, arguments);
    }

    SharedNodes.prototype.model = SharedNode;

    SharedNodes.prototype.url = '/shared/nodes';

    return SharedNodes;

  })(Backbone.Collection);

  TenantNodes = (function(_super) {

    __extends(TenantNodes, _super);

    function TenantNodes() {
      TenantNodes.__super__.constructor.apply(this, arguments);
    }

    TenantNodes.prototype.model = TenantNode;

    TenantNodes.prototype.url = function() {
      return this.workflow.url() + '/nodes';
    };

    return TenantNodes;

  })(Backbone.Collection);

  Node = (function(_super) {

    __extends(Node, _super);

    function Node() {
      Node.__super__.constructor.apply(this, arguments);
    }

    return Node;

  })(Entity);

  SharedNode = (function(_super) {

    __extends(SharedNode, _super);

    function SharedNode() {
      SharedNode.__super__.constructor.apply(this, arguments);
    }

    return SharedNode;

  })(Node);

  TenantNode = (function(_super) {

    __extends(TenantNode, _super);

    function TenantNode() {
      TenantNode.__super__.constructor.apply(this, arguments);
    }

    return TenantNode;

  })(Node);

  SharedLinks = (function(_super) {

    __extends(SharedLinks, _super);

    function SharedLinks() {
      SharedLinks.__super__.constructor.apply(this, arguments);
    }

    SharedLinks.prototype.model = SharedLink;

    SharedLinks.prototype.url = '/shared/links';

    return SharedLinks;

  })(Backbone.Collection);

  TenantLinks = (function(_super) {

    __extends(TenantLinks, _super);

    function TenantLinks() {
      TenantLinks.__super__.constructor.apply(this, arguments);
    }

    TenantLinks.prototype.model = TenantLink;

    TenantLinks.prototype.url = function() {
      return this.workflow.url() + '/links';
    };

    return TenantLinks;

  })(Backbone.Collection);

  Link = (function(_super) {

    __extends(Link, _super);

    function Link() {
      Link.__super__.constructor.apply(this, arguments);
    }

    return Link;

  })(Entity);

  SharedLink = (function(_super) {

    __extends(SharedLink, _super);

    function SharedLink() {
      SharedLink.__super__.constructor.apply(this, arguments);
    }

    return SharedLink;

  })(Link);

  TenantLink = (function(_super) {

    __extends(TenantLink, _super);

    function TenantLink() {
      TenantLink.__super__.constructor.apply(this, arguments);
    }

    return TenantLink;

  })(Link);

  SharedLinks = (function(_super) {

    __extends(SharedLinks, _super);

    function SharedLinks() {
      SharedLinks.__super__.constructor.apply(this, arguments);
    }

    SharedLinks.prototype.model = Action;

    SharedLinks.prototype.url = '/shared/actions';

    return SharedLinks;

  })(Backbone.Collection);

  TenantLinks = (function(_super) {

    __extends(TenantLinks, _super);

    function TenantLinks() {
      TenantLinks.__super__.constructor.apply(this, arguments);
    }

    TenantLinks.prototype.model = Action;

    TenantLinks.prototype.url = function() {
      return this.node.url() + '/actions';
    };

    return TenantLinks;

  })(Backbone.Collection);

  Action = (function(_super) {

    __extends(Action, _super);

    function Action() {
      Action.__super__.constructor.apply(this, arguments);
    }

    return Action;

  })(Entity);

  jsPlumb.ready(function() {
    var app, tenant, _ref;
    if (!sessionStorage.tenant) {
      alert('login required');
      return;
    }
    tenant = new Tenant(JSON.parse(sessionStorage.tenant));
    console.log(tenant);
    app = (_ref = window.app) != null ? _ref : window.app = {};
    app.workflow = new WorkflowView({
      el: '#workflow_editor'
    });
  });

}).call(this);
