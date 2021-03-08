import React, { useState,useEffect } from 'react'
import useAxios from '../utils/useAxios'
import getDescendantProp from '../utils/getDescendantProp'    


const SearchExecDisp = (props) => {
    console.log(props.url)

    const {data, isPending, isError} = useAxios(props.url)
    console.log(data);
  

    const [filteredBooks, setFilteredBooks] =  useState(null)
    const [search, setSerach] = useState('');
    
    // useEffect(() => {
    //    console.log(data); 
    //    setFilteredBooks(data);
    // },[data])
    
    const handleClick = () => {

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
                    </th>
                </tr>
                </thead>
                <tbody>
                    {filteredBooks?
                        filteredBooks.map((book) => (    
                        <tr className='table-row' key={book.id}>
                            <td className="col s2">
                                <img src={book.volumeInfo.imageLinks.smallThumbnail} alt={"cover" + book.volumeInfo.title}/>
                            </td>
                            <td className="col s2">{book.volumeInfo.title} </td>
                            <td className="col s2">{book.volumeInfo.authors}</td>
                            <td className="col s6">{book.volumeInfo.description}</td>
                            
                        </tr>
                    ))
                    : null}
                </tbody>
            </table>
          </div>
 

    )
}

export default SearchExecDisp
