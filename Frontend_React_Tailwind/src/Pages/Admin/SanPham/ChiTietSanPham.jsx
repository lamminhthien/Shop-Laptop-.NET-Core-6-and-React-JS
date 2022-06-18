
import { useParams, useRouteMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFoundPage from "../../../Components/404ErrorPage";
import Sidebar from "../../../Components/Admin/Sidebar";
import axios from "axios";
import LoginCreateJWT from '../../Admin/Login/Login';
export default function ChiTietSanPham() {
   const [statusCode, setStatusCode] = useState('');
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();
  // Khởi tạo dữ liệu chi tiết sản phẩm
  const [dataChiTietSanPham, setDataChiTietSanPham] = useState([]);

  // Sẽ lưu path ảnh từ database vào đây (để var nhan)
  const [imgSRC,setImgSRC] = useState([])

  // Mảng chứa label của các property trong chi tiết sản phẩm
  const dataLabel = [
    "Mã sản phẩm", "Tên sản phẩm",
    "Tên loại sản phẩm", "Hãng sản xuất",
    "Trạng thái", "CPU", "Card đồ họa", "Độ phân giải",
    "Ổ cưng", "Hệ điều hành", "Kích thước", " Màn hình",
    "Trọng lượng", "RAM", "Mô tả thêm","Giá niêm yết"
  ]
  const jsonDataKey = [
    "maSanPham",
    "tenSanPham", "loaiSanPham","hangSanXuat",
    "tinhTrang","cpu","cardDoHoa",
    "doPhanGiai","oCung","heDieuHanh",
    "kichThuoc","manHinh","trongLuong","ram",
    "moTaThem","giaNiemYet"
  ]


  // Set state for responsive
  const [responsive, setResponsive] = useState(true);
  // Set state for change picture
  const [imageSlide, setImageSlide] = useState(imgSRC[0]);
  // Set state isFailed
  const [isFailed, setisFailed] = useState(true);

  // Responsive content when on mobile
  const handleResize = () => {
    if (window.innerWidth < 900) {
      setResponsive(false)
    } else {
      setResponsive(true)
    }
  }

  useEffect(() => {
    // Hàm này dùng để render data đúng theo thư tự nhãn trong data Label
    const configJWT = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
    // Lấy dữ liệu chi tiết sản phẩm dựa theo id từ params, 
    axios.get(`https://localhost:7216/api/QuanLySanPham/DetailSanPham/${id}`,configJWT)
      .then(res => {
        // Tìm thấy thì lưu dữ liệu
        setDataChiTietSanPham(res.data.chiTietSanPham)
        // Lưu ảnh vào array imgSRC
        setUpAnh(res.data.danhSachAnh)
        setisFailed(false)
      })
      // Không tìm thấy thì trả về trang lỗi
      .catch(error => {
        setisFailed(true)
        setStatusCode(error.response.status)
      })
    // Lắng nghe sự kiện thay đổi kích thước thiết bị và kích hoạt hàm handleResize
    window.addEventListener("resize", handleResize)
  }, [])

// Set up ảnh để hiển thị
const setUpAnh = (data) => {
  setImageSlide(`https://localhost:7216/Resources/Images/SanPham/${data[0]}`)
  setImgSRC(data)
}
  if (statusCode === 403 ) {
    return <LoginCreateJWT expire="1" />;
  }
  if (statusCode === 401) {
      return <LoginCreateJWT login="0" />
  }
  if (isFailed)
    return <NotFoundPage />
  return (
    <div className="flex">
      <Sidebar />
      <div className="max-h-screen flex-1 p-7">

        {/* // Khu vực thông tin chi tiết sản phẩm */}
        <div class={` ${responsive ? "grid grid-cols-3 mt-3 duration-150" : "mt-3 duration-150"}`}>
          <div class="col-span-1 bg-transparent text-2xl rounded-xl mr-2 ml-4">
            {/* Khu vực hiển thị ảnh */}
            <div>
              <div className="flex items-center justify-center">
                <div className="place-items-center bg-slate-400">
                  <img src={imageSlide.trim()} />
                </div>
              </div>
              <div class="flex items-center justify-center">
                <div class=" bg-slate-200">
                  <img src={`https://localhost:7216/Resources/Images/SanPham/${imgSRC[0]}`} height="100px" width="100px" onClick={() => setImageSlide(`https://localhost:7216/Resources/Images/SanPham/${imgSRC[0]}`)} />
                </div>
                <div class=" bg-slate-200">
                  <img src={`https://localhost:7216/Resources/Images/SanPham/${imgSRC[1]}`} height="100px" width="100px" onClick={() => setImageSlide(`https://localhost:7216/Resources/Images/SanPham/${imgSRC[1]}`)} />
                </div>
                <div class=" bg-slate-700">
                  <img src={`https://localhost:7216/Resources/Images/SanPham/${imgSRC[2]}`} height="100px" width="100px" onClick={() => setImageSlide(`https://localhost:7216/Resources/Images/SanPham/${imgSRC[2]}`)} />
                </div>
              </div>
            </div>
            {/*Kết thúc khu vực hiển thị ảnh */}
          </div>

          <div class="max-h-screen max-w-screen-md overflow-auto col-span-2 grid grid-cols-4 rounded-2xl border bg-slate-300 shadow-2xl mr-8">
            {/* Chỗ này xuất thông tin chi tiết sản phẩm thôi */}
            {/* Dựa theo độ dài của mảng dataLabel mà xuất dữ liệu ra giao diện */}
            {Array.from({ length: dataLabel.length }, (val, ind) =>
              <>
                <div class="rounded-tr-2xl border-b-2 bg-white">
                  <div class="m-2 inline-flex leading-normal">
                    <svg class="mr-2 h-auto w-4 fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
                    {/* Hiển thị label dựa theo array dataLabel */}
                    <h1>{dataLabel[ind]}</h1>
                  </div>
                </div>
                <div class="col-span-3  flex items-center justify-center border-r-2 border-b-2 align-middle">
                  {/* Hiển thị dữ liệu lấy từ api */}
                  <p>{dataChiTietSanPham[jsonDataKey[ind]]}</p>

                </div>
              </>
            )}
            {/*End of block Chỗ này xuât thông tin chi tiết sản phẩm thôi */}
          </div>
        </div>
        {/* //Kết thúc  Khu vực thông tin chi tiết sản phẩm */}
      </div>
    </div>
  );


}
