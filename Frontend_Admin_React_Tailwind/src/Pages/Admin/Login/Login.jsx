import React from 'react';
import axios from 'axios';

export default class LoginCreateJWT extends React.Component {
  constructor(props) {
    super(props)
    this.state = { username: '', password: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // Xử lý khi gửi lên server
  handleSubmit(event) {
    const { username, password } = this.state;
    event.preventDefault();
    // {
    //   "username": "HSX005",
    //   "password": "MSI",
    // }
    axios.post(`https://localhost:44372/api/Login`, { username, password })
      .then(res => {
        alert("OK")
        console.log(res);
        console.log(res.data);
        localStorage.setItem("token", res.data)
      }, err => {
        console.log(err)
        alert("wrong")
      })
  }

  // Xử lý khi nhập dữ liệu vào từng input, mục đích để lưu dữ liệu vào các state để gửi lên axios
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  // Render form
  render() {
    return (
      <div class="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0 bg-gradient-to-r
      from-indigo-600
      to-blue-400">
        <header class="max-w-lg mx-auto">
          <a href="#">
            <h1 class=" text-4xl font-bold text-white text-center">Đăng nhập admin</h1>
          </a>
        </header>

        <main class="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
          <section>
            <h3 class="font-bold text-2xl">Chào mừng nhân viên Đức Thịnh Laptop</h3>
          </section>

          <section class="mt-10">
            <form class="flex flex-col" method="POST" action="#">
              <div class="mb-6 pt-3 rounded bg-gray-200">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2 ml-3"
                  for="email"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="email"
                  class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"

                />
              </div>
              <div class="mb-6 pt-3 rounded bg-gray-200">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2 ml-3"
                  for="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                />
              </div>
              <button
                class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                type="submit"
              >
                Sign In
              </button>
            </form>
          </section>
        </main>

       

     
      </div>
    )
  }
}