(function() {
  'use strict';
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['./Object'], function(Object) {
    var TextObject;
    return TextObject = (function(_super) {
      __extends(TextObject, _super);

      function TextObject(options) {
        TextObject.__super__.constructor.call(this, options);
        this.text = options.text;
        this.draw();
      }

      TextObject.prototype.draw = function() {
        this.text = 'This is test!';
        this.ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        this.ctx.font = 'italic 40pt Calibri';
        this.ctx.textBaseline = 'top';
        this.ctx.fillText(this.text, this.x, this.y);
        this.dim = this.ctx.measureText(this.text);
        this.height = 40;
        return this.width = this.dim.width;
      };

      return TextObject;

    })(Object);
  });

}).call(this);

/*
//@ sourceMappingURL=TextObject.js.map
*/