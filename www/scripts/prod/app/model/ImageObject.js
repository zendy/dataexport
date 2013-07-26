(function() {
  'use strict';
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['./Object'], function(Object) {
    var ImageObject;
    return ImageObject = (function(_super) {
      __extends(ImageObject, _super);

      function ImageObject(options) {
        ImageObject.__super__.constructor.call(this, options);
        this.img = null;
        this.loadImage();
      }

      ImageObject.prototype.draw = function() {
        return this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      };

      ImageObject.prototype.loadImage = function() {
        var that;
        this.img = new Image();
        this.img.src = 'images/icon_branding.png';
        that = this;
        return (function(that) {
          return that.img.onload = function() {
            return that.draw();
          };
        })(that);
      };

      return ImageObject;

    })(Object);
  });

}).call(this);

/*
//@ sourceMappingURL=ImageObject.js.map
*/