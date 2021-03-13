import React, { useState,useEffect, useContext } from 'react';
import SavedDisplay from './SavedDisplay';
import useAxios from '../utils/useAxios';
import axios from 'axios';
import UserContext from "../Context/UserContext";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";


const Saved = () => {

    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    const [data, setData] = useState(null);
    const [isError, setIsError] = useState(null);
    const [isPending, setIsPending] = useState(true);



/// need to fix this not sure impace of using the x-auth-token everywhere tink it is fine ...
    const getData = async() => {
        // setting up to catch an abort in the query
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();   
        try {
            const { data } = await axios.get(url, {
                cancelToken: source.token,
                responseType: 'json',
                headers: { "x-auth-token": localStorage.getItem("auth-token")}})
                setData(data);
                setIsPending(false);
                setIsError(null);
        } catch (err) {
            console.log("err",err.response);
            toast.error(err.response.data.msg);
            if (axios.isCancel.err) {
                console.log('Request canceled', err.message);
            }  else {  
                console.log(err.message);        
                setIsError(err.message);
                setIsPending(false);
            }
        };
      return () => CancelToken.cancel;
    }
    useEffect(() => {
        getData();
        if (!userData.user) history.push("/login");
      }, [userData.user, history]);
   
      const url = '/api/booksTag/'  + userData.user.id;
      console.log(url);
  
    console.log(data);

    return (
        <div>
            <span>List of books saved </span> 
            {url && isError && <div>No Data - {isError}</div> }
            {isPending && <div>Data is Loading ...</div> }
            {data &&  <SavedDisplay books={data} calledby={'saved'} />}
        </div>
    )    
}

export default Saved
