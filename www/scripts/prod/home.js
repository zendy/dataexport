(function() {
  'use strict';
  require(['common'], function(common) {
    var lastTime, vendors, x, _i, _ref;
    lastTime = 0;
    vendors = ['ms', 'moz', 'webkit', 'o'];
    for (x = _i = 0, _ref = vendors.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; x = 0 <= _ref ? ++_i : --_i) {
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
      }
    }
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function(callback, element) {
        var currTime, id, timeToCall;
        currTime = new Date().getTime();
        timeToCall = Math.max(0, 16 - (currTime - lastTime));
        id = window.setTimeout(function() {
          return callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }
    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(id) {
        return clearTimeout(id);
      };
    }
    return require(['app/application_main']);
  });

}).call(this);

/*
//@ sourceMappingURL=home.js.map
*/