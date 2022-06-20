import React from 'react';
import Sidebar from '../../../Components/Admin/Sidebar';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoginCreateJWT from '../../Admin/Login/Login';
import axios from 'axios';
import { Identity } from '@mui/base';

export default function ChiTietDonHang() {
  let { id } = useParams();
  const [listHoaDon, setListHoaDon] = useState([]);
  const [state, setState] = useState(false);
    // Response status code
    const [statusCode, setStatusCode] = useState('');
  const configJWT = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  };
  useEffect(() => {
    axios
      .get(`https://localhost:7216/api/QuanLyDonHang/ChiTietDonHang/${id}`, configJWT)
      .then(res => {
        console.log('%cThis is a green text', 'color:green');
        setListHoaDon(res.data);
        setState(true);
      })
      .catch(err => {
        setStatusCode(err.response.status)
        console.log('%cThis is a red text', 'color:red');
      });
  }, []);
  if (statusCode === 401) {
    return <LoginCreateJWT/>
} 
  if (statusCode === 403 ) {
    return <LoginCreateJWT expire="1" />;
  }
  if (statusCode === 401) {
      return <LoginCreateJWT login="0" />
  }

  return (
    <>
      <div className='flex'>
        <Sidebar />
        <div className='h-screen flex-1 p-7'>
          <div class='container mx-auto rounded-lg border-2 border-white bg-[#E2EEEC] lg:p-9'>
            <div class='inner rounded-lg border-2 border-white'>
              <div class='items-cart relative w-full space-y-10 bg-white lg:p-6'>
                <div class='title'>
                  <p class='text-3xl font-medium leading-6'>Chi Tiết Đơn Hàng</p>
                </div>
                <div class='list_don_hang'>
                  <div class='inner px-8 py-4'>
                    <div class='don-hang space-y-10'>
                      <div class='don-hang-1 bg-slate-100'>
                        <div class='flex justify-between'>
                          <h2 class='text-2xl'>
                            Mã đơn hàng 16 - <b class='text-red-500'>Đang chờ duyệt</b>
                          </h2>
                          <p class='text-lg font-bold'>Tổng tiền: 36059700</p>
                        </div>
                        <div class='list_item_in_don_hang space-y-4 border-4 border-b-emerald-400 border-t-emerald-400 pl-10'>
                          <div class='item flex justify-between space-x-9 text-xl'>
                            <img
                              class='h-[200px] self-center'
                              src='https://localhost:7216/Resources/Images/SanPham/SP81-1.jpeg'
                              alt='Laptop HP 240 G8'
                            />
                            <h2 class='self-center text-gray-700'>Laptop HP 240 G8</h2>
                            <p class='self-center font-bold text-red-500'>Số lượng: 1</p>
                            <p class='self-center'>Đơn giá: 15750900.000000002</p>
                          </div>
                          <div class='item flex justify-between space-x-9 text-xl'>
                            <img
                              class='h-[200px] self-center'
                              src='https://localhost:7216/Resources/Images/SanPham/SP82-1.jpeg'
                              alt='USB 3.0 Sandisk'
                            />
                            <h2 class='self-center text-gray-700'>USB 3.0 Sandisk</h2>
                            <p class='self-center font-bold text-red-500'>Số lượng: 2</p>
                            <p class='self-center'>Đơn giá: 259899.99999999997</p>
                          </div>
                          <div class='item flex justify-between space-x-9 text-xl'>
                            <img
                              class='h-[200px] self-center'
                              src='https://localhost:7216/Resources/Images/SanPham/SP78-1.jpeg'
                              alt='Laptop Lenovo IdeaPad Slim 5 15ITL05'
                            />
                            <h2 class='self-center text-gray-700'>Laptop Lenovo IdeaPad Slim 5 15ITL05</h2>
                            <p class='self-center font-bold text-red-500'>Số lượng: 1</p>
                            <p class='self-center'>Đơn giá: 19789000</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
