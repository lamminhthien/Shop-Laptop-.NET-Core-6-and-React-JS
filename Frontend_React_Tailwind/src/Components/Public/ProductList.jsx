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
      rounded-md shadow-fuchsia-400 w-60'>
            <h3>
              <a href='#'
                className='
                font-bold text-sm text-black
              '>
                {item.tenSanPham}
              </a>
            </h3>
            <p>{item.giaNiemYet}</p>
          </div>
        ))} */
        <>-------------------f--</> <br />
        <>{JSON.stringify(listProduct.data.ketQua)}</>
      </>
    );
  };
  return <>{pageRender()}</>;
}
