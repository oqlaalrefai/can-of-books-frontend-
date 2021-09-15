import React from "react";
import BestBooks from "./BestBooks";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './component/Header'
import Login from './component/Login'
// import Profile from './screens/Profile'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
class App extends React.Component {
  render() {
    return (
      <div>
        {<Router>
          <Switch>
            <Route exact path="/"></Route>
          </Switch>
          <Switch>
            <Route exact path="/Login"> </Route>
            <Login/>
          </Switch>
        </Router> }
       
        <BestBooks />
      </div>
    );
  }
}

export default App;
