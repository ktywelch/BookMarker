import React, { useState,useEffect } from 'react'
import useFetch from '../utils/useFetch'
import SearchDisplay from './SearchDisplay'
import axios from 'axios';
import ReactDOM from "react-dom";

const {REACT_APP_API_KEY} = process.env;


const Search = () => {

    const baseUrl = 'https://www.googleapis.com/books/v1/volumes'
    const [query, setQuery] = useState(null);    
    const [url, setUrl] = useState('');
    const [data, setData] = useState(null);
    const [isError, setIsError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [render, setRender] = useState(false)

  
    useEffect(() => {
        // setting up to catch an abort in the query
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

            axios.get(url, {cancelToken: source.token,
                responseType: 'json'})
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


    
    const handleClick = async (e) => {
        e.preventDefault();
        var {author, title, subject} = query;
        author ? author = '+inauthor:' + author.replace(/\s/g, '+').toLowerCase() : author='';
        title ? title = '+intitle:' + title.replace(/\s/g, '+').toLowerCase() : title='';
        subject ? subject = '+subject:' + subject.replace(/\s/g, '+').toLowerCase(): subject='';   
        query &&  setUrl(baseUrl + '?q=' + subject + author + title + 
        '&maxResults=30&filter=free-ebooks&printType=books&projection=lite&key=' + REACT_APP_API_KEY );
        setData();

        }
    

    return (
        <div>
            <span>Search for free ebooks </span> 
            <form className='col s12'>
                <div className="row">   
                    <input  style={{margin: 10}} 
                        className="input-field col s2" type="text" placeholder=" Author" name="author" 
                        onChange={e => setQuery({ ...query, author: e.target.value })}/>
                    <input  style={{margin: 10}} 
                        className="input-field col s2" type="text" placeholder=" Title" name="title" 
                        onChange={e => setQuery({ ...query, title: e.target.value })}/>
                    <input  style={{margin: 10}} 
                        className="input-field col s2" type="text" placeholder=" Category (eg. fiction)" name="subject" 
                        onChange={e => setQuery({ ...query, subject: e.target.value })}/>
                </div>
                <button type="button" onClick={(e) => handleClick(e)}>
                Start Search
            </button>
            </form>

            {isError && <div>No Data - {isError}</div> }
            {isPending && <div>Data is Loading ...</div> }
            {data &&  <SearchDisplay data={data} />}
        </div>
    )
}

export default Search
