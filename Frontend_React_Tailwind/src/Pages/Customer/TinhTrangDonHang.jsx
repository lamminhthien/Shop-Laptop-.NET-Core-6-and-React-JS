import React from 'react';
import Footer from '../../Components/Public/Footer';
import PrimarySearchAppBar from '../../Components/Public/Navbar';
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function TinhTrangDonHang() {
  const [objectDonHang, setObjectDonHang] = useState([]);
  const [state, setState] = useState(false);
  const [error, setError] = useState(false);
  const configJWT = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  };

  useEffect(() => {
    axios
      .get(`https://localhost:7216/api/DonHang/ListDonHang`, configJWT)
      .then(res => {
        console.log('%cThis is a green text', 'color:green');
        setObjectDonHang(res.data);
        setState(true);
      })
      .catch(err => {
        console.log('%cThis is a red text', 'color:red');
        setError(true);
      });
  }, []);
  return (
    <>
      <PrimarySearchAppBar />
      {state ? (
        <div>
          <>
            {JSON.stringify(objectDonHang.groupChiTietHoaDon[0])}
            <div className='container  lg:p-9 mx-auto border-2 bg-[#E2EEEC] border-white rounded-lg'>
              <div className='inner border-2 border-white rounded-lg'>
                <div className='items-cart relative w-full   lg:p-6 bg-white space-y-10 '>
                  <div className=' title'>
                    <p className='text-3xl font-medium leading-6'>Tình trạng đơn hàng</p>
                  </div>
                  <div className='list_don_hang'>
                    <div className='inner px-8 py-4'>
                      <div className='don-hang space-y-10'>
                        {objectDonHang.groupChiTietHoaDon.map(item => (
                          <div className='don-hang-1'>
                            <div className='flex justify-between'>
                              <h2>
                                Mã đơn hàng {item.soHoaDon} - {item.tinhTrang}
                              </h2>
                              <p>Tổng tiền: {item.tongTien}</p>
                            </div>
                            <div className='list_item_in_don_hang  space-y-4 pl-5'>
                              {item.chiTietHoaDonList.map(item_inner => (
                                <div className='item flex space-x-9 justify-between'>
                                  <img src={item_inner.anhSanPham} alt={item_inner.tenSanPham} />
                                  <h2>{item_inner.tenSanPham}</h2>
                                  <p>Số lượng: {item_inner.soLuong}</p>
                                  <p>Đơn giá: {item_inner.donGia}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      ) : (
        <p>Đang chờ load dữ liệu</p>
      )}
      {error ? <p>Có lỗi</p> : <></>}

      <Footer />
    </>
  );
}
