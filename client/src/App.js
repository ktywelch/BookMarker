import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from './components/Navbar.js';
import Home from './components/pages/Home.js';
import Saved from './components/pages/Saved.js';
import Search from './components/pages/Search.js';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Confirmation from './components/pages/Confirmation';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import UserContext from "./components/Context/UserContext";
import ConfirmAccount from './components/pages/ConfirmAccount';
import { ToastContainer } from "react-toastify";



function App() {

  const [userData, setUserData] = useState({
    user: undefined,
    token: undefined,
  });

  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", "");
    } else {
      try {
        const userRes = await axios.get("/users", {
          headers: { "x-auth-token": token },
        });

        setUserData({ token, user: userRes.data });
      } catch (err) {
        console.log("User must login");
      }
    }
  
    const tokenRes = await axios.post("/users/tokenIsValid", null, {
       headers: { "x-auth-token": token },
     });

      

      if (tokenRes.data) {
        const userRes = axios.put("/users/", null, {
          headers: { "x-auth-token": token },
        });

        setUserData({
          token,
          user: userRes.data,
        });
      }
    }


  useEffect(() => {
    checkLoggedIn();
  }, []);

return (
  <div className="App">
    <Router> 
      <div className="content">
        <UserContext.Provider value={{ userData, setUserData }}>
        <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home"component={Home} />
            <Route exact path="/saved" component={Saved} />
            <Route exact path="/search" component={Search} />
            <Route path="/confirmation" component={Confirmation} />
            <Route path="/confirm_account/:token" component={ConfirmAccount} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />     
          </Switch>
        </UserContext.Provider>
       </div>
    </Router>
  </div>
  );
}

export default App;
