'use strict'

define [], () ->
  headerColumn = []
  dataLines = null

  handleFileSelect = ( ev ) ->
    ev.stopPropagation()
    ev.preventDefault()

    files = ev.dataTransfer.files

    for file in files
      reader = new FileReader()

      # Closure to capture the file information.
      reader.onload = do ( file ) ->
        ( e ) ->
          # split file into multiple lines
          lines = e.target.result.split /\r|\r?\n/g

          processLines lines

      # Read as text
      reader.readAsText file

  handleDragOver = ( ev ) ->
    ev.stopPropagation()
    ev.preventDefault()
    ev.dataTransfer.dropEffect = 'copy'

  processLines = ( lines ) ->
    header = lines.shift().split ','

    # clean header name
    for headerName, i in header
      headerColumn.push headerName

    printHeaders()

    # timedChunk lines
    dataLines = lines

  printHeaders = () ->
    # print headers and it's code into a table
    elCSVHeaders = document.querySelector '.js-csvHeaders'
    frag = document.createDocumentFragment()

    for headerName, i in headerColumn
      elTr = document.createElement 'tr'
      elTdName = document.createElement 'td'
      elTdCode = document.createElement 'td'

      elTdName.appendChild( document.createTextNode headerName )
      elTdCode.appendChild( document.createTextNode i )

      elTr.appendChild elTdName
      elTr.appendChild elTdCode
      frag.appendChild elTr

    elCSVHeaders.appendChild frag

  processColumns = ( columns, id ) ->
    codeBlock = document.createElement 'code'
    codeBlock.classList.add 'language-markup'
    output = formatExportData columns
    codeBlock.insertAdjacentHTML 'beforeend', output
    codeBlock

  formatExportData = ( columns ) ->
    # format result text according to the textbox
    elOutputToBe = document.querySelector '.js-outputToBe'
    formatText = elOutputToBe.value
    textToBeReplaced = formatText.match(/\[\d{1,}\]/g)

    for val in textToBeReplaced
      formatText = formatText.replace val, columns[ val.replace /[^0-9\.]+/g , '' ].trim()

    formatText

  timedChunk = () ->
    # process dataLines in a batch
    lines = dataLines

    # create document fragment
    preBlock = document.createDocumentFragment()
    br = document.createElement 'br'

    # set up progressbar
    meterBar = document.getElementById 'js-progressbar__meter'
    progressBar = meterBar.parentNode

    meterBar.classList.remove 'progressbar__meter--completed'
    progressBar.classList.add 'progressbar--animate'

    linesCopy = lines.concat()
    maxLines = linesCopy.length
    id = 1

    setTimeout( () ->
      start = +new Date()

      while linesCopy.length > 0 and ( +new Date() - start < 50 )
        columns = linesCopy.shift().split ','
        id++

        preBlock.appendChild( processColumns.call null, columns, id )
        preBlock.appendChild br

      # show output
      document.getElementById( 'output' ).children[0].appendChild preBlock

      if linesCopy.length > 0
        meterBar.style.width = ( ( maxLines - linesCopy.length ) / maxLines * 100 ) + '%'
        setTimeout arguments.callee, 25
      else
        meterBar.style.width = '100%'
        meterBar.classList.add 'progressbar__meter--completed'
        progressBar.classList.remove 'progressbar--animate'

    , 25)


  # Event listener
  dropArea = document.querySelector '.droparea'
  dropArea.addEventListener 'dragover', handleDragOver, false
  dropArea.addEventListener 'drop', handleFileSelect, false

  btnExport = document.querySelector '.js-startExport'
  btnExport.addEventListener 'click', timedChunk, false

