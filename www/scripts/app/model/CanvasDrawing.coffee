'use strict'

define () ->
  class CanvasDrawing
    constructor: ( options ) ->
      @canvasContainer = options.canvasContainer
      @canvasElement = options.canvasElement
      @canvasLeftPos = options.canvasLeftPos
      @canvasTopPos = options.canvasTopPos
      @canvasHeight = options.canvasHeight
      @canvasWidth = options.canvasWidth
      @canvasCtx = options.canvasCtx
      @canvasObjects = []
      @activeObjectID = -1

      @setCanvas()

    setCanvas: () ->
      @canvasElement.height = @canvasHeight
      @canvasElement.width = @canvasWidth

    resizeCanvas: () ->
      @setCanvas()

    redrawCanvas: () ->
      # go through every objects and then starts drawing
      for canvasObject in @canvasObjects
        canvasObject.draw()

    resetCanvas: () ->
      # reset canvas
      @canvasCtx.fillStyle = 'rgba(255, 255, 255, 1)'
      @canvasCtx.fillRect 0, 0, @canvasWidth, @canvasHeight

    checkCollision: ( x, y ) ->
      for canvasObject, id in @canvasObjects
        if canvasObject.isCollide x, y
          @setActiveObjectID id
          return
        else
          @resetActiveObjectID

    addObject: ( canvasObject ) ->
      @canvasObjects.push canvasObject

    getObject: ( id ) ->
      @canvasObjects[ id ]

    moveObject: ( id, x, y ) ->
      @canvasObjects[ id ].move x, y

    setActiveObjectID: ( id ) ->
      @activeObjectID = id

    resetActiveObjectID: () ->
      @activeObjectID = -1

    getActiveObjectID: () ->
      @activeObjectID
