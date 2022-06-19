/* eslint-disable jsx-a11y/anchor-is-valid */
import TrangChuApi from '../../Api/Public/TrangChuApi';
import {useState, useEffect} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import React from 'react';
import ReceiveData from '../../Services/ReceiveData';

export default function ProductList() {
  // init variable
  function useQuery() {
    const {search} = useLocation();
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
    formData.append('searchKey', searchKey);
    let params = `?`;
    for (const pair of formData.entries()) {
      if (!isNaN(pair[1]) || pair[0] === 'searchKey') params = params + `${pair[0]}=${pair[1]}` + '&';
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
                className='mx-4 my-4 flex 
                 w-60 flex-wrap justify-center
                  rounded-md border-0 border-black 
                  bg-white shadow-lg  transform transition-all 
                  hover:-translate-y-2 duration-300 hover:shadow-2xl
                    '>
                <div className='bg-center px-2 py-2'>
                  <img src={item.anhSanPham} alt={item.tenSanPham} className='h-[200px] object-cover' />
                </div>
                <p
                  className='
                  my-3 w-full text-center text-sm font-bold text-black
                  '>
                  {item.tenSanPham}
                </p>
                <div
                  className='
                  w-fit rounded-2xl border-orange-500 bg-orange-500 px-4 py-3 text-white
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
