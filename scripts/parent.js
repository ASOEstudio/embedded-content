// addEventListener support for IE8
function bindEvent(element, eventName, eventHandler) {
    if (element.addEventListener) {
        element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, eventHandler);
    }
}

var bodySize = {
    height: document.body.clientHeight,
    width: document.body.clientWidth
}

// var iframeSource = 'https://gist.github.com/pbojinov/8965299/raw/fadf2c4058b6481646e7244994c1890f2ad81b60/iframe.html';
var iframeSource = './iframe.html';

// Create the iframe
var iframe = document.createElement('iframe');
    iframe.setAttribute('src', iframeSource);
    iframe.setAttribute('id', 'the_iframe');
    iframe.style.width = bodySize.width + 'px';
    iframe.style.height = bodySize.height + 'px';
    document.body.appendChild(iframe);

// Send a message to the child iframe
var iframeEl = document.getElementById('the_iframe'),
    messageButton = document.getElementById('message_button'),
    results = document.getElementById('results');

// Send a message to the child iframe
var sendMessage = function (msg) {
    // Make sure you are sending a string, and to stringify JSON
    iframeEl.contentWindow.postMessage(msg, '*');
};

// Send random messge data on every button click
bindEvent(messageButton, 'click', function (e) {
    var random = Math.random();
    sendMessage('' + random);
});

// Listen to message from child window
bindEvent(window, 'message', function (e) {
    results.innerHTML = e.data;
});