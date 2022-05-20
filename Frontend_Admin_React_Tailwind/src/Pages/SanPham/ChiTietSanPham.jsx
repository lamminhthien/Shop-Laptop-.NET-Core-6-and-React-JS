
import { useParams, useRouteMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFoundPage from "../../Components/404ErrorPage";
import Sidebar from "../../Components/Sidebar";
import axios from "axios";
export default function ChiTietSanPham() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();
  let { path, url } = useRouteMatch();
  // Khởi tạo dữ liệu chi tiết sản phẩm
  const [dataChiTietSanPham, setDataChiTietSanPham] = useState([]);

  // img
  const imgSRC = [
    "https://cdn.tgdd.vn/Files/2019/08/22/1190454/laptop-vien-man-hinh-mong-co-nhung-uu-va-nhuoc-diem-gi--4.jpg",
    "https://ben.com.vn/Content/Images/Products/205930.1.jpg",
    "https://vlink.com.vn/uploads/laptop_la_gi.jpg"
  ]

  // Mảng chứa label của các property trong chi tiết sản phẩm
  const dataLabel = [
    "Mã sản phẩm", "Tên sản phẩm",
    "Tên loại sản phẩm", "Hãng sản xuất",
    "Trạng thái", "CPU", "Card đồ họa", "Độ phân giải",
    "Ổ cưng", "Hệ điều hành", " Màn hình", "Kích thước",
    "Trọng lượng", "RAM", "Mô tả thêm"
  ]


  // Set state for responsive
  const [responsive, setResponsive] = useState(true);
  // Set state for change picture
  const [imageSlide, setImageSlide] = useState(imgSRC[0]);
  // Set state for ready to render page (Prevent empty page when don't have data)
  const [fetchDataOk,setFetchDataOk] = useState(false);

  // Responsive content when on mobile
  const handleResize = () => {
    if (window.innerWidth < 900) {
      setResponsive(false)
    } else {
      setResponsive(true)
    }
  }

  useEffect(() => {
    // Lấy dữ liệu chi tiết sản phẩm dựa theo id từ params, 
    const fetchApi = async () => {
      await axios.get(`https://localhost:7216/api/QuanLySanPham/DetailSanPham/${id}`)
        .then(res => {
          // Tìm thấy thì lưu dữ liệu
          setDataChiTietSanPham(res.data)
          // Đặt tín hiệu để render dữ liệu
          setFetchDataOk(true)

        })
        // Không tìm thấy thì trả về trang lỗi
        .catch(error => {

          return (
            <NotFoundPage />
          )
        })
    }
    // Gọi hàm fetchApi
    fetchApi();

        // Lắng nghe sự kiện thay đổi kích thước thiết bị và kích hoạt hàm handleResize
        window.addEventListener("resize", handleResize)

  }, [])

  // Hàm này dùng để render data đúng theo thư tự nhãn trong data Label
  const renderDataBySwtichCase = (param) => {
    // eslint-disable-next-line default-case
    switch (param) {
      case 0:
        return (dataChiTietSanPham.maSanPham ? `SP0${dataChiTietSanPham.maSanPham}` : "Không có dữ liệu")
        break;
      case 1:
        return (dataChiTietSanPham.tenSanPham ? dataChiTietSanPham.tenSanPham : "Không có dữ liệu")
        break;
      case 2:
        return (dataChiTietSanPham.maLoaiSpNavigation.tenLoaiSp ? dataChiTietSanPham.maLoaiSpNavigation.tenLoaiSp : 
            "Không có dữ liệu"
          )
        break;
      case 3:
        return (dataChiTietSanPham.maHangSxNavigation.tenHangSx ? dataChiTietSanPham.maHangSxNavigation.tenHangSx :
            "Không có dữ liệu"
          )
        break;
      case 4:
        return (dataChiTietSanPham.trangThaiSp ? dataChiTietSanPham.trangThaiSp : 
            "Không có dữ liệu"
          )
        break;
      case 5:
        return (dataChiTietSanPham.chiTietSanPham.cpu ? dataChiTietSanPham.chiTietSanPham.cpu :
          "Không có dữ liệu"
        )
        break;
      case 6:
        return (dataChiTietSanPham.chiTietSanPham.cardDoHoa ? dataChiTietSanPham.chiTietSanPham.cardDoHoa :
            "Không có dữ liệu"
          )
        break;
      case 7:
        return (dataChiTietSanPham.chiTietSanPham.doPhanGiai ? dataChiTietSanPham.chiTietSanPham.doPhanGiai : 
            "Không có dữ liệu"
          )
        break;
      case 8:
        return (dataChiTietSanPham.chiTietSanPham.oCung ? dataChiTietSanPham.chiTietSanPham.oCung :
          "Không có dữ liệu"
        )
        break;
      case 9:
        return (dataChiTietSanPham.chiTietSanPham.heDieuHanh ? dataChiTietSanPham.chiTietSanPham.heDieuHanh :
            "Không có dữ liệu"
        )
        break;
      case 10:
        return (dataChiTietSanPham.chiTietSanPham.manHinh ? dataChiTietSanPham.chiTietSanPham.manHinh :
          "Không có dữ liệu"
          )
        break;
      case 11:
        return (dataChiTietSanPham.chiTietSanPham.kichThuoc ? dataChiTietSanPham.chiTietSanPham.kichThuoc :
            "Không có dữ liệu"
          )
        break;
      case 12:
        return (dataChiTietSanPham.chiTietSanPham.trongLuong ? dataChiTietSanPham.chiTietSanPham.trongLuong :
            "Không có dữ liệu"
          )
        break;
      case 13:
        return (dataChiTietSanPham.chiTietSanPham.ram ? dataChiTietSanPham.chiTietSanPham.ram :
            "Không có dữ liệu"
          )
        break;
      case 14:
        return (dataChiTietSanPham.chiTietSanPham.moTaThem ? dataChiTietSanPham.chiTietSanPham.moTaThem :
            "Không có dữ liệu"
          )
        break;
    }
  }

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
                  <img src={imageSlide} />
                </div>
              </div>
              <div class="flex items-center justify-center">
                <div class=" bg-slate-200">
                  <img src={imgSRC[0]} height="100px" width="100px" onClick={() => setImageSlide(imgSRC[0])} />
                </div>
                <div class=" bg-slate-200">
                  <img src={imgSRC[1]} height="100px" width="100px" onClick={() => setImageSlide(imgSRC[1])} />
                </div>
                <div class=" bg-slate-700">
                  <img src={imgSRC[2]} height="100px" width="100px" onClick={() => setImageSlide(imgSRC[2])} />
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
                  <div class="px-3 leading-7">{fetchDataOk ? renderDataBySwtichCase(ind) : "Đang tải"}</div>
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