import React, { Component } from 'react';
import Sidebar from '../../../Components/Admin/Sidebar';
import { useState, useEffect } from 'react';
import NhanVienApi from '../../../Api/NhanVien/NhanVienApi';
import LoginCreateJWT from '../../Admin/Login/Login';
export default function ListNhanVien() {
     const [statusCode, setStatusCode] = useState('');

    // Table Headers
    const tableHeaders = ["Mã nhân viên", "Tên  nhân viên", "Username", "Số điện thoại"]

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
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                        {/* Riêng mã nhân viên được in đậm in ra trước */}
                                        {item.maNhanVien}
                                    </th>
                                    {
                                        // Hiển thị thông tin các trường còn lại , có cùng style 
                                        [item.tenNhanVien, item.userName,
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
