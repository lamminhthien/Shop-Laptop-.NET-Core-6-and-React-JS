import { useParams } from "react-router-dom";
import TrangChiTietSanPhamApi from "../../Api/Public/TrangChiTietSanPhamApi";
import { useState, useEffect } from "react"

export default function ProductDetail() {
  let { id } = useParams();
  const [state, setState] = useState({})
  useEffect(() => {
    TrangChiTietSanPhamApi.getChiTietSanPham(id).then((res) => {
      setState({
        data: res.data.chiTietSanPham,
        image: res.data.danhSachAnh,
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
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-row">
            <div className="lg:basis-2/4">
              <img alt="ecommerce" className="mt-auto h-3/5  w-fit object-cover object-center rounded" src={state.image[1]} />
              <div className="flex flex-row  justify-center space-x-4 font-mono text-white text-sm font-bold leading-6">
              {state.image !== null ? state.image.map((item) =>
                <img alt="ecommerce" className="w-1/4 object-cover object-center rounded" src={item} />
              ) : <p>Đang load ảnh thu nhỏ</p>}
              </div>
              
            </div>
            <div className="lg:basis-2/4 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{state.data.hangSanXuat}</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{state.data.tenSanPham}</h1>
              <div className="flex mb-4">
                <span className="flex items-center">

                  <span className="text-indigo-500 ml-3">{state.data.loaiSanPham}</span>
                </span>

              </div>
              <div className="leading-relaxed">
                <ul class="list-disc list-inside text-slate-900 dark:text-slate-200">
                  <li>CPU: {state.data.cpu}</li>
                  <li>Card đồ họa: {state.data.cardDoHoa}</li>
                  <li>Độ phân giải: {state.data.doPhanGiai}</li>
                  <li>Ổ cứng: {state.data.oCung}</li>
                  <li>Hệ điều hành: {state.data.heDieuHanh}</li>
                  <li>Kích Thước: {state.data.kichThuoc}</li>
                  <li>Màn hình: {state.data.manHinh}</li>
                  <li>Trọng lượng: {state.data.trongLuong}</li>
                  <li>RAM: {state.data.ram}</li>
                  <li>Mô tả thêm: {state.data.moTaThem}</li>
                </ul>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">Giá: {state.data.giaNiemYet} VND</span>
                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Thêm vào giỏ hàng</button>
              </div>
            </div>
          </div>
        </div>
      </section>

    )
}