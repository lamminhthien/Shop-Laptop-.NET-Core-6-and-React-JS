import React from 'react';
import Sidebar from '../../../Components/Admin/Sidebar';
import { useState, useEffect } from 'react';
import BannerApi from '../../../Api/Banner/BannerApi';
import LoginCreateJWT from '../Login/Login';

export default function ListBanner() {
  // Lấy url trang hiện tại
  // Table Headers
  const tableHeaders = ['Liên kết', 'Ảnh minh họa', 'Chức năng'];
  // Khởi tạo danh sách banner
  const [listBanner, set_listBanner] = useState([]);
  // Response status code
  const [statusCode, setStatusCode] = useState('');

  // Thực thi lúc bắt đầu trang web
  useEffect(() => {
    // Lấy danh sách banner và tổng số trang cần phân trang
    BannerApi.getListBanner()
      .then(res => {
        set_listBanner(res.data);
      })
      .catch(err => setStatusCode(err.response.status));
  }, []);

//   Check status code, if (403) redirect to login form
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
          <button
            type='button'
            class='hover:scale-125 ease-in-out duration-150  text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2'>
            <a href='/admin/them-banner'>Thêm quảng cáo</a>
          </button>
          <div class='flex items-center'>
            <h1 class='mb-3 inline-block text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight 00'>
              Danh sách quảng cáo
            </h1>
          </div>
          <div class='relative overflow-x-auto shadow-2xl rounded-2xl'>
            <table class='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
              <thead class='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr className='bg-slate-300'>
                  <th scope='col' class='p-4'>
                    <div class='flex items-center'>
                      <input
                        id='checkbox-all'
                        type='checkbox'
                        class='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                      />
                    </div>
                  </th>
                  {/* Hiển thị tên các cột  */}
                  {tableHeaders.map(item => (
                    <th scope='col' class='px-6 py-3'>
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Map từng dòng trong danh sách Thương hiệu ra, chú ý còn map cái item trong từng dòng ở dưới nữa*/}
                {listBanner.map(item => (
                  <tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                    <td class='w-4 p-4'>
                      <div class='flex items-center'>
                        <input
                          id='checkbox-table-1'
                          type='checkbox'
                          class='w-4 h-4
                         text-blue-600 bg-gray-100 border-gray-300 rounded
                          focus:ring-blue-500 dark:focus:ring-blue-600 '
                        />
                      </div>
                    </td>
                    <td className='px-6 py-4'>{item.link}</td>
                    <td className='px-6 py-4 '>
                      <img
                        className='w-24 '
                        src={item.image}
                        alt={item.image}
                      />
                    </td>
                    <td class='px-5 py-4 text-left'>
                      <a
                        href={'/admin/edit-banner/' + item.maHangSx}
                        class='font-medium text-blue-600
 dark:text-blue-500 p-2 border-2 rounded-xl hover:bg-yellow-400 hover:border-2 space-x-3 hover:text-white hover:scale-170 ease-in-out duration-150   '>
                        Sữa
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}
