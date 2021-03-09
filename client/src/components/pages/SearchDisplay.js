import React, { useState,useEffect } from 'react'
import axios from 'axios'
import getDescendantProp from '../utils/getDescendantProp'    


const SearchDisplay = (props) => {


    const [filteredBooks, setFilteredBooks] =  useState(props.data.items)
 
    const [search, setSerach] = useState('');
    const [saveBook,setSaveBook] = useState({});

    const handleClick = (e,book) => {
       e.preventDefault();
       setSaveBook({
            imgLoc: book.volumeInfo.imageLinks.thumbnail,
            title: book.volumeInfo.title, 
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            link: book.accessInfo.pdf.downloadLink
        })

        axios.post('api/books',
            saveBook
        )
        .then(res => {
          console.log(res);
          setSaveBook({})
        })

        console.log('saveBook', saveBook)
    }


    return (
        <div className="SearchDisplay">
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
                            {console.log(book.volumeInfo.title)}
                            <td className="col s4">
                            {book.volumeInfo.imageLinks && <img src={book.volumeInfo.imageLinks.thumbnail} alt={"cover" + book.volumeInfo.title}/>}
                            </td>
                            <td className="s2">{book.volumeInfo.title} </td>
                            <td className="s2">{book.volumeInfo.authors?book.volumeInfo.authors.map((value,index) => 
                                    (<p key={index}>{value}</p>)):null}
                            </td>
                            <td className="s4">{book.volumeInfo.description}</td>
                            <td className="s4">
                                <button type="button" onClick={e => handleClick(e,book)}>Save</button>
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
