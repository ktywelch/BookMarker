import React, { useState,useEffect } from 'react';
import SavedDisplay from './SavedDisplay';
import useAxios from '../utils/useAxios';
import axios from 'axios';

const Saved = () => {


    const url = 'api/books';
    const [data, setData] = useState(null);
    const [isError, setIsError] = useState(null);
    const [isPending, setIsPending] = useState(true);

/// need to fix this not sure impace of using the x-auth-token everywhere tink it is fine ...
    useEffect(() => {
        // setting up to catch an abort in the query
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

            axios.get(url, {
                cancelToken: source.token,
                responseType: 'json',
                headers: { "x-auth-token": localStorage.getItem("auth-token")}
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




    //const hdr = '{ headers: { "x-auth-token": localStorage.getItem("auth-token") },}';
  

    //const {data, isError, isPending} = useAxios(url,hdr);
    const [bookdata, setBookdata] = useState(data);
    console.log(data);

    //required this useEffect to Render when data change from custom hook useAxios 
    useEffect(() =>{
        data && setBookdata(data)
    },[data])


    
    return (
        <div>
            <span>List of books saved </span> 

            {url && isError && <div>No Data - {isError}</div> }
            {isPending && <div>Data is Loading ...</div> }
            {bookdata &&  <SavedDisplay data={bookdata} calledby={'saved'} />}
        </div>
    )    
}

export default Saved
