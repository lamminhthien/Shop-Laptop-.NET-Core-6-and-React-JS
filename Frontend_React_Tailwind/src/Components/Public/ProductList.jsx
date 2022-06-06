/* eslint-disable jsx-a11y/anchor-is-valid */
import TrangChuApi from '../../Api/Public/TrangChuApi';
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import React from 'react';
import ReceiveData from '../../Services/ReceiveData';
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
export default function ProductList() {
  var page = 1;
  const [listProduct, setListProduct] = useState([]);
  const [pageState, setPageState] = useState(0);
  useEffect(() => {
    TrangChuApi.getSanPhamByDefault(parseInt(page))
      .then(res => {
        setListProduct(res);
        setPageState(1);
      })
      .catch(err => {
        setPageState(-1);
      });
  }, []);
  const pageRender = () => {
    if (pageState === 0) return <p className='text-2xl'>Đang tải dữ liệu</p>;
    if (pageState === -1) return <p className='text-red-500 text-2xl'>Trang bạn yêu cầu có lỗi</p>;
    return (
      <>
        {JSON.stringify(listProduct)}
        {/* {/* <>----------This is map function--------</> <br /> */}
        {listProduct.data.ketQua.map(item => (
          <div
            className='
      bg-white box-border shadow-lg 
      rounded-md shadow-fuchsia-400 w-60 flex flex-wrap justify-center'>
        <img 
        className='max-h-40
         bg-center 
        
        '
        src='https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/4/25/637864982144816513_iphone-13-pro-max-dd-2-128-256-512-1tb.jpg'/>
            <h3>
              <a
                href='#'
                className='
                font-bold text-sm text-black block mb-3
              '>
                {item.tenSanPham}
              </a>
            </h3>
            <div
              className='
            bg-orange-500 w-fit px-4 text-white
             border-orange-500 rounded-2xl
            '>
              {item.giaNiemYet}
            </div>
          </div>
        ))}{' '}
        */
        <>-------------------f--</> <br />
        <>{JSON.stringify(listProduct.data.ketQua)}</>
      </>
    );
  };
  return <>{pageRender()}</>;
}
