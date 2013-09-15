"use strict"

define 'project', ['base', 'manager', 'models'],
({
#find
#findAll
#View
FrameView
InnerFrameView
#ModalDialogView
}, {
ManagerView
}, {
Projects
}) ->
  class ProjectFrameView extends FrameView
    initialize: (options) ->
      super options
      @creator = new ProjectCreatorView el: '#project_creator', parent: @
      @viewer = new ProjectViewerView el: '#project_viewer', parent: @
      @manager = new ProjectManagemerView el: '#project_manager', parent: @
      @
    open: (name, sub) ->
      switch name
        when 'new'
          @switchTo @creator
        when 'mgr'
          @switchTo @manager
        else
          throw 'open project with a name or id is needed' unless name
          @switchTo @viewer
          @viewer.load name
          @viewer.popup sub if sub
      @

  class ProjectActionCell extends Backgrid.ActionsCell
    render: ->
      # TODO: show buttons depend on status
      super

  class ProjectManagemerView extends ManagerView
    columns: [
      'checkbox'
      'id'
      'title:project'
      'desc'
      'created_at'
      'updated_at'
      'status'
    ,
      name: 'project'
      label: ''
      editable: false
      sortable: false
      cell: ProjectActionCell
    ]
    collection: new Projects

  class ProjectCreatorView extends InnerFrameView
    #    initialize: (options) ->
    #      super options
  class ProjectViewerView extends InnerFrameView
    #    initialize: (options) ->
    #      super options
    load: (name) ->
      console.log 'load project', name
      @
    popup: ({link, node, action} = {}) ->
      throw 'cannot open a action without given a node' if action and not node
      throw 'node and link cannot be open together' if link and node
      console.log 'popup node/link viewer', {link, node, action}
      @

  ProjectFrameView
