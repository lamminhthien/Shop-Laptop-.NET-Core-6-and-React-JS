/* eslint-disable jsx-a11y/anchor-is-valid */
import TrangChuApi from '../../Api/Public/TrangChuApi';
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import React from 'react';
import ReceiveData from '../../Services/ReceiveData';

export default function ProductList() {
  // init variable
  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();
  var page = 1;
  const [listProduct, setListProduct] = useState([]);
  const [pageState, setPageState] = useState(0);
  // Query handle
  const queryHandler = () => {
    const formData = new FormData();
    let brand = query.get('brand');
    let category = query.get('category');
    let priceMin = query.get('price-min');
    let priceMax = query.get('price-max');
    let page = query.get('page');
    let searchKey = query.get('searchKey');
    if (!isNaN(brand)) formData.append('maHangSanXuat', brand);
    if (!isNaN(category)) formData.append('maLoaiSanPham', category);
    if (!isNaN(priceMin)) formData.append('minPrice', priceMin);
    if (!isNaN(priceMax)) formData.append('maxPrice', priceMax);
    if (!isNaN(page)) formData.append('page', page);
    formData.append('searchKey',searchKey);
    let params = `?`;
    for (const pair of formData.entries()) {
      if (!isNaN(pair[1]) || (pair[0]==="searchKey")) params = params + `${pair[0]}=${pair[1]}` + '&';
    }
    params = params.slice(0, params.length - 1);
    TrangChuApi.getSanPhamByAdvanceSearch(params)
      .then(res => {
        setListProduct(res);
        setPageState(1);
      })
      .catch(err => {
        setPageState(-1);
      });
  };
  // SetState in react-hook
  useEffect(() => {
    //Excute queryHandler()
    queryHandler();
  }, []);
  // Page Renderring Item
  const pageRender = () => {
    if (pageState === 0) return <p className='text-2xl'>Đang tải dữ liệu</p>;
    if (pageState === -1) return <p className='text-red-500 text-2xl'>Trang bạn yêu cầu có lỗi</p>;
    if (pageState === 1)
      return (
        <div className='container mt-5'>
          <div className='flex flex-wrap justify-start'>
            {listProduct.data.ketqua.map(item => (
              <a
                href={`public/san-pham/${item.maSanPham}`}
                className='h-fit
                    bg-white shadow-lg
                    rounded-md border-black border-0 w-60 flex
                    flex-wrap justify-center mx-4 my-4
                    '>
                <div
                  className='
                max-h-40 bg-center px-3 py-3
                '>
                  <img src={item.anhSanPham} alt={item.tenSanPham}/>
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
