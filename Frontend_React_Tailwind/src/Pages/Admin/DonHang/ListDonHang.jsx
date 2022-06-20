import React from 'react';
import Sidebar from '../../../Components/Admin/Sidebar';
import {FcExpand} from 'react-icons/fc';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {confirmAlert} from 'react-confirm-alert';

export default function ListDonHang() {
  const [listHoaDon, setListHoaDon] = useState([]);
  const [state, setState] = useState(false);
  const [error, setError] = useState([]);
  const configJWT = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  };
  useEffect(() => {
    axios
      .get(`https://localhost:7216/api/QuanLyDonHang/ListDonHang`, configJWT)
      .then(res => {
        console.log('%cThis is a green text', 'color:green');
        setListHoaDon(res.data);
        setState(true);
      })
      .catch(err => {
        console.log('%cThis is a red text', 'color:red');
      });
  }, []);
  return (
    <div>
      <div className='flex'>
        <Sidebar />
        <div className='h-screen flex-1 p-7'>
          <div className='container  lg:p-9 mx-auto border-2 bg-[#E2EEEC] border-white rounded-lg'>
            <div className='inner border-2 border-white rounded-lg'>
              <div className='items-cart relative w-full   lg:p-6 bg-white space-y-10 '>
                <div className=' title'>
                  <p className='text-3xl font-medium leading-6'>Tình trạng đơn hàng</p>
                </div>
                <div className='list_don_hang'>
                  <div className='inner px-8 py-4'>
                    <div className='don-hang space-y-10'>
                      <div className='don-hang-1 bg-slate-100'>
                        <div className='flex justify-between'>
                          <h2 className='text-2xl'>
                            Mã đơn hàng 16 - <b className='text-red-500'>Đang chờ duyệt</b>
                          </h2>
                          <p className='text-lg font-bold'>Tổng tiền: 36059700</p>
                          <button onClick={() => console.log('nothing')}>
                            <FcExpand size={30} />
                          </button>
                        </div>
                        <div className='list_item_in_don_hang hidden space-y-4 pl-10 border-4 border-b-emerald-400 border-t-emerald-400'>
                          <div className='text-xl item flex space-x-9 justify-between'>
                            <img
                              className='h-[200px] self-center'
                              src='https://localhost:7216/Resources/Images/SanPham/SP81-1.jpeg'
                              alt='Laptop HP 240 G8'
                            />
                            <h2 className=' text-gray-700 self-center'>Laptop HP 240 G8</h2>
                            <p className='font-bold text-red-500 self-center'>Số lượng: 1</p>
                            <p className='self-center '>Đơn giá: 15750900.000000002</p>
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
    </div>
  );
}
