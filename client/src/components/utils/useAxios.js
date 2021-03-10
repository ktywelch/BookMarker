//custom  hook using axios
import{ useState, useEffect } from 'react';
import axios  from 'axios';

const useAxios = (url)  => {

    const [data, setData] = useState(null);
    const [isError, setIsError] = useState(null)
    const [isPending, setIsPending] = useState(true);


    useEffect(() => {
        // setting up to catch an abort in the query
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

            axios.get(url, {
                cancelToken: source.token,
                responseType: 'json'
                })
                .then(res => {
                    if(res.status !== 200){
                     throw Error("Did not get valid for that resource")
                    }
                return res.data;
                })
                .then ((data) => {
                setData(data);
                setIsPending(false);
                setIsError(null);
                })
                .catch((err) => {
                    console.log(err.message);
                    if (axios.isCancel.err) {
                        console.log('Request canceled', err.message);
                      }  else {    
                    setIsError(err.message);
                    setIsPending(false);
                    }
                })
        return () => CancelToken.cancel;
    },[url]) 

    return {data, isPending, isError}
}

export default useAxios;