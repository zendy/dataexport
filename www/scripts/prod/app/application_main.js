(function() {
  'use strict';
  define([], function() {
    var btnExport, dataLines, dropArea, formatExportData, handleDragOver, handleFileSelect, headerColumn, printHeaders, processColumns, processLines, timedChunk;
    headerColumn = [];
    dataLines = null;
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
      printHeaders();
      return dataLines = lines;
    };
    printHeaders = function() {
      var elCSVHeaders, elTdCode, elTdName, elTr, frag, headerName, i, _i, _len;
      elCSVHeaders = document.querySelector('.js-csvHeaders');
      frag = document.createDocumentFragment();
      for (i = _i = 0, _len = headerColumn.length; _i < _len; i = ++_i) {
        headerName = headerColumn[i];
        elTr = document.createElement('tr');
        elTdName = document.createElement('td');
        elTdCode = document.createElement('td');
        elTdName.appendChild(document.createTextNode(headerName));
        elTdCode.appendChild(document.createTextNode(i));
        elTr.appendChild(elTdName);
        elTr.appendChild(elTdCode);
        frag.appendChild(elTr);
      }
      return elCSVHeaders.appendChild(frag);
    };
    processColumns = function(columns, id) {
      var codeBlock, output;
      codeBlock = document.createElement('code');
      codeBlock.classList.add('language-markup');
      output = formatExportData(columns);
      codeBlock.insertAdjacentHTML('beforeend', output);
      return codeBlock;
    };
    formatExportData = function(columns) {
      var elOutputToBe, formatText, textToBeReplaced, val, _i, _len;
      elOutputToBe = document.querySelector('.js-outputToBe');
      formatText = elOutputToBe.value;
      textToBeReplaced = formatText.match(/\[.*\]/g);
      console.log("AAA", textToBeReplaced);
      for (_i = 0, _len = textToBeReplaced.length; _i < _len; _i++) {
        val = textToBeReplaced[_i];
        formatText = formatText.replace(val, columns[val.replace(/[^0-9\.]+/g, '')].trim());
      }
      return formatText;
    };
    timedChunk = function() {
      var br, id, lines, linesCopy, maxLines, meterBar, preBlock, progressBar;
      lines = dataLines;
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
    dropArea.addEventListener('drop', handleFileSelect, false);
    btnExport = document.querySelector('.js-startExport');
    return btnExport.addEventListener('click', timedChunk, false);
  });

}).call(this);

/*
//@ sourceMappingURL=application_main.js.map
*/