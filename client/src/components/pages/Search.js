import React, { useState,useEffect } from 'react'
import useAxios from '../utils/useAxios'
import SearchExecDisp from './SearchExecDisp'
import SearchDisplay from './SearchDisplay'
const {REACT_APP_API_KEY} = process.env;


const Search = () => {
    const baseUrl = 'https://www.googleapis.com/books/v1/volumes'
    const [query, setQuery] = useState(null);    
    const [books, setBooks] = useState({});  
    const [url, setUrl] = useState('');
    const {data, isPending, isError} = useAxios(url)
 

        useEffect(() => {
            console.log(data); 
            setBooks(data);
         },[url])
         
    
    const handleClick = (e,cb) => {
        e.preventDefault();
        var {author, title, subject} = query;
        author ? author = '+inauthor:' + author.replace(/\s/g, '+').toLowerCase() : author='';
        title ? title = '+intitle:' + title.replace(/\s/g, '+').toLowerCase() : title='';
        subject ? subject = '+subject:' + subject.replace(/\s/g, '+').toLowerCase(): subject='';   
        query ?   setUrl(baseUrl + '?q=' + subject + author + title + 
        '&maxResults=30&filter=free-ebooks&printType=books&projection=lite&key=' + REACT_APP_API_KEY ) : setUrl(null);
    
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
                <button type="submit" onClick={(e) => handleClick(e)}>
                Start Search
            </button>
            </form>
            {/* {url?<SearchExecDisp url={url} />:null} */}
            {data?<SearchDisplay data={data} />:null}
        </div>
    )
}

export default Search
