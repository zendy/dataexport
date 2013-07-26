'use strict'

define () ->
  class Object
    constructor: ( options ) ->
      @x = if options.hasOwnProperty( 'x' ) then options.x else 0
      @y = if options.hasOwnProperty( 'y' ) then options.y else 0
      @width = if options.hasOwnProperty( 'width' ) then options.width else 0
      @height = if options.hasOwnProperty( 'height' ) then options.height else 0
      @ctx = options.ctx

    draw: () ->
      # implement drawing in child class

    move: ( x, y ) ->
      @x = x
      @y = y

    grab: ( bool ) ->
      @active = bool

    isActive: () ->
      @active

    isCollide: ( x, y ) ->
      # console.log x, y, @x, @x + @width, @y, @y + @height
      # console.log x >= @x, x <= ( @x + @width ), y >= @y, y <= ( @y + @height )
      if x >= @x and x <= ( @x + @width ) and y >= @y and y <= ( @y + @height ) then true
