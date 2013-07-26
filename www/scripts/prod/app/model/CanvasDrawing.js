(function() {
  'use strict';
  define(function() {
    var CanvasDrawing;
    return CanvasDrawing = (function() {
      function CanvasDrawing(options) {
        this.canvasContainer = options.canvasContainer;
        this.canvasElement = options.canvasElement;
        this.canvasLeftPos = options.canvasLeftPos;
        this.canvasTopPos = options.canvasTopPos;
        this.canvasHeight = options.canvasHeight;
        this.canvasWidth = options.canvasWidth;
        this.canvasCtx = options.canvasCtx;
        this.canvasObjects = [];
        this.activeObjectID = -1;
        this.setCanvas();
      }

      CanvasDrawing.prototype.setCanvas = function() {
        this.canvasElement.height = this.canvasHeight;
        return this.canvasElement.width = this.canvasWidth;
      };

      CanvasDrawing.prototype.resizeCanvas = function() {
        return this.setCanvas();
      };

      CanvasDrawing.prototype.redrawCanvas = function() {
        var canvasObject, _i, _len, _ref, _results;
        _ref = this.canvasObjects;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          canvasObject = _ref[_i];
          _results.push(canvasObject.draw());
        }
        return _results;
      };

      CanvasDrawing.prototype.resetCanvas = function() {
        this.canvasCtx.fillStyle = 'rgba(255, 255, 255, 1)';
        return this.canvasCtx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
      };

      CanvasDrawing.prototype.checkCollision = function(x, y) {
        var canvasObject, id, _i, _len, _ref;
        _ref = this.canvasObjects;
        for (id = _i = 0, _len = _ref.length; _i < _len; id = ++_i) {
          canvasObject = _ref[id];
          if (canvasObject.isCollide(x, y)) {
            this.setActiveObjectID(id);
            return;
          } else {
            this.resetActiveObjectID;
          }
        }
      };

      CanvasDrawing.prototype.addObject = function(canvasObject) {
        return this.canvasObjects.push(canvasObject);
      };

      CanvasDrawing.prototype.getObject = function(id) {
        return this.canvasObjects[id];
      };

      CanvasDrawing.prototype.moveObject = function(id, x, y) {
        return this.canvasObjects[id].move(x, y);
      };

      CanvasDrawing.prototype.setActiveObjectID = function(id) {
        return this.activeObjectID = id;
      };

      CanvasDrawing.prototype.resetActiveObjectID = function() {
        return this.activeObjectID = -1;
      };

      CanvasDrawing.prototype.getActiveObjectID = function() {
        return this.activeObjectID;
      };

      return CanvasDrawing;

    })();
  });

}).call(this);

/*
//# sourceMappingURL=CanvasDrawing.js.map
*/