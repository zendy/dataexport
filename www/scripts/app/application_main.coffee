'use strict'

define [], () ->
  headerColumn = []

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

    timedChunk lines

  processColumns = ( columns, id ) ->
    codeBlock = document.createElement 'code'
    codeBlock.classList.add 'language-markup'
    output = columns
    codeBlock.insertAdjacentHTML 'beforeend', output
    codeBlock

  timedChunk = ( lines ) ->
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
