import TrangChuApi from '../../Api/Public/TrangChuApi';
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import React from 'react';
import ProductListService from '../../Services/Public/ProductListService';
import ReceiveData from '../../Services/ReceiveData';
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
export default function ProductList() {
  const [state, setState] = useState(ReceiveData.do("Đang tải dữ liệu",false));
  let query = useQuery();
  useEffect(() => {
    if (query.get("category")) {
      const id = query.get("category")
      setState(ProductListService.filterProductByCategory(id))

    }
  },[])
  console.log(state);
  return (
    <section className='text-gray-600 body-font'>
        <div className='container px-5 py-1 mx-auto'>
          <div className='flex flex-wrap -m-4'>
            {state.state ? state.data.map(item => (
              <div className='lg:w-1/4 md:w-1/2 p-4 w-full'>
                <a className='block relative h-48 rounded overflow-hidden' href={`/public/san-pham/${item.maSanPham}`}>
                  <img
                    alt='ecommerce'
                    className='object-cover object-center w-full h-full block'
                    src={item.anhSanPham}
                  />
                </a>

                <div className='mt-4'>
                  <h2 className='text-gray-900 title-font text-lg font-medium'>{item.tenSanPham}</h2>
                  <p className='mt-1'>{item.giaNiemYet} VND</p>
                  <button
                    className='mt-1 border-2  bg-white text-black text-1xl rounded-2xl 
                        shadow-xl hover:bg-black hover:text-white hover:text-2xl 
                        transform transition-all hover:-translate-y-2 duration-300
                        '>
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            )):<p className='text-red-600 font-bold justify-center'>{state.data}</p>}
          </div>
        </div>
      </section>
  )
}
