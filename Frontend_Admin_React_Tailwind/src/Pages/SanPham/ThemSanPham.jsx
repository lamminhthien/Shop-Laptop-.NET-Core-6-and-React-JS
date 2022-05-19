

import NotFoundPage from "../../Components/404ErrorPage";
import Sidebar from "../../Components/Sidebar";
// Sử dụng useFrom từ react hook  form
import { useForm } from "react-hook-form";
export default function ThemSanPham() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  const {
    register, // Đăng ký input vô react hookform
    handleSubmit, //Xử lý khi submit form
    watch, // Theo dõi và báo lỗi
    formState: { errors } // Theo dõi người dùng tương tác form
  } = useForm(); // Na ná cách dùng useState

  // Xử lý khi submit form
  const onSubmit = (data) => {
    // Khi nào vượt rào được thì mới xác nhận form hợp lệ
    // và hiện ra dữ liệu json  được chuỗi hóa
    alert(JSON.stringify(data));
  }; // your form submit function which will invoke after successful validation


  // Watcher theo dõi input theo name property 
  console.log(watch("example"));

  // Tailwind CSS Reuse style 
  const inputStyle = `bg-gray-50 border border-gray-300
   text-gray-900 text-sm rounded-lg focus:ring-blue-500 
   focus:border-blue-500 block w-full p-2.5`
  const labelStyle = `block mb-2 text-sm font-medium text-gray-900`
  const errorStyle = `before:content-['⚠'] mt-2 text-sm text-red-600 `
  const divStyle = `relative z-0 w-full mb-6 group`

  return (
    <div className="flex">
      <Sidebar />
      <div className="h-screen flex-1 p-7">
        <div class="flex items-center"><h1 class="inline-block text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight 00">Thêm sản phẩm mới</h1></div>
        {/*  Chế độ onSubmit sẽ là HandleSubmit */}
        <form onSubmit={handleSubmit(onSubmit)}
          className="mt-2 rounded-xl bg-gradient-to-r bg-white  border 
        border-gray-200  p-2 sm:p-6  drop-shadow-2xl overscroll-contain">
          <div className="grid xl:grid-cols-3 xl:gap-6">
            <div className={divStyle}>
              <label for="email" class="block mb-2 text-sm font-medium text-green-900 dark:text-gray-300">Tên sản phẩm</label>
              <input
                className={inputStyle}
                // Đăng ký vào react hook form
                {...register("tenSanPham", {
                  // Các điều kiện validation
                  required: true, // Bắt buộc
                  maxLength: 20, // Độ dài tối đa
                  pattern: /^[A-Za-z]+$/i // Pattern theo regex
                })}
              />
              {/* // Hình thức hiển thị lỗi (dựa theo formState)
      //  lỗi ở tenSanPham là required  thì hiện thẻ p thông báo lỗi */}
              {errors?.tenSanPham?.type === "required" && <p className={errorStyle}>This field is required</p>}
              {errors?.tenSanPham?.type === "maxLength" && (
                <p className={errorStyle}>First name cannot exceed 20 characters</p>
              )}
              {errors?.tenSanPham?.type === "pattern" && (
                <p className={errorStyle}>Alphabetical characters only</p>
              )}
            </div>
            <div className={divStyle}>
              <label for="countries" class={labelStyle}>Hãng sản xuất</label>
              <select id="countries" class={inputStyle}>
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>
            <div className={divStyle}>
              <label for="countries" class={labelStyle}>Loại sản phẩm</label>
              <select id="countries" class={inputStyle}>
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>
          </div>
          {/* Trạng thái sản phẩm,CPU, CARD đồ họa */}
          <div className="grid xl:grid-cols-3 xl:gap-6">
            <div className={divStyle}>
              <label for="countries" class={labelStyle}>Trạng thái sản phẩm</label>
              <select id="countries" class={inputStyle}>
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>
            <div className={divStyle}>
              <label for="email" class={labelStyle}>CPU</label>
              <input type="email" name="floating_email" className={inputStyle} placeholder=" " />
            </div>
            <div className={divStyle}>
              <label for="email" class={labelStyle}>Card đồ họa</label>
              <input type="email" name="floating_email" className={inputStyle} placeholder=" " />
            </div>
          </div>
          {/* Kết thúc trạng thái sản phẩm, CPU, CARD đồ họa */}
          {/* ------------------------------------- */}
          {/* Độ phân giải, ổ cứng, hệ điều hành */}
          <div className="grid xl:grid-cols-3 xl:gap-6">
            <div className={divStyle}>
              <label for="countries" class={labelStyle}>Độ phân giải</label>
              <select id="countries" class={inputStyle}>
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>
            <div className={divStyle}>
              <label for="email" class={labelStyle}>Ổ cứng</label>
              <select id="countries" class={inputStyle}>
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>
            <div className={divStyle}>
              <label for="email" class={labelStyle}>Hệ điều hành</label>
              <select id="countries" class={inputStyle}>
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>
          </div>
          {/* Kết thúc độ phân giải, ổ cứng, hệ điều hành */}
          {/* Màn hình, kích thước, trọng lượng */}
          <div className="grid xl:grid-cols-3 xl:gap-6">
            <div className={divStyle}>
              <label for="countries" class={labelStyle}>Màn hình</label>
              <select id="countries" class={inputStyle}>
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>
            <div className={divStyle}>
              <label for="email" class={labelStyle}>Kích thước</label>
              <select id="countries" class={inputStyle}>
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>
            <div className={divStyle}>
              <label for="email" class={labelStyle}>Trọng lượng</label>
              <select id="countries" class={inputStyle}>
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>
            <div className={divStyle}>

              <label class={labelStyle} for="multiple_files">Upload nhiều ảnh</label>
              <input class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer  focus:outline-none " id="multiple_files" type="file" multiple />

            </div>
          </div>
          {/* Kết thúc Màn hình, kích thước, trọng lượng  */}
          {/* Mô tả thêm */}
          <div className={divStyle}>

            <label for="message" class={labelStyle}>Mô tả thêm</label>
            <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Your message..."></textarea>

          </div>
          {/* Khu vực nút bấm */}
          <div className="flex justify-center">
            {/* Quan trọng, type = submit */}
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Thêm</button>
            <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ml-3 ">Kiểm tra</button>
          </div>
        </form>

      </div>
      <script src="./node_modules/flowbite/dist/flowbite.js"></script>
    </div>
  );


}