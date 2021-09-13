import React from "react";
import BestBooks from "./BestBooks";
import "bootstrap/dist/css/bootstrap.min.css";
// import Profile from './screens/Profile'
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
class App extends React.Component {
  render() {
    return (
      <div>
        {/* <Router>
          <Switch>
            <Route exact path="/"></Route>
          </Switch>
          <Switch>
            <Route exact path="/Profile"></Route>
            <Profile/>
          </Switch>
        </Router> */}
        <BestBooks />
      </div>
    );
  }
}

export default App;
