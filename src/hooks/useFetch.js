import {useEffect, useState} from 'react';
import axios from 'axios';

const useFetch = (initialData, url, convertResponseToData) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(initialData);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        let didCancel = false;

        const token = localStorage.getItem("TOKEN");
        if (!token) return;

        setIsLoading(true);
        axios({
            method: 'GET',
            url: url,
        }).then(response => {
            if (!didCancel) {
                setIsLoading(false);
                setData(convertResponseToData(response));
            }
        }).catch(error => {
            if (!didCancel) {
                setIsLoading(false);
                setErrorMessage(error.message);
            }
        });
        return () => {
            didCancel = true;
        }
    }, [url, convertResponseToData]);
    return {
        isLoading,
        data,
        setData,
        errorMessage
    }
}
export default useFetch;
