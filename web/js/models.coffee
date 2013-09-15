"use strict"

define 'models', ['lib/common'], ->
  # ROOT = 'https://marxo.cloudfoundry.com/api'
  ROOT = '/api'

  ## Common

  Entity = Backbone.Model
  #class Entity extends Backbone.Model
  #  set: (attrs, options) ->
  #    @_name = attrs.name.tolowerCase().replace /\W+/g, '_' if attrs.name
  #    super attrs, options
  #  validate: (attrs) ->
  #    unless attrs.name and attrs.id
  #      'id and name are required'
  #    else unless /\w{,10}/.test attrs.name
  #      'name max len is 10 and must be consist of alphabetic char or _'
  #    else
  #      return

  # just a alias, otherwise PageableCollection will not extends Collection
  Collection = Backbone.Collection

  class ManagerCollection extends Backbone.PageableCollection
    mode: 'client'
    defaultState:
      pageSize: 15
      sortKey: 'updated_at'
      order: -1
    constructor: (options...) ->
      @state ?= {}
      for key, value of @defaultState
        @state[key] = value
      super options...

  ## Tenant / User

  class Tenant extends Entity
    urlRoot: '/tenants'

  class User extends Entity
    urlRoot: '/users'
    idAttribute: 'email'
    fullname: ->
      if @has('first_name') and @has('last_name')
        "#{@get 'first_name'} #{@get 'last_name'}"
      else
        @get('first_name') or @get('last_name') or null

# TODO: service: by default, publisher can get the list of members
# and cannot get list of participant, but can get participant by id

#  class Participant extends User

  class Publisher extends User

#  class Evalutator extends User

#  class Participants extends Collection
#    model: Participant
#    url: '/users'

  class Publishers extends ManagerCollection
    model: Publisher
    url: Publisher::urlRoot

  ## Workflow

  class Workflow extends Entity
    urlRoot: ROOT + '/workflows'
    initialize: (model, options) ->
      super model, options
      @_warp model
      @
    _warp: (model = @) ->
      model = model.attributes if model instanceof @constructor
      url = @url?() or @url or ''
      _nodes_loaded = Array.isArray model.nodes
      nodes = if _nodes_loaded then model.nodes else []
      @nodes = new Nodes nodes, url: url + '/nodes'
      @nodes._loaded = _nodes_loaded
      _createNodeRef = @_createNodeRef.bind @
      @nodes.forEach _createNodeRef
      @listenTo @nodes, add: _createNodeRef, remove: @_removeNodeRef.bind @

      _links_loaded = Array.isArray model.links
      links = if _links_loaded then model.links else []
      @links = new Links links, url: url + '/links'
      @links._loaded = _links_loaded
      _createLinkRef = @_createLinkRef.bind @
      @links.forEach _createLinkRef
      @listenTo @links, add: _createLinkRef, remove: @_removeLinkRef.bind @

      @set {}
      @
    fetch: (options = {}) -> # override for warp
      _success = options.success?.bind @
      options.success = (collection, response, options) =>
        @_warp collection
        _success? collection, response, options
        return
      super options
      @
    save: (attributes = {}, options) -> # override for sync ids
      node_ids = @nodes?.map (r) -> r.id
      link_ids = @links?.map (r) -> r.id
      attributes.node_ids = node_ids if node_ids?.join(',') isnt @get('node_ids')?.join(',')
      attributes.link_ids = link_ids if link_ids?.join(',') isnt @get('link_ids')?.join(',')
      # for test only
      if @nodes? then attributes.nodes = @nodes?.map (r) -> r.attributes
      if @links? then attributes.links = @links?.map (r) -> r.attributes
      console.log 'save workflow', attributes, @
      super attributes, options
      @
    loaded: ->
      @nodes?._loaded and @links?._loaded
    createNode: (data) ->
      @nodes.create data, wait: true
      @
    _createNodeRef: (node) ->
      throw 'it must be a Node object' unless node instanceof Node
      node.workflow = @
      node.inLinks = []
      node.outLinks = []
      return
    _removeNodeRef: (node) ->
      # remove all connected links
      node.inLinks.concat(node.outLinks).forEach (link) -> link.destroy()
      return
    createLink: (data) ->
      @links.create data, wait: true
      @
    _createLinkRef: (link) ->
      throw 'it must be a Link object' unless link instanceof Link
      unless link.has('prev_node_id') and link.has('next_node_id')
        throw 'link ' + (link.name or link.id) + 'is broken, prev/next node missing'
      link.workflow = @
      link.prevNode = @nodes.get link.get 'prev_node_id'
      link.nextNode = @nodes.get link.get 'next_node_id'
      link.prevNode.outLinks.push link
      link.nextNode.inLinks.push link
      return
    _removeLinkRef: (link) ->
      outLinks = link.prevNode.outLinks
      idx = outLinks.indexOf link
      outLinks.splice idx, 1
      inLinks = link.nextNode.inLinks
      idx = inLinks.indexOf link
      inLinks.splice idx, 1
      return
    hasLink: (from, to) ->
      from = @nodes.get from if typeof from is 'string'
      to = @nodes.get to if typeof to is 'string'
      for link in from.outLinks
        return true if link.nextNode is to
      false

  class Workflows extends ManagerCollection
    @workflows: new Workflows
    model: Workflow
    url: Workflow::urlRoot
  # url: -> @tenant.url() + '/workflows'

  class Node extends Entity

  class Nodes extends Collection
    model: Node
    url: ROOT + '/nodes'
  # url: -> @workflow.url() + '/nodes'

  class Link extends Entity

  class Links extends Collection
    model: Link
    url: ROOT + '/links'
  # url: -> @workflow.url() + '/links'

  class Action extends Entity

  class Actions extends Collection
    model: Action
  # url: -> @node.url() + '/actions'

  ## Project

  class Project extends Entity
    urlRoot: ROOT + '/projects'

  class Projects extends ManagerCollection
    @projects: new Projects
    model: Project
    url: Project::urlRoot

  ## Home

  class Notification extends Entity

  class Notifications extends ManagerCollection
    model: Notification
    url: ROOT + '/notifications'

  ## Events

  class Event extends Entity
    urlRoot: ROOT + '/events'

  class Events extends ManagerCollection
    model: Event
    url: Event::urlRoot

  ## Content

  class Content extends Entity
    urlRoot: ROOT + '/contents'

  class Contents extends ManagerCollection
    model: Content
    url: Content::urlRoot

  ## Report

  class Report extends Entity

  class Reports extends ManagerCollection
    model: Report
    url: ROOT + '/reports'

  ## Service

  class Service extends Entity
    idAttribute: 'service'
    urlRoot: ROOT + '/services'
    connected: ->
      'connected' is @get 'status'

  { # exports
  Entity
  Collection
  ManagerCollection
  Tenant
  User
  Publishers
  Publisher
#  Participants
#  Participant
#  Evalutator
  Workflows
  Workflow
  Nodes
  Node
  Links
  Link
  Actions
  Action
  Projects
  Project
  Notifications
  Notification
  Event
  Events
  Content
  Contents
  Report
  Reports
  Service
  }
