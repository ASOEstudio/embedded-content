// dimensões do body
var bodySize = {
    height: document.body.clientHeight,
    width: document.body.clientWidth },
    hash = 's2h038f234fh9jei';

// eventListener para o redimensionameto da tela
window.addEventListener('resize', () => {
    bodySize.width = document.body.clientWidth;
    iframeEl.style.width = bodySize.width - 1 + 'px';
});

// addEventListener support for IE8
function bindEvent(element, eventName, eventHandler) {
    if (element.addEventListener) {
        element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, eventHandler);
    }
}

var iframeSource = './iframe.html';

// Create the iframe
var iframe = document.createElement('iframe');
    iframe.setAttribute('src', iframeSource);
    iframe.setAttribute('id', 'the_iframe');
    iframe.style.width = bodySize.width - 1 + 'px';
    iframe.style.height = bodySize.height + 'px';
    document.body.appendChild(iframe);

// Send a message to the child iframe
var iframeEl = document.getElementById('the_iframe'),
    messageButton = document.getElementById('message_button'),
    results = document.getElementById('results');

// Send a message to the child iframe
var sendMessage = function (msg) {
    // Make sure you are sending a string, and to stringify JSON
    // iframeEl.contentWindow.postMessage(msg, '*');
    iframeEl.contentWindow.postMessage(msg, receiveMessage);
};

// detectando a origem do evento
function receiveMessage(event) {
    console.log('origem do evento', event.origin);
    if (event.origin === 'http://127.0.0.1:5500') return true;
}

// Send random message data on every button click
bindEvent(messageButton, 'click', function (e) {
    var random = Math.random(),
        verifyKey = {
            hash: hash,
            msg: random
        };
    sendMessage(JSON.stringify(verifyKey));
});

// Listen to message from child window
bindEvent(window, 'message', function (e) {
    if (receiveMessage(e)) {
        console.log('mensagem veio do Iframe');
        console.log(e.data);
        results.innerHTML = e.data;
    }
});