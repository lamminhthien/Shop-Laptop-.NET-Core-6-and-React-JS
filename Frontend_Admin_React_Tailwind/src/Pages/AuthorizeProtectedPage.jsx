import React from 'react';
import axios from 'axios';

export default class AuthorizedJWT_ProtectedPage extends React.Component {
  state = {}

componentDidMount() {
    const config = {
        headers : {
            Authorization : 'Bearer ' + localStorage.getItem('token')
        }
    };

    axios.get("https://localhost:44372/api/User/Admins",config).then(res => {
        console.log(res.data);
        this.setState({authorized: "True"})
        alert("OK Authorized with server by JWT token")
    }, err => {
        console.log(err)
        alert("Wrong or expried JWT Token, Server blocked this request ")
    })
}

  // Render form
  render() {
    if (this.state.authorized) {
        return(
            <h1>You are authorized</h1>
        )
    } else {
        return(
            <h1>You are not authorized</h1>
        )
    }
  }
}