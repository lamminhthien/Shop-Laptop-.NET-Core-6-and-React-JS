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
    TrangChuApi.getSanPhamByDefault(parseInt(page)).then(res => {
      setPageState(1)
      setListProduct(res)
    }).catch(err => {
      setPageState(-1)
    })
  }, []);
  const pageRender = () => {
    if (pageState === 0) return <p className='text-2xl'>Đang tải dữ liệu</p>;
    if (pageState === -1) return <p className='text-red-500 text-2xl'>Trang bạn yêu cầu có lỗi</p>;
    return <>{JSON.stringify(listProduct)}</>
  };
  return <>{pageRender()}</>;
}
