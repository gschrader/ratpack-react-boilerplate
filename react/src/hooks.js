import {useState, useEffect} from "react";
import {urlToWS} from "./utils";

function useFetch(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchUrl() {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
    }

    useEffect(() => {
        fetchUrl();
    }, []);
    return [data, loading];
}

export {useFetch};


function useFetchText(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchUrl() {
        const response = await fetch(url);
        const text = await response.text();
        setData(text);
        setLoading(false);
    }

    useEffect(() => {
        fetchUrl();
    }, []);
    return [data, loading];
}

export {useFetchText};


function useWs(url, jwt) {
    const [data, setData] = useState([]);
    const [disconnected, setDisconnected] = useState(false);

    async function fetcWs() {
        const ws = new WebSocket(urlToWS(url) + '?jwt=' + jwt);

        ws.onmessage = function (message) {
            setData(JSON.parse(message.data));
        };

        ws.onclose = function () {
            setDisconnected(true);
        };

        return ws;
    }

    useEffect(() => {
        const ws = fetcWs();
        return function cleanup() {
            ws.then(ws => ws.close());
        }
    }, []);
    return [data, disconnected];
}

export {useWs}

function useWsNoData(url) {
    const [disconnected, setDisconnected] = useState(false);

    async function fetcWs() {
        const ws = new WebSocket(urlToWS(url));

        ws.onclose = function () {
            setDisconnected(true);
        };

        return ws;
    }

    useEffect(() => {
        const ws = fetcWs();
        return function cleanup() {
            ws.then(ws => ws.close());
        }
    }, []);
    return disconnected;
}

export {useWsNoData};