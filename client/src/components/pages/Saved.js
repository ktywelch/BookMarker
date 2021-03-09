import React, { useState,useEffect } from 'react'
import SavedDisplay from './SavedDisplay'
import useAxios from '../utils/useAxios'

const Saved = () => {

    const [query, setQuery] = useState(null);    
    const [url, setUrl] = useState('api/books');
    const {data, isError, isPending} = useAxios(url);
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
