import TrangChuApi from "../../Api/Public/TrangChuApi"
import { useState, useEffect } from "react"

export default function ProductList() {
  const [state, setState] = useState({})
 

  useEffect(() => {
    TrangChuApi.getSanPhamByDefault(0).then((res) => {
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
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
        {state.data.ketQua !== null ? state.data.ketQua.map((item) =>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden" href={`/public/san-pham/${item.maSanPham}`}>
                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/420x260" />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
                <p className="mt-1">$16.00</p>
              </div>
            </div>
) : <p>Đang load data</p>}
        </div>
      </div>
    </section>


  )
}