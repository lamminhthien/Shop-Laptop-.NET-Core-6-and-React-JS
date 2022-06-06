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
        <div className='container mt-5'>
          <div className='flex flex-wrap justify-start'>
            {listProduct.data.ketQua.map(item => (
              <a
                href={item.maSanPham}
                className=' h-fit
                    bg-white shadow-lg
                    rounded-md border-black border-0 w-60 flex
                    flex-wrap justify-center mx-4 my-4
                    '>
                <div
                  className='
                max-h-40 bg-center px-3 py-3
                '>
                  <img src='https://vatvostudio.vn/wp-content/uploads/2022/04/iPhone-12-hang-Nhat-ma-ja-ve-Viet-Nam-2.jpg' />
                </div>
                <p
                  className='
                    font-bold text-sm text-black w-full text-center my-3
                  '>
                  {item.tenSanPham}
                </p>
                <div
                  className='
                bg-orange-500 w-fit px-4 text-white
                 border-orange-500 rounded-2xl py-3
                '>
                  {item.giaNiemYet}đ
                </div>
              </a>
            ))}
          </div>
        </div>
    );
  };
  return <>{pageRender()}</>;
}
