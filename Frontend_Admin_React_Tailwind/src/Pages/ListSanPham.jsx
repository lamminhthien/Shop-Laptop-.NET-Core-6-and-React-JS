import React from 'react';
import axios from 'axios';
export default class brandList extends React.Component {
  state = {
    brands: []
  }

  componentDidMount() {
    axios.get(`https://localhost:44372/api/HangSanXuats`)
      .then(res => {
        const brands = res.data;
        this.setState({ brands });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <ul>
        { this.state.brands.map(brand => <li>{brand.tenHangSx}</li>)}
      </ul>
    )
  }
}