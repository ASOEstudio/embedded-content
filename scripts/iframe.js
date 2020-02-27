// addEventListener support for IE8
function bindEvent(element, eventName, eventHandler) {
    if (element.addEventListener) {
        element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, eventHandler);
    }
}

// detectando a origem do evento
function receiveMessage(event) {
    console.log(event);
    if (event.origin !== 'http://127.0.0.1:5500')
        return;
}

// Send a message to the parent
var sendMessage = function (msg) {
    // Make sure you are sending a string, and to stringify JSON
    // window.parent.postMessage(msg, '*');
    window.parent.postMessage(msg, receiveMessage);
};

var results = document.getElementById('results'),
    messageButton = document.getElementById('message_button');

// Listen to messages from parent window
bindEvent(window, 'message', function (e) {
    results.innerHTML = e.data;
});

// Send random message data on every button click
bindEvent(messageButton, 'click', function (e) {
    // console.log(e);
    var random = Math.random();
    sendMessage('' + random);
});