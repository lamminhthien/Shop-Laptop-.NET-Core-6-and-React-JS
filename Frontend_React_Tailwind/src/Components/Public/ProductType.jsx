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
  
    <div>
        <h1 className="text-center text-fuchsia-500 shadow-xl text-3xl font-semibold">Danh mục sản phẩm</h1>
      <div class="flex flex-wrap place-content-center overflow-hidden">
      
         {state.data !== null ? state.data.map((item) =>
          <a href="#">
            <div className="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
              {/* Image */}
              <img className="h-40 object-cover rounded-xl h-40 object-cover rounded-xl" src={item.anhLoaiSanPham} alt />
              <div className="p-2">
                {/* Heading */}
                <h2 className="font-bold text-lg mb-2 ">{item.tenLoaiSanPham}</h2>
              </div>
              {/* CTA */}
            </div>
          </a>
        ) : <p>Đang load data</p>}
      </div>
    </div>
  )
}