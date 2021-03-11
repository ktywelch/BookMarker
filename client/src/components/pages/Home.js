import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../Context/UserContext";
import io from 'socket.io'


const Home = () => {
    const { userData } = useContext(UserContext);
    const history = useHistory();
    const socket = io();

    useEffect(() => {
        if (!userData.user) history.push("/login");
      }, [userData.user, history]);

    return (
        <div className="container" style={{maxWidth: 800}}>         
            <h4>Welcome to the book marker application,  {userData.user?.displayName}</h4>
            <br/>
            <p>This is an aplication that let's you signup and search for google e-books and save 
               the ones you want to refences into a database. The database is persistent and  
               the books you saved will be there for you on your next login in the saved tab.
            </p>
        </div>
    )
}

export default Home;
