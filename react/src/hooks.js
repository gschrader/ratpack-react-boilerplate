import {useState, useEffect} from "react";

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