'use strict'

define [ './Object' ], ( Object ) ->
  class TextObject extends Object
    constructor: ( options ) ->
      super options
      @text = options.text

      @draw()

    draw: () ->
      @text = 'This is test!'

      @ctx.fillStyle = 'rgba(0, 0, 0, 1)'
      @ctx.font = 'italic 40pt Calibri'
      @ctx.textBaseline = 'top'
      @ctx.fillText @text, @x, @y

      # need to refactor
      @dim = @ctx.measureText @text
      @height = 40
      @width = @dim.width



