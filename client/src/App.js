import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from './components/Navbar.js';
import Home from './components/pages/Home.js';
import Saved from './components/pages/Saved.js';
import Search from './components/pages/Search.js';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import UserContext from "./components/Context/UserContext"



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
  };

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
            <Route exact path="/Home"component={Home} />
            <Route exact path="/Saved" component={Saved} />
            <Route exact path="/Search" component={Search} />
            <Route path="/Login" component={Login} />
            <Route path="/Register" component={Register} />     
            <Route path="*" component={Home} />
          </Switch>
        </UserContext.Provider>
       </div>
    </Router>
  </div>
  );
}

export default App;
