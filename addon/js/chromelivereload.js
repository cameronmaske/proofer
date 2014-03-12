// Reload client for Chrome Apps & Extensions.
// The reload client has a compatibility with livereload.
// WARNING: only supports reload command.

var LIVERELOAD_HOST = 'localhost:';

if (navigator.platform.indexOf("Mac") != -1){
    LIVERELOAD_HOST = 'localdocker:';
}

var LIVERELOAD_PORT = 35729;
var connection = new WebSocket('ws://' + LIVERELOAD_HOST + LIVERELOAD_PORT + '/livereload');

connection.onerror = function (error) {
    console.log('reload connection got error' + JSON.stringify(error));
};

connection.onmessage = function (e) {
    if (e.data) {
        var data = JSON.parse(e.data);
        if (data && data.command === 'reload') {
            chrome.runtime.reload();
        }
    }
};