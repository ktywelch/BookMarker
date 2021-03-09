import React, { useState } from 'react'
import axios from 'axios'
import getDescendantProp from '../utils/getDescendantProp'    


const SearchDisplay = (props) => {

    const [filteredBooks, setFilteredBooks] =  useState(props.data) 
    const [search, setSerach] = useState('');

     
 function handleSaveClick (e,book) {
       e.preventDefault();
       console.log('click',book.link)
     

   
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
                        <tr className='table-row' key={book._id}>
                            <td className="col s4">
                            <img src={book.imgLoc} alt={"cover" + book.title}/>
                            </td>
                            <td className="s2">{book.title} </td>
                            <td className="s2">{book.authors?book.authors.map((value,index) => 
                                    (<p key={index}>{value}</p>)):null}
                            </td>
                            <td className="s4">{book.description}</td>
                            <td className="s4">
                               <button type="button" onClick={e => {handleSaveClick(e,book)}}>Link</button>
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
