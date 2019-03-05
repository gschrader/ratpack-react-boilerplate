export function checkStatus(response) {
    if (!response.ok) {   // (response.status < 200 || response.status > 300)
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
    return response;
}

export function parseJSON(response) {
    return response.json();
}

export function urlToWS(s) {
    var l = window.location;
    var port;
    if (process.env.NODE_ENV === 'production') {
      port = l.port;
    } else {
      port = 5050;
    }
    return ((l.protocol === 'https:') ? 'wss://' : 'ws://') + l.hostname + ':' + port + s;
}

