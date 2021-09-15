"use strict";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './component/Header'
import Login from './component/Login'
// import Profile from './screens/Profile'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  loginHandler = (user) => {
    this.setState({
      user,
    });
  };

  logoutHandler = () => {
    this.setState({
      user: null,
    });
  };

  render() {
    const isAuth = this.props.auth0.isAuthenticated;
    return (
      <>
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler} />
          <Switch>
            <Route exact path="/">
              {isAuth ? <BestBooks /> : <Login />}
            </Route>
            <Route exact path="/profile">
              {isAuth && <Profile />}
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
