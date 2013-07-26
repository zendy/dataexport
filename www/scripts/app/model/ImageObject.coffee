'use strict'

define [ './Object' ], ( Object ) ->
  class ImageObject extends Object
    constructor: ( options ) ->
      super options
      @img = null

      # load image
      @loadImage()

    draw: () ->
      @ctx.drawImage @img, @x, @y, @width, @height

    loadImage: () ->
      @img = new Image()
      @img.src = 'images/icon_branding.png'

      that = @
      do ( that ) ->
        that.img.onload = () ->
          that.draw()
