
import { useParams, useRouteMatch } from "react-router-dom";
import NotFoundPage from "../../Components/404ErrorPage";
import Sidebar from "../../Components/Sidebar";
export default function ChiTietSanPham() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();
  let { path, url } = useRouteMatch();

  // img
  const imgSRC = [
    "https://cdn.tgdd.vn/Products/Images/44/231244/macbook-air-m1-2020-gray-600x600.jpg",
    "https://ben.com.vn/Content/Images/Products/205930.1.jpg",
    ""
  ]


  // Local data to test front end
  const data = [
    {
      id: 1, cpu: "ABcxaxsa", pin: 128, o_cung: 256,
      he_dieu_hanh: "Windows 10", thiet_ke: "abcxyz",
      kich_thuoc: "xyz",
      mo_ta_them: "123"
    },
    {
      id: 2, cpu: "ABcaaaaaaaaaaaaaaaaa", pin: 128, o_cung: 256,
      he_dieu_hanh: "Windows 10", thiet_ke: "abcxyz",
      kich_thuoc: "xyz",
      mo_ta_them: "abc."
    },
    {
      id: 3, cpu: "ABc", pin: 128, o_cung: 256,
      he_dieu_hanh: "Windows 10", thiet_ke: "abcxyz",
      kich_thuoc: "xyz",
      mo_ta_them: "123"
    },
    {
      id: 4, cpu: "ABc", pin: 128, o_cung: 256,
      he_dieu_hanh: "Windows 10", thiet_ke: "abcxyz",
      kich_thuoc: "xyz",
      mo_ta_them: "123"
    },
    {
      id: 5, cpu: "ABc", pin: 128, o_cung: 256,
      he_dieu_hanh: "Windows 10", thiet_ke: "abcxyz",
      kich_thuoc: "xyz",
      mo_ta_them: "123"
    }
  ]



  if (data[id] == null)
    return (
      <NotFoundPage />
    )
  return (
    <div className="flex">
      <Sidebar />

      <div className="h-screen flex-1 p-7">

        {/* // Khu vực thông tin chi tiết sản phẩm */}
        <div class="grid grid-cols-4 shadow-2xl border rounded-2xl">
          {/* Mô tả thêm */}
          <div class="flex items-center justify-center border-r-2 border-b-2  align-middle">
            <div class="m-2 inline-flex leading-3">
              <svg class="mr-2 h-auto w-4 fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
              <h1>Mô tả thêm</h1>
            </div>
          </div>
          <div class="col-span-3 border-b-2">
            <div class="px-3 leading-7">abc.</div>
          </div>
          {/*Kết thúc Mô tả thêm */}
          {/* Mô tả thêm */}
          <div class="flex items-center justify-center border-r-2 border-b-2  align-middle">
            <div class="m-2 inline-flex leading-3">
              <svg class="mr-2 h-auto w-4 fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
              <h1>Mô tả thêm</h1>
            </div>
          </div>
          <div class="col-span-3 border-b-2">
            <div class="px-3 leading-7">abc.</div>
          </div>
          {/*Kết thúc Mô tả thêm */}
          {/* Mô tả thêm */}
          <div class="flex items-center justify-center border-r-2 border-b-2  align-middle">
            <div class="m-2 inline-flex leading-3">
              <svg class="mr-2 h-auto w-4 fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
              <h1>Mô tả thêm</h1>
            </div>
          </div>
          <div class="col-span-3 border-b-2">
            <div class="px-3 leading-7">abc.</div>
          </div>
          {/*Kết thúc Mô tả thêm */}
          {/* Mô tả thêm */}
          <div class="flex items-center justify-center border-r-2 border-b-2  align-middle">
            <div class="m-2 inline-flex leading-3">
              <svg class="mr-2 h-auto w-4 fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
              <h1>Mô tả thêm</h1>
            </div>
          </div>
          <div class="col-span-3 border-b-2">
            <div class="px-3 leading-7">abc.</div>
          </div>
          {/*Kết thúc Mô tả thêm */}
          {/* Mô tả thêm */}
          <div class="flex items-center justify-center border-r-2 border-b-2  align-middle">
            <div class="m-2 inline-flex leading-3">
              <svg class="mr-2 h-auto w-4 fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
              <h1>Mô tả thêm</h1>
            </div>
          </div>
          <div class="col-span-3 border-b-2">
            <div class="px-3 leading-7">abc.</div>
          </div>
          {/*Kết thúc Mô tả thêm */}
          {/* Mô tả thêm */}
          <div class="flex items-center justify-center border-r-2 border-b-2  align-middle">
            <div class="m-2 inline-flex leading-3">
              <svg class="mr-2 h-auto w-4 fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
              <h1>Mô tả thêm</h1>
            </div>
          </div>
          <div class="col-span-3 border-b-2">
            <div class="px-3 leading-7">abc.</div>
          </div>
          {/*Kết thúc Mô tả thêm */}

         



        </div>
        {/* //Kết thúc  Khu vực thông tin chi tiết sản phẩm */}




      </div>

      <script src="./node_modules/flowbite/dist/flowbite.js"></script>
    </div>
  );


}