import React from 'react';
import Sidebar from '../../../Components/Admin/Sidebar';
import { useState, useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import Paging from '../../../Components/Admin/Paging';
import HangSanXuatApi from '../../../Api/HangSanXuat/HangSanXuatApi';
import LoginCreateJWT from '../../Admin/Login/Login';

export default function ListHangSanXuat() {
  // Lấy url trang hiện tại
  const { path, url } = useRouteMatch();

  // Đọc số trang hiện tại
  let { pageNumber } = useParams();

  pageNumber == undefined ? (pageNumber = 1) : (pageNumber = pageNumber);
  // Table Headers
  const tableHeaders = ['Mã hãng sản xuât', 'Tên hãng hãng sản xuất', 'Ảnh minh họa', 'Chức năng'];

  // Khởi tạo danh sách hãng sản xuất
  const [listHangSanXuat, set_listHangSanXuat] = useState([]);
  // Khởi tạo tổng số trang để tạo menu phân trang
  const [numberOfPages, set_numberOfPages] = useState(0);
  // Response status code
  const [statusCode, setStatusCode] = useState('');

  // Thực thi lúc bắt đầu trang web
  useEffect(() => {
    // Lấy danh sách hãng sản xuất và tổng số trang cần phân trang
    HangSanXuatApi.getListHangSanXuat(pageNumber)
      .then(res => {
        set_listHangSanXuat(res.data.ketQua);
        set_numberOfPages(res.data.tongSoTrang);
      })
    //   .catch(err => setStatusCode(err.response.status));
    .catch(err => console.log(err))
  }, []);

  // Check status code, if (403) redirect to login form
//   if (statusCode === 401 ) {
//     return <LoginCreateJWT expire="1" />;
//   }
//   if (statusCode === 403) {
//       return <LoginCreateJWT login="0" />
//   }
    return (
      <div className='flex'>
        {/* Hiển thị danh sách hãng sản xuất lên */}
        {listHangSanXuat.map(item => console.log(item.tenSanPham))}
        {/* Hiển thị cột sidebar */}
        <Sidebar />
        <div className='h-screen flex-1 p-7'>
          <button
            type='button'
            class='hover:scale-125 ease-in-out duration-150 ease-in-out text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 '>
            <a href='/them_hang_san_xuat'>Thêm danh mục hãng sản xuất</a>
          </button>
          <div class='flex items-center'>
            <h1 class='mb-3 inline-block text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight 00'>
              Danh sách hãng sản xuất
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
                      <label for='checkbox-all' class='sr-only'>
                        checkbox
                      </label>
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
                {/* Map từng dòng trong danh sách hãng sản xuất ra, chú ý còn map cái item trong từng dòng ở dưới nữa*/}
                {listHangSanXuat.map(item => (
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
                        <label for='checkbox-table-1' class='sr-only'>
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th scope='row' class='px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap'>
                      {/* Riêng mã hãng sản xuất được in đậm in ra trước */}
                      {item.maHangSx}
                    </th>
                    <td className='px-6 py-4'>{item.tenHangSx}</td>
                    <td className='px-6 py-4 '>
                      <img
                        className='w-24 '
                        src={`https://localhost:7216/Resources/Images/HangSanXuat/${item.logo}`}
                        alt={item.tenHangSx}
                      />
                    </td>
                    {
                      // Hiển thị thông tin các trường còn lại , có cùng style
                      // [item.tenHangSx, item.logo]
                      //     .map((element) =>
                      //         <td class="px-6 py-4">
                      //             {element}
                      //         </td>
                      //     )
                    }
                    <td class='px-5 py-4 text-left'>
                      <a
                        href={'/admin/edit-hang-san-xuat/' + item.maHangSx}
                        class='font-medium text-blue-600
 dark:text-blue-500 p-2 border-2 rounded-xl hover:bg-yellow-400 hover:border-2 space-x-3 hover:text-white hover:scale-170 ease-in-out duration-150   '>
                        Sữa
                      </a>
                    </td>
                  </tr>
                ))}
                <tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                  {/* Tạo dải phân trang vơi pages là tổng số trang và currentPage là trang hiện tại (để đánh dấu màu sắc) */}
                  <td class='w-4 p-4' colSpan={3}>
                    {' '}
                    <Paging pages={numberOfPages} currentPage={pageNumber} url={url} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}
