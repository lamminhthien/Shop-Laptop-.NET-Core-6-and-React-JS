import React, { Component } from 'react';
import axios from 'axios';
import Sidebar from '../../Components/Sidebar';
export default class ListSanPham extends Component {
  state = {
    brands: [],
    tableHeaders: ["Mã sản phẩm", "Tên sản phẩm", 
    "Loại sản phẩm", "Hãng sãn xuất",
      "Tình trạng", "Giá niêm yết","Chức năng"
    ],
    tableDatas: [
      { maSanPham: "ABC", tenSanPham: "xyz", loaiSanPham: "xyz", hangSanXuat: "xyz", tinhTrang: "xyz", giaNiemYet: "xyz",id:1 },
      { maSanPham: "ABC2", tenSanPham: "xyz3", loaiSanPham: "xyz44", hangSanXuat: "xyz", tinhTrang: "xyz", giaNiemYet: "xyz",id:2 },
      { maSanPham: "ABC4", tenSanPham: "xyz4", loaiSanPham: "xyzf", hangSanXuat: "xyz", tinhTrang: "xyz", giaNiemYet: "xyz",id:3 },
      { maSanPham: "ABC5", tenSanPham: "xyz5", loaiSanPham: "xyzfas", hangSanXuat: "xyz", tinhTrang: "xyz", giaNiemYet: "xyz",id:4 },
      { maSanPham: "ABC6", tenSanPham: "xyz6", loaiSanPham: "xyzfsa", hangSanXuat: "xyz", tinhTrang: "xyz", giaNiemYet: "xyz",id:5 },
      { maSanPham: "ABC7", tenSanPham: "xyz7", loaiSanPham: "xyzfsa", hangSanXuat: "xyz", tinhTrang: "xyz", giaNiemYet: "xyz",id:6 },
      { maSanPham: "ABC8", tenSanPham: "xyz8", loaiSanPham: "xyzfa", hangSanXuat: "xyz", tinhTrang: "xyz", giaNiemYet: "xyz",id:7 },
    ],
    tableFunction: ["Sữa", "Xem chi tiết"]
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
      <div className='flex'>
        <Sidebar />
        <div className='h-screen flex-1 p-7'>
        <div class="flex items-center"><h1 class="mb-3 inline-block text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight 00">Danh sách sản phẩm</h1></div>
          <div class="relative overflow-x-auto shadow-2xl rounded-2xl">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className='bg-slate-300'>
                  <th scope="col" class="p-4">
                    <div class="flex items-center">
                      <input id="checkbox-all" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label for="checkbox-all" class="sr-only">checkbox</label>
                    </div>
                  </th>
                  {this.state.tableHeaders.map((item) =>
                    <th scope="col" class="px-6 py-3">
                      {item}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {this.state.tableDatas.map((item) =>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="w-4 p-4">
                      <div class="flex items-center">
                        <input id="checkbox-table-1" type="checkbox" class="w-4 h-4
                         text-blue-600 bg-gray-100 border-gray-300 rounded
                          focus:ring-blue-500 dark:focus:ring-blue-600 
                          dark:ring-offset-gray-800 focus:ring-2 
                          dark:bg-gray-700 dark:border-gray-600" />
                        <label for="checkbox-table-1" class="sr-only">checkbox</label>
                      </div>
                    </td>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {item.maSanPham}
                    </th>
                    {
                      [item.tenSanPham, item.loaiSanPham,
                      item.loaiSanPham, item.hangSanXuat,item.giaNiemYet]
                        .map((element) =>
                          <td class="px-6 py-4">
                            {element}
                          </td>
                        )
                    }
                    <td class="px-3 py-4 text-left">
                          <a href={"/chi-tiet-san-pham/"+item.id} class="font-medium text-blue-600 dark:text-blue-500 p-2 hover:underline">Chi tiết</a>
                          <a href={"/edit-san-pham/"+item.id}class="font-medium text-blue-600 dark:text-blue-500 p-2 hover:underline">Sữa</a>
                          <a href={"/delete-san-pham/"+item.id} class="font-medium text-blue-600 dark:text-blue-500 p-2 hover:underline">Xóa</a>
                    </td>

                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      // <ul>
      //   { this.state.brands.map(brand => <li>{brand.tenHangSx}</li>)}
      // </ul>
    )
  }
}