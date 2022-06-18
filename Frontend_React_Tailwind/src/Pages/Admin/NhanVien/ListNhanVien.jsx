import React, { Component } from 'react';
import Sidebar from '../../../Components/Admin/Sidebar';
import { useState, useEffect } from 'react';
import NhanVienApi from '../../../Api/NhanVien/NhanVienApi';
import LoginCreateJWT from '../../Admin/Login/Login';
export default function ListNhanVien() {
     const [statusCode, setStatusCode] = useState('');

    // Table Headers
    const tableHeaders = ["Mã nhân viên", "Tên  nhân viên", "Username",
        "Số điện thoại", "Chức năng"
    ]

    // Khởi tạo danh sách nhân viên
    const [listNhanVien, set_listNhanVien] = useState([])
    // Thực thi lúc bắt đầu trang web
    useEffect(() => {
        // Lấy danh sách nhân viên và tổng số trang cần phân trang
        NhanVienApi.getListNhanVien()
            .then(res => {
                // Set list nhân viên
                set_listNhanVien(res.data)
            })
            .catch(err => setStatusCode(err.response.status));
    }, [])
      if (statusCode === 403 ) {
    return <LoginCreateJWT expire="1" />;
  }
  if (statusCode === 401) {
      return <LoginCreateJWT login="0" />
  }
    return (
        <div className='flex'>
            {/* Hiển thị danh sách nhân viên lên */}
            {listNhanVien.map((item) =>
                console.log(item.tenSanPham)
            )}
            {/* Hiển thị cột sidebar */}
            <Sidebar />
            <div className='h-screen flex-1 p-7'>
                <button type="button" class="hover:scale-125 ease-in-out duration-150 ease-in-out text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">
                    <a href='/them-san-pham'>Thêm nhân viên</a>
                </button>
                <div class="flex items-center"><h1 class="mb-3 inline-block text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight 00">Danh sách nhân viên</h1></div>
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
                                {/* Hiển thị tên các cột  */}
                                {tableHeaders.map((item) =>
                                    <th scope="col" class="px-6 py-3">
                                        {item}
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {/* Map từng dòng trong danh sách nhân viên ra, chú ý còn map cái item trong từng dòng ở dưới nữa*/}
                            {listNhanVien.map((item) =>
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
                                        {/* Riêng mã nhân viên được in đậm in ra trước */}
                                        {item.maNhanVien}
                                    </th>
                                    {
                                        // Hiển thị thông tin các trường còn lại , có cùng style 
                                        [item.tenNhanVien, item.username,
                                         item.soDienThoai]
                                            .map((element) =>
                                                <td class="px-6 py-4">
                                                    {element}
                                                </td>
                                            )
                                    }
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>

            </div>

        </div>
    )

}
