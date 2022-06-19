import TrangChuApi from "../../Api/Public/TrangChuApi"
import { useState, useEffect } from "react"

export default function ProductType() {
  const [state, setState] = useState({})

  useEffect(() => {
    TrangChuApi.getListLoaiSanPham().then((res) => {
      setState({
        data: res.data,
        done: true
      })
    })
      .catch(err => {
        setState({
          error: err,
          done: false
        })
      })
  }, [])

if (state.done)
  return (
  
    <div className='danh-muc-san-pham'>
        <h1 className="text-center text-fuchsia-500 text-3xl font-semibold mt-5 mb-5">Danh mục sản phẩm</h1>
      <div class="flex flex-wrap place-content-center gap-4 overflow-hidden">
         {state.data !== null ? state.data.map((item) =>
          <a href={`?category=${item.maLoaiSanPham}`}>
            <div className="flex w-48 h-40 transform flex-wrap justify-center rounded-xl border-2 border-indigo-600 bg-white p-2 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              {/* Image */}
              <img className="h-28" src={item.anhLoaiSanPham} alt />
              <div className="p-2">
                {/* Heading */}
                <h2 className="mb-2 text-lg font-bold">{item.tenLoaiSanPham}</h2>
              </div>
              {/* CTA */}
            </div>
          </a>
        ) : <p>Đang load data</p>}
      </div>
    </div>
  )
}
