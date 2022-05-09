import React from 'react';
import axios from 'axios';

export default class AuthorizedJWT_ProtectedPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { username: '',password: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

componentDidMount() {
    const config = {
        headers : {
            Authorization : 'Beare' + localStorage.getItem('token')
        }
    };

    axios.get("https://localhost:44372/api/User/Admins",config).then(res => {
        console.log(res.data);
        alert("OK Authorized with server by JWT token")
    }, err => {
        console.log(err)
        alert("Wrong or expried JWT Token, Server blocked this request ")
    })
}

  // Render form
  render() {
    return (
     <div>You are authorized</div>
    )
  }
}