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
  const [state, setState] = useState(ReceiveData.do('Đang tải dữ liệu', false));
  let query = useQuery();
  useEffect(() => {
    if (query.get('category')) {
      const id = query.get('category');
      if (isNaN(id)) setState(ReceiveData.do("Mã loại sản phẩm không phù hợp",false))
      TrangChuApi.getSanPhamByCategory(parseInt(id)).then(res => {
        setState(ReceiveData.do(res,true))
      }).catch(err => {
        setState(ReceiveData.do(err,false))
      })
    }
  }, []);
  console.log(state);
  const fetchData = () => {
    if (state.state === false) {
      return (
        <h1 className='text-red-500'>No data</h1>
      )
    }
    if (state.state === true) {
      return (
        <>{JSON.stringify(state.data)}</>
      )
    }
  }
  return (
    <>{fetchData()}</>
    
  );
}
