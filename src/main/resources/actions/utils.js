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

    return ((l.protocol === 'https:') ? 'wss://' : 'ws://') + l.hostname + (((l.port != 80) && (l.port != 443)) ? ':' + l.port : '') + '/' + s;
}

