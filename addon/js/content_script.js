var getSelected, nextWord, previousWord, readSentance, resetSelection, speak, speaking;

console.log("Proofer initialized.");

speaking = false;

resetSelection = function(data, savedRange) {
  if (data.type === 'input') {
    data.element.selectionStart = savedRange.start;
    return data.element.selectionEnd = savedRange.end;
  } else {
    data.selection.removeAllRanges();
    return data.selection.addRange(savedRange);
  }
};

speak = function(utterance) {
  var data, port, previousOffset, savedRange, wordCount;
  data = getSelected();
  if (data.type === 'input') {
    savedRange = {
      start: data.element.selectionStart,
      end: data.element.selectionEnd
    };
  } else {
    savedRange = data.range.cloneRange();
  }
  wordCount = 0;
  previousOffset = 0;
  port = chrome.runtime.connect();
  port.postMessage({
    utterance: utterance
  });
  speaking = true;
  return port.onMessage.addListener(function(response) {
    var currentWord, currentWordLength, remainingUtterance, _, _i, _j, _k, _ref, _ref1, _results;
    console.log(response);
    if (response.type === "start") {
      currentWord = utterance.split("").slice(previousOffset).join("").split(" ").slice(0, 1).join(" ");
      currentWordLength = currentWord.split("").length;
      data.selection.collapseToStart();
      _results = [];
      for (_ = _i = 0; 0 <= currentWordLength ? _i <= currentWordLength : _i >= currentWordLength; _ = 0 <= currentWordLength ? ++_i : --_i) {
        _results.push(data.selection.modify("extend", "forward", "character"));
      }
      return _results;
    } else if (response.type === "word") {
      resetSelection(data, savedRange);
      remainingUtterance = utterance.split("").slice(previousOffset).join("");
      if (wordCount >= 1) {
        currentWord = remainingUtterance.split(" ").slice(1, 2).join(" ");
        currentWordLength = currentWord.split("").length;
        data.selection.collapseToStart();
        for (_ = _j = 1, _ref = response.charIndex; 1 <= _ref ? _j <= _ref : _j >= _ref; _ = 1 <= _ref ? ++_j : --_j) {
          data.selection.modify("move", "forward", "character");
        }
        for (_ = _k = 0, _ref1 = currentWordLength - 1; 0 <= _ref1 ? _k <= _ref1 : _k >= _ref1; _ = 0 <= _ref1 ? ++_k : --_k) {
          data.selection.modify("extend", "forward", "character");
        }
      }
      wordCount += 1;
      return previousOffset = response.charIndex;
    } else if (response.type === "end") {
      resetSelection(data, savedRange);
      return speaking = false;
    }
  });
};

getSelected = function() {
  var active, data, selection, _ref;
  active = document.activeElement;
  selection = window.getSelection();
  data = {
    selection: selection,
    range: selection.getRangeAt(0)
  };
  if ((_ref = active.tagName.toLocaleLowerCase()) === 'textarea' || _ref === 'input') {
    data.type = 'input';
    data.element = active;
  } else {
    data.type = 'body';
  }
  return data;
};

readSentance = function() {
  var data, utterance;
  data = getSelected();
  if (data.selection.type === 'None') {
    console.log('Nothing selected!');
    return;
  }
  if (data.selection.type === 'Caret') {
    data.selection.modify('move', 'forward', 'sentence');
    data.selection.modify('extend', 'backward', 'sentence');
  }
  console.log(data);
  utterance = data.selection.toString();
  return speak(utterance);
};

nextWord = function() {
  return console.log("nextWord");
};

previousWord = function() {
  return console.log("previousWord");
};

document.addEventListener("keydown", function(event) {
  if (window.event.ctrlKey && event.keyCode === 84) {
    console.log('readSentance');
    readSentance();
  }
  if (window.event.ctrlKey && event.keyCode === 78) {
    console.log('nextWord');
    nextWord();
  }
  if (window.event.ctrlKey && event.keyCode === 72) {
    console.log('previousWord');
    return previousWord();
  }
});
