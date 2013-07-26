(function() {
  'use strict';
  define([], function() {
    var dropArea, handleDragOver, handleFileSelect, headerColumn, processColumns, processLines, timedChunk;
    headerColumn = [];
    handleFileSelect = function(ev) {
      var file, files, reader, _i, _len, _results;
      ev.stopPropagation();
      ev.preventDefault();
      files = ev.dataTransfer.files;
      _results = [];
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        reader = new FileReader();
        reader.onload = (function(file) {
          return function(e) {
            var lines;
            lines = e.target.result.split(/\r|\r?\n/g);
            return processLines(lines);
          };
        })(file);
        _results.push(reader.readAsText(file));
      }
      return _results;
    };
    handleDragOver = function(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      return ev.dataTransfer.dropEffect = 'copy';
    };
    processLines = function(lines) {
      var header, headerName, i, _i, _len;
      header = lines.shift().split(',');
      for (i = _i = 0, _len = header.length; _i < _len; i = ++_i) {
        headerName = header[i];
        headerColumn.push(headerName);
      }
      return timedChunk(lines);
    };
    processColumns = function(columns, id) {
      var codeBlock, output;
      codeBlock = document.createElement('code');
      codeBlock.classList.add('language-markup');
      output = columns;
      codeBlock.insertAdjacentHTML('beforeend', output);
      return codeBlock;
    };
    timedChunk = function(lines) {
      var br, id, linesCopy, maxLines, meterBar, preBlock, progressBar;
      preBlock = document.createDocumentFragment();
      br = document.createElement('br');
      meterBar = document.getElementById('js-progressbar__meter');
      progressBar = meterBar.parentNode;
      meterBar.classList.remove('progressbar__meter--completed');
      progressBar.classList.add('progressbar--animate');
      linesCopy = lines.concat();
      maxLines = linesCopy.length;
      id = 1;
      return setTimeout(function() {
        var columns, start;
        start = +new Date();
        while (linesCopy.length > 0 && (+new Date() - start < 50)) {
          columns = linesCopy.shift().split(',');
          id++;
          preBlock.appendChild(processColumns.call(null, columns, id));
          preBlock.appendChild(br);
        }
        document.getElementById('output').children[0].appendChild(preBlock);
        if (linesCopy.length > 0) {
          meterBar.style.width = ((maxLines - linesCopy.length) / maxLines * 100) + '%';
          return setTimeout(arguments.callee, 25);
        } else {
          meterBar.style.width = '100%';
          meterBar.classList.add('progressbar__meter--completed');
          return progressBar.classList.remove('progressbar--animate');
        }
      }, 25);
    };
    dropArea = document.querySelector('.droparea');
    dropArea.addEventListener('dragover', handleDragOver, false);
    return dropArea.addEventListener('drop', handleFileSelect, false);
  });

}).call(this);

/*
//@ sourceMappingURL=application_main.js.map
*/