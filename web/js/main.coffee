"use strict"

require ['console'], ({ConsoleView, SignInView, Router}) ->
  # EP
  window.app = app =
    console: ConsoleView.get()
    signin: SignInView.get()
    router: Router.get()

  Backbone.history.start()

  document.body.style.opacity = 1
  document.title = document.title.replace /^.*?(?=MARXO)/i, ''
  return
