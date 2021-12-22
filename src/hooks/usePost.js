import {useEffect, useState} from 'react';
import axios from 'axios';

const usePost = (initialData, postData, url, convertResponseToData) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(initialData);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        let didCancel = false;

        const token = localStorage.getItem("TOKEN");
        if (!token) return;

        setIsLoading(true);
        axios({
            method: 'POST',
            url: url,
            data: postData
        }).then(response => {
            if (!didCancel) {
                setIsLoading(false);
                console.log(response.data)
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
    console.log(data)
    return {
        isLoading,
        data,
        setData,
        errorMessage
    }
}
export default usePost;
