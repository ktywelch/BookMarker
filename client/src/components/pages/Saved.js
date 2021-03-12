import React, { useState,useEffect, useContext } from 'react';
import SavedDisplay from './SavedDisplay';
import useAxios from '../utils/useAxios';
import axios from 'axios';
import UserContext from "../Context/UserContext";
import { useHistory } from "react-router-dom";


const Saved = () => {

    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    const {data, isError, isPending} = useAxios(url);
    // const [data, setData] = useState(null);
    // const [isError, setIsError] = useState(null);
    // const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        if (!userData.user) history.push("/login");
      }, [userData.user, history]);
   
      const url = '/api/booksTag/'  + userData.user.id;
      console.log(url);

// /// need to fix this not sure impace of using the x-auth-token everywhere tink it is fine ...
//     useEffect(() => {
//         // setting up to catch an abort in the query
//         const CancelToken = axios.CancelToken;
//         const source = CancelToken.source();
        
//         /*   try {
//             const { data } = await axios.post("/users/login", form);
      
//             setUserData({
//               token: data.token,
//               user: data.user,
//             });
      
//             localStorage.setItem("auth-token", data.token);
//             history.push("/");
//           } catch (err) {
//               */


            

//     //         axios.get(url, {
//     //             cancelToken: source.token,
//     //             responseType: 'json',
//     //             headers: { "x-auth-token": localStorage.getItem("auth-token")}
//     //             })
//     //             .then(res => {
//     //                 if(res.status !== 200){
//     //                  throw Error("Did not get valid for that resource")
//     //                 }
//     //             return res.data;
//     //             })
//     //             .then ((data) => {
//     //             console.log(data);
//     //             setData(data);
//     //             setIsPending(false);
//     //             setIsError(null);
//     //             })
//     //             .catch((err) => {
//     //                 console.log(err.message);
//     //                 if (axios.isCancel.err) {
//     //                     console.log('Request canceled', err.message);
//     //                   }  else {    
//     //                 setIsError(err.message);
//     //                 setIsPending(false);
//     //                 }
//     //             })
//     //     // return () => CancelToken.cancel;
//     // },[url]) 

  
//     console.log(data);

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
