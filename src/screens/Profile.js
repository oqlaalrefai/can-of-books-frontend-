import { Component } from "react";
import { withAuth0 } from '@auth0/auth0-react';
class Profile extends Component {

  render() {
    const user = this.props.auth0.user;
    return (
      <div>
        <img src={user.picture} alt="Hanin" />
        <p>{user.email}</p>
        <p>{user.name}</p>
      </div>
    )
  }
};

export default withAuth0(Profile);