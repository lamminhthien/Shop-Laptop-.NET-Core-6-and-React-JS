

import NotFoundPage from "../../Components/404ErrorPage";
import Sidebar from "../../Components/Sidebar";
export default function ThemSanPham() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  // img

  return (
    <div className="flex">
      <Sidebar />
      <div className="h-screen flex-1 p-7">
        <div class="flex items-center"><h1 class="inline-block text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight 00">Thêm sản phẩm mới</h1></div>
        <form className="mt-2 rounded-xl bg-gradient-to-r bg-white  border border-gray-200  p-2 sm:p-6  drop-shadow-2xl overscroll-contain">
          <div className="grid xl:grid-cols-3 xl:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tên sản phẩm</label>
              <input type="email" name="floating_email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" " required />
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Hãng sản xuất</label>
              <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Loại sản phẩm</label>
              <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>
          </div>
          {/* Trạng thái sản phẩm,CPU, CARD đồ họa */}
          <div className="grid xl:grid-cols-3 xl:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Trạng thái sản phẩm</label>
              <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">CPU</label>
              <input type="email" name="floating_email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" " required />
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Card đồ họa</label>
              <input type="email" name="floating_email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" " required />
            </div>
          </div>
          {/* Kết thúc trạng thái sản phẩm, CPU, CARD đồ họa */}
          {/* ------------------------------------- */}
          {/* Độ phân giải, ổ cứng, hệ điều hành */}
          <div className="grid xl:grid-cols-3 xl:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Độ phân giải</label>
              <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ổ cứng</label>
              <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hệ điều hành</label>
              <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
            <div className="relative z-0 w-full mb-6 group">
              <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Màn hình</label>
              <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Kích thước</label>
              <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Trọng lượng</label>
              <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>
          </div>
          {/* Kết thúc Màn hình, kích thước, trọng lượng  */}
          {/* Mô tả thêm */}
          <div className="relative z-0 w-full mb-6 group">

            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Mô tả thêm</label>
            <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>

          </div>
          {/* Khu vực nút bấm */}
          <div className="flex justify-center">
          <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Thêm</button>
            <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ml-3 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Kiểm tra</button>
          </div>
        </form>






      </div>
      <script src="./node_modules/flowbite/dist/flowbite.js"></script>
    </div>
  );


}