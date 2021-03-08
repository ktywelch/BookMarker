import Navbar from './components/Navbar.js'
import Home from './components/pages/Home.js'
import Saved from './components/pages/Saved.js'
import Search from './components/pages/Search.js'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
     </div>
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route> 
          <Route exact path="/Home">
            <Home />
          </Route> 
          <Route exact path="/Saved">
            <Saved />
          </Route>
          <Route exact path="/Search">
            <Search />
          </Route>                  
            <Route path="*">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
