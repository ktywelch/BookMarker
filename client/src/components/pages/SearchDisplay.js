import React, { useState } from 'react'
import axios from 'axios'
import getDescendantProp from '../utils/getDescendantProp'    


const SearchDisplay = (props) => {

    const [filteredBooks, setFilteredBooks] =  useState(props.data) 
    const [search, setSerach] = useState('');

     
 function handleSaveClick (e,book) {
       e.preventDefault();
       console.log('click')
       //Save the book details
       axios.post('http://localhost:3030/api/books',
            {
            bookId: book.id,    
            imgLoc: book.volumeInfo.imageLinks.thumbnail,
            title: book.volumeInfo.title, 
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            link: book.selfLink
            },
            {
                headers: { "x-auth-token": localStorage.getItem("auth-token") },
              }
        )
        .then(res => {
            console.log(res);
        })
   
    }


    return (
        <div className="responsive-table">
            <span>Filter by Name: </span> 
             <input type="text" placeholder="Enter Filter Criteria" onChange={ e => setSerach(e.target.value)} />
            
              <table>
                <thead>
                <tr>     
                    <th></th>
                    <th>Title</th>
                    <th>Author(s)</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                    {filteredBooks && filteredBooks.map((book) => (    
                        <tr className='table-row' key={book.id}>
                            <td className="col s4">
                            {book.volumeInfo.imageLinks && <img src={book.volumeInfo.imageLinks.thumbnail} alt={"cover" + book.volumeInfo.title}/>}
                            </td>
                            <td className="s2">{book.volumeInfo.title} </td>
                            <td className="s2">{book.volumeInfo.authors?book.volumeInfo.authors.map((value,index) => 
                                    (<p key={index}>{value}</p>)):null}
                            </td>
                            <td className="s4">{book.volumeInfo.description}</td>
                            <td className="s4">
                                {props.calledby === 'search' ? <button type="button" onClick={e => {handleSaveClick(e,book)}}>Save</button>:null}
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
          </div>
 

    )
}

export default SearchDisplay
