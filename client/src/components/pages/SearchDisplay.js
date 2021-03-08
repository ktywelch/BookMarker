import React, { useState,useEffect } from 'react'
import useAxios from '../utils/useAxios'
import getDescendantProp from '../utils/getDescendantProp'    


const SearchDisplay = (props) => {
   
    console.log(props.data.items);
  
    const [filteredBooks, setFilteredBooks] =  useState(props.data.items)
    const [search, setSerach] = useState('');
    const [saveBook,setSaveBook] = useState({});

    
    const handleClick = (e,book) => {
       e.preventDefault();
       setSaveBook({
            imgLoc: book.volumeInfo.imageLinks.thumbnail,
            title: book.volumeInfo.title, 
            author: book.volumeInfo.authors,
            description: book.volumeInfo.description
        })
        //if the book is available in PDF then set link 
        if(book.accessInfo.pdf.isAvailable) 
            {  setSaveBook({...saveBook, link: book.accessInfo.pdf.downloadLink})};
        console.log('saveBook', saveBook)
    }


    return (
        <div className="container">
            <span>Filter by Name: </span> 
             <input type="text" placeholder="Enter Filter Criteria" onChange={ e => setSerach(e.target.value)} />
            
              <table>
                <thead>
                <tr>     
                    <th></th>
                    <th>
                    {/* <button type="button" onClick={() => {
                        setSortedField ('name.last');
                        sortDirection === 'ascending' ? setSortDirection('descending'): setSortDirection('ascending');
                            setClassBtnval({name: sortDirection, country: 'none', email: 'none'})
                            }}
                        className={classBtnVal.name}>
                        Name
                        </button> */}
                        Title
                    </th>
                    <th>
                        {/* <button type="button" onClick={() => {
                        setSortedField ('location.country')
                        sortDirection === 'ascending' ? setSortDirection('descending'): setSortDirection('ascending') 
                        setClassBtnval({name: 'none', country: sortDirection, email: 'none'})
                        }}
                        className={ classBtnVal.country}>
                        Country
                        </button> */}
                        Author(s)
                    </th>
                    <th>
                        {/* <button type="button" onClick={() => {
                        setSortedField ('email');
                        sortDirection === 'ascending' ? setSortDirection('descending'): setSortDirection('ascending')
                        setClassBtnval({name: 'none', country: 'none', email: sortDirection})
                        }}
                        className={classBtnVal.email}>
                        Email
                        </button> */}
                        Description
                    </th>
                </tr>
                </thead>
                <tbody>
                    {filteredBooks?
                        filteredBooks.map((book) => (    
                        <tr className='table-row' key={book.id}>
                            <td className="col s4">
                                <img src={book.volumeInfo.imageLinks.thumbnail} alt={"cover" + book.volumeInfo.title}/>
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
                    : null}
                </tbody>
            </table>
          </div>
 

    )
}

export default SearchDisplay
