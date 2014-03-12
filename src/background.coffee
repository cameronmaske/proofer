chrome.runtime.onConnect.addListener (port) ->
  port.onMessage.addListener (request, port) ->
    console.log(request, port)
    chrome.tts.speak request.utterance,
      rate: 0.85
      requiredEventTypes: [
        "start"
        "word"
        "sentence"
        "marker"
        "end"
        "interrupted"
        "cancelled"
      ]
      onEvent: (event) ->
        port.postMessage(event)