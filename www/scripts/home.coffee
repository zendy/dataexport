'use strict'

require [ 'common' ], ( common ) ->

  lastTime = 0
  vendors = ['ms', 'moz', 'webkit', 'o']
  for x in [0..vendors.length-1]
    if !window.requestAnimationFrame
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame']
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame']

  if !window.requestAnimationFrame
    window.requestAnimationFrame = ( callback, element ) ->
      currTime = new Date().getTime()
      timeToCall = Math.max 0, 16 - (currTime - lastTime)
      id = window.setTimeout(
        () -> callback(currTime + timeToCall)
        timeToCall
        )
      lastTime = currTime + timeToCall
      id

  if !window.cancelAnimationFrame
      window.cancelAnimationFrame = ( id ) ->
          clearTimeout(id)

  require [ 'app/application_main' ]
