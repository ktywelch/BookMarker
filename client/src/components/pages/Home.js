import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../Context/UserContext";

const Home = () => {
    const { userData } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (!userData.user) history.push("/login");
      }, [userData.user, history]);

    return (
        <div>
            <p>Home Page</p>
            <h3>Your name is: {userData.user?.displayName}</h3>
        </div>
    )
}

export default Home;
