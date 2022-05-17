import React from 'react';
import axios from 'axios';

export default class CreateBrand extends React.Component {
  constructor(props) {
    super(props)
    this.state = { maHangSx: '',tenHangSx: '',logo: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // Xử lý khi gửi lên server
  handleSubmit(event) {
    const { maHangSx,tenHangSx,logo} = this.state;
    event.preventDefault();
    // {
    //   "maHangSx": "HSX005",
    //   "tenHangSx": "MSI",
    //   "logo": "msi.png",
    // }
    axios.post(`https://localhost:44372/api/HangSanXuats`, { maHangSx,tenHangSx,logo })
      .then(res => {
        console.log(res);
        console.log(res.data);
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
                Brand Code:
              </label>
              <input type="text" name="maHangSx" value={this.state.maHangSx} onChange={this.handleChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
            </div>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                Brand Name
              </label>
              <input type="text" name='tenHangSx' value={this.state.tenHangSx} onChange={this.handleChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
            </div>
          </div>
          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full px-3'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                Brand Logo
              </label>
              <input type="text" name='logo' value={this.state.logo} onChange={this.handleChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
            </div>
          </div>
          <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Add Brand</button>
        </form>
      </div>
    )
  }
}