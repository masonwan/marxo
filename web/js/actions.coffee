"use strict"

define 'actions', ['base', 'models', 'lib/jquery-ui'],
({find, findAll, tplAll, BoxView}, {Action, Actions}) ->

  class ActionsMixin
    initActions: (options) ->
      @actionsEl = options?.actionEl or find '.node-actions', @el
      @projectMode = Boolean options?.projectMode
      $(@actionsEl).sortable
        axis: 'y'
        delay: 150
        distance: 15
        cancel: '.box-content'
      @
    fillActions: (actions) ->
      if actions
        # @clearActions()
        actions = new Actions actions if Array.isArray actions
        throw new Error 'fill action only accept Actions or array' unless actions instanceof Actions
        console.log 'fill actions', actions
        @actions = actions
        @actions.forEach @addAction.bind @
      @
    readActions: ->
      findAll('.action', @actionsEl).map (el) ->
        view = $(el).data 'view'
        # TODO: validate each action
        throw new Error 'cannot get action from action.$el' unless view
        view.read()
    clearActions: ->
      @actions?.forEach (model) -> model.view?.remove()
      @actions = null
      $(findAll('.action', @actionsEl)).remove()
      @
    viewAction: (id) ->
      console.log 'view action id:', id
      el = @actionsEl.querySelector '#action_' + id
      if el?
        hidden = @el.getAttribute 'aria-hidden'
        if hidden is 'true'
          @$el.one 'shown', -> el.scrollIntoViewIfNeeded()
        else if hidden is 'false'
          el.scrollIntoViewIfNeeded()
        else
          setTimeout ->
            el.scrollIntoViewIfNeeded()
          , 600
      el
    addAction: (model, options) ->
      try
        model = new Action model unless model instanceof Action
        actionView = new ActionView
          model: model
          parent: @, container: @actionsEl
          projectMode: @projectMode
          readOnly: @projectMode and model.get('status')?.toUpperCase() isnt 'IDLE'
        @listenTo actionView, 'remove', @removeAction.bind @
        actionView.render()
        actionView.el.scrollIntoViewIfNeeded() if options?.scrollIntoView
        @delayedTrigger 'actions_update', 100
        #@actions.add actionView
      catch e
        console.error 'faild to load action:', e, model
      @
    removeAction: (view) ->
      console.log 'remove action view', view
      view.remove?()
      @delayedTrigger 'actions_update', 100
      @

  class ActionView extends BoxView
    className: 'box action'
    _tpl: tplAll('#actions_tpl')
    initialize: (options) ->
      super options
      unless options.model
        throw new Error 'need action model'
        console.dir options
      @projectMode = options.projectMode or options.readOnly
      @readOnly = options.readOnly
      @containerEl = options.container
      @model = options.model
      @model.view = @
      type = @type = (@model.get?('type') or options.model.type or options.type or '').toLowerCase()
      unless @_tpl.hasOwnProperty type
        @type = 'unknown'
        console.warn 'unknown action type', options
      @
    remove: ->
      # remove only once
      @remove = -> @
      super
    render: ->
      _tpl = @_tpl[@type]
      unless _tpl
        console.error 'unable to find tpl for action type', @type
        @remove()
      else
        @el.innerHTML = _tpl
        @el.id = 'action_' + @model.id or 'no_id'
        @_name = @$el.find('.box-header h4').text()
        #@containerEl.appendChild @el
        @containerEl.insertBefore @el, find '.alert', @containerEl
        # get els in super
        super
        if /webkit/i.test navigator.userAgent
          $(@el).disableSelection()
        else
          $('.box-header, .btn', @el).disableSelection()
        @form = find 'form', @el
        $form = $ @form
        @form.key.readOnly = @projectMode
        $(@btn_close).remove() if @projectMode
        #console.warn @form, @readOnly
        $form.find(':input').prop 'readOnly', true if @readOnly
        @fill @model?.toJSON()
        @$el.data model: @model, view: @
        @listenTo @model, 'destroy', @remove.bind @
      @
    fill: (data) -> # filling the form with data
      return unless data and @form
      data.name = @_name unless data.name
      data.key = data.type unless data.key
      form = @form
      namespace = ''
      do _travel = (namespace, data) ->
        for name, value of data
          continue if '_' is name.charAt(0)
          name = namespace + name
          if $.isPlainObject value
            _travel name + '.', value
          else if form[name]?.name is name
            #console.log name, value
            el = form[name]
            if /^checkbox$/i.test el.type and typeof value is 'boolean'
              el.checked = value
            else
              $(el).val value
        return
      @
    read: -> # read form the form to get a json data
      throw new Error 'cannot find the form, may not rendered yet' unless @form
      data = @model.toJSON()
      data.type = @type.toUpperCase()
      for el in [].slice.call @form.elements
        if el.name and not el.disabled
          $el = $ el
          val = if /^checkbox$/i.test el.type then el.checked else $el.val()
          names = el.name.split '.'
          if names?.length
            _data = data
            name = names.pop()
            _data = _data[key] ?= {} for key in names
            _data[name] = val
      data

  ActionsMixin
