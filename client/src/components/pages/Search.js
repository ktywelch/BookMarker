import React, { useState,useEffect } from 'react'
import useAxios from '../utils/useAxios'
import SearchDisplay from './SearchDisplay'


const {REACT_APP_API_KEY} = process.env;


const Search = () => {
    
    const baseUrl = 'https://www.googleapis.com/books/v1/volumes'
    const [query, setQuery] = useState(null);    
    const [url, setUrl] = useState(null);
    const {data, isError, isPending} = useAxios(url);
    const [bookdata, setBookdata] = useState(null);

    //required this useEffect to Render when data change from custom hook useAxios 
    useEffect(() =>{
        setBookdata(data)
    },[data])


    const handleClick = async (e) => {
        e.preventDefault();
        var {author, title, subject} = query;
        author ? author = '+inauthor:' + author.replace(/\s/g, '+').toLowerCase() : author='';
        title ? title = '+intitle:' + title.replace(/\s/g, '+').toLowerCase() : title='';
        subject ? subject = '+subject:' + subject.replace(/\s/g, '+').toLowerCase(): subject='';   
        query &&  setUrl(baseUrl + '?q=' + subject + author + title + 
        '&maxResults=30&filter=free-ebooks&printType=books&projection=lite&key=' + REACT_APP_API_KEY );
        setBookdata();
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

            {url && isError && <div>No Data - {isError}</div> }
            {isPending && <div>Data is Loading ...</div> }
            {bookdata &&  <SearchDisplay data={bookdata} />}
        </div>
    )
}

export default Search
