//This custom fetch hook was developed while following the NetNinja tutorial and made sense to keep it
// the helper function goes and does the fetch of a url - returns data, isPending if waiting and isError 
// if there is a problem with the fetch - i

import{ useState, useEffect } from 'react';

const useFetch = (url)  => {

    const [data, setData] = useState(null);
    const [isError, setIsError] = useState(null)
    const [isPending, setIsPending] = useState(true);


    useEffect(() => {
        const abortFetch = new AbortController();
            fetch(url, {signal: abortFetch.signal})
                .then(res => {
                    if(!res.ok){
                     throw Error("Did not get valid for that resource")
                    }
                return res.json()
                })
                .then ((data) => {
                    console.log(data);
                setData(data);
                setIsPending(false);
                setIsError(null);
                })
                .catch((err) => {
                    console.log(err.message);
                    if(err.name === 'AbortError'){
                        console.log('Fetch Aborted')
                    } else {    
                    setIsError(err.message);
                    setIsPending(false);
                    }

                })
        

        return () => abortFetch.abort();
    },[url]) 

    return {data, isPending, isError}
}

export default useFetch;