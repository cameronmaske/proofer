chrome.runtime.onConnect.addListener(function(port) {
  return port.onMessage.addListener(function(request, port) {
    console.log(request, port);
    return chrome.tts.speak(request.utterance, {
      rate: 0.85,
      requiredEventTypes: ["start", "word", "sentence", "marker", "end", "interrupted", "cancelled"],
      onEvent: function(event) {
        return port.postMessage(event);
      }
    });
  });
});
