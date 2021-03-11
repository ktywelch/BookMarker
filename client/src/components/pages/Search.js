import React, { useState,useEffect, useContext } from 'react'
import useAxios from '../utils/useAxios'
import SearchDisplay from './SearchDisplay'
import UserContext from "../Context/UserContext";
import { useHistory } from "react-router-dom";





const Search = () => {

    const {REACT_APP_API_KEY} = process.env;
  
    
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();
    const baseUrl = 'https://www.googleapis.com/books/v1/volumes'
    const [query, setQuery] = useState({author: '', subject: '', title: ''});    
    const [url, setUrl] = useState(null);
    const {data, isError, isPending} = useAxios(url);
    const [bookdata, setBookdata] = useState(null);

    useEffect(() => {
        if (!userData.user) history.push("/login");
      }, [userData.user, history]);
   

    //required this useEffect to Render when data change from custom hook useAxios 
    useEffect(() =>{
        data && setBookdata(data.items)
    },[data])


    const handleClick = async (e) => {
        e.preventDefault();
        console.log(e);
        var {author, title, subject} = query;
        console.log(query);
        author ? author = '+inauthor:' + author.replace(/\s/g, '+').toLowerCase() : author='';
        title ? title = '+intitle:' + title.replace(/\s/g, '+').toLowerCase() : title='';
        subject ? subject = '+subject:' + subject.replace(/\s/g, '+').toLowerCase(): subject='';   
        query &&  setUrl(baseUrl + '?q=' + subject + author + title + 
        '&maxResults=30&filter=ebooks&printType=books&projection=lite&key=' + REACT_APP_API_KEY );
        alert(url);
        setBookdata();
        setQuery({author: '', subject: '', title: ''});
        }
        
    return (
        <div>
            <h4>Search Google  Books for ebooks </h4> 
            <form className='col s12'>
                <div className="row">   
                    <input  style={{margin: 10}} 
                        className="input-field col s2" type="text" placeholder=" Author" name="author" value={query.author}
                        onChange={e => setQuery({ ...query, author: e.target.value })}/>
                    <input  style={{margin: 10}} 
                        className="input-field col s2" type="text" placeholder=" Title" name="title" value={query.title}
                        onChange={e => setQuery({ ...query, title: e.target.value })}/>
                    <input  style={{margin: 10}} 
                        className="input-field col s2" type="text" placeholder=" Category (eg. fiction)" name="subject"  value={query.subject}
                        onChange={e => setQuery({ ...query, subject: e.target.value })}/>
                </div>
                <button type="button" onClick={(e) => handleClick(e)}>
                    Start Search
                </button>
            </form>

            {url && isError && <div>No Data - {isError}</div> }
            {isPending && <div>Data is Loading ...</div> }
            {bookdata &&  <SearchDisplay data={bookdata} calledby={'search'}/>}
        </div>
    )
}

export default Search
