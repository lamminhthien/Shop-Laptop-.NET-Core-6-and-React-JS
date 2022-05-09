import React from 'react';
import axios from 'axios';

export default class LoginCreateJWT extends React.Component {
  constructor(props) {
    super(props)
    this.state = { username: '',password: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // Xử lý khi gửi lên server
  handleSubmit(event) {
    const { username,password} = this.state;
    event.preventDefault();
    // {
    //   "username": "HSX005",
    //   "password": "MSI",
    // }
    axios.post(`https://localhost:44372/api/Login`, { username,password })
      .then(res => {
        alert("OK")
        console.log(res);
        console.log(res.data);
        localStorage.setItem("token",res.data)
      }, err => {
        console.log(err)
        alert("wrong")
      })
  }

  // Xử lý khi nhập dữ liệu vào từng input, mục đích để lưu dữ liệu vào các state để gửi lên axios
  handleChange(event) {
      this.setState({
        [event.target.name] : event.target.value
      })
  }

  // Render form
  render() {
    return (
      <div className='rounded-t-lg overflow-hidden border-t border-l border-r border-gray-400 flex justify-center p-8'>
        <form onSubmit={this.handleSubmit} className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                Username
              </label>
              <input type="text" name="username" value={this.state.username} onChange={this.handleChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
            </div>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                Password
              </label>
              <input type="text" name='password' value={this.state.password} onChange={this.handleChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
            </div>
          </div>
          <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Login and create JWT</button>
        </form>
      </div>
    )
  }
}