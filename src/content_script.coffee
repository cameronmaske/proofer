console.log("Proofer initialized.")

speaking = false

resetSelection = (data, savedRange) ->
  if data.type == 'input'
    data.element.selectionStart = savedRange.start
    data.element.selectionEnd = savedRange.end
  else
    data.selection.removeAllRanges()
    data.selection.addRange(savedRange)

speak = (utterance) ->
  data = getSelected()
  if data.type == 'input'
    savedRange = {
      start: data.element.selectionStart
      end: data.element.selectionEnd
    }
  else
    savedRange = data.range.cloneRange()

  wordCount = 0
  previousOffset = 0

  port = chrome.runtime.connect()
  port.postMessage(utterance: utterance)
  speaking = true

  port.onMessage.addListener((response) ->
    console.log(response)
    if response.type == "start"
      # First word is about to be spoke, let's attempt to highlight!
      currentWord = utterance.split("").slice(previousOffset).join("").split(" ").slice(0, 1).join(" ")
      currentWordLength = currentWord.split("").length
      data.selection.collapseToStart()
      for _ in [0..currentWordLength]
        data.selection.modify("extend", "forward", "character")

    else if response.type == "word"
      resetSelection(data, savedRange)
      # Need to determine which word is going to be spoke next.
      remainingUtterance = utterance.split("").slice(previousOffset).join("")

      if wordCount >= 1
        currentWord = remainingUtterance.split(" ").slice(1, 2).join(" ")
        currentWordLength = currentWord.split("").length
        data.selection.collapseToStart()
        # 1 increment to take into account the space before.
        for _ in [1..response.charIndex]
          data.selection.modify("move", "forward", "character")
        for _ in [0..currentWordLength - 1]
          data.selection.modify("extend", "forward", "character")

      wordCount += 1
      previousOffset = response.charIndex

    else if response.type == "end"
      # Do stuff...
      resetSelection(data, savedRange)
      speaking = false
  )

getSelected = ->
  active = document.activeElement
  selection = window.getSelection()
  data = {
    selection: selection
    range: selection.getRangeAt(0)
  }

  if active.tagName.toLocaleLowerCase() in ['textarea', 'input']
    data.type = 'input'
    data.element = active
  else
    data.type = 'body'

  return data

readSentance = ->
  data = getSelected()

  # Nothing selected.
  if data.selection.type == 'None'
    console.log('Nothing selected!')
    return

  # Only a cursor present.
  if data.selection.type == 'Caret'
    data.selection.modify('move', 'forward', 'sentence')
    data.selection.modify('extend', 'backward', 'sentence')

  console.log(data)
  utterance = data.selection.toString()
  speak(utterance)

nextWord = ->
  console.log("nextWord")

previousWord = ->
  console.log("previousWord")

document.addEventListener "keydown", (event) ->
  # Read out the whole sentance (Alt + T)
  if window.event.ctrlKey and event.keyCode == 84
    console.log('readSentance')
    readSentance()

  # (Alt + N )
  if window.event.ctrlKey and event.keyCode == 78
    console.log('nextWord')
    nextWord()

  # (Alt + <- H)
  if window.event.ctrlKey and event.keyCode == 72
    console.log('previousWord')
    previousWord()