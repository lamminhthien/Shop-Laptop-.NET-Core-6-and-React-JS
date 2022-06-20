import React from 'react';
import Sidebar from '../../../Components/Admin/Sidebar';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import LoginCreateJWT from '../../Admin/Login/Login';
import axios from 'axios';
import {Identity} from '@mui/base';

export default function ChiTietDonHang() {
  let {id} = useParams();
  const [listHoaDon, setListHoaDon] = useState([]);
  const [state, setState] = useState(false);
  const [donHangStatus, setDonHangStatus] = useState("");
  var tongTien = 0;
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
        setListHoaDon(res.data.chiTietHoaDon);
        setState(true);
        setDonHangStatus(res.data.trangThaiDon.trangThai)
        console.log(`------------------ ${donHangStatus}`);
      })
      .catch(err => {
        setState(false);
        setStatusCode(err.response.status);
        console.log('%cThis is a red text', 'color:red');
      });
  }, [donHangStatus]);
  const renderData = (donHangStatus) => {
    // if (donHangStatus == 'Đang chờ duyệt')
    // return (<>ABCDEF</>)
    // if (state == true) return <>{donHangStatus}</>
    if (state === true) return <>{`This is ${donHangStatus}`}</>
  }

  listHoaDon.forEach(item => {
    tongTien = tongTien + item.soLuong * item.donGia;
  });
  if (statusCode === 401) {
    return <LoginCreateJWT />;
  }
  if (statusCode === 403) {
    return <LoginCreateJWT expire='1' />;
  }
  if (statusCode === 401) {
    return <LoginCreateJWT login='0' />;
  }
  if (state === true) {
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
                              Mã đơn hàng {id} - <b class='text-red-500'>{donHangStatus}</b>
                            </h2>
                            <p class='text-lg font-bold'>Tổng tiền: {Math.round(tongTien)}</p>
                          </div>
                          <div class='list_item_in_don_hang space-y-4 border-4 border-b-emerald-400 border-t-emerald-400 pl-10'>
                            {listHoaDon.map(item => (
                              <div class='item flex justify-between space-x-9 text-xl'>
                                <img
                                  class='h-[200px] self-center'
                                  src={item.anhSanPham}
                                  alt={item.tenSanPham}
                                />
                                <h2 class='self-center text-gray-700'>{item.tenSanPham}</h2>
                                <p class='self-center font-bold text-red-500'>Số lượng: {item.soLuong}</p>
                                <p class='self-center'>Đơn giá: {Math.round(Math.round(item.donGia))}</p>
                              </div>
                              
                            ))}
                          </div>
                          { donHangStatus == "Đang chờ duyệt" ? "ABC" : "No way" }
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
  if (state === false) {
    return (
      <div className='flex'>
        <Sidebar />
        <div className='h-screen flex-1 p-7'>
          <div class='container mx-auto rounded-lg border-2 border-white bg-[#E2EEEC] lg:p-9'>
            <div class='inner rounded-lg border-2 border-white'>
              <div class='items-cart relative w-full space-y-10 bg-white lg:p-6'>
                <div class='title'>
                  <p class='text-3xl text-red-500 font-medium leading-6'>Đơn hàng này không tồn tại</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
