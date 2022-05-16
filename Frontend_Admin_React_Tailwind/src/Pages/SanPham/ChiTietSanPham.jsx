
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
    "https://i.ytimg.com/vi/DRQ6FbvjThY/maxresdefault.jpg",
    "https://i.ytimg.com/vi/ig_XPIkcKrQ/maxresdefault.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtP42FIsG8O16Hla0Dc259QAFn9WTGFWMLpg&usqp=CAU"
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
      mo_ta_them: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
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
        <h3>ID: {id}</h3>
        <h4>Current path = {path}</h4>
        <h4>Current url = {url}</h4>
        <div class="bg-stripes-violet mt-2 flex gap-4 rounded-lg font-mono text-sm font-bold leading-6 text-white">
          <div class="h-17  w-1/3 flex-none items-center justify-center rounded-lg bg-violet-300 p-4  dark:text-violet-400">

            <div id="default-carousel" class="relative" data-carousel="static">

              <div class="overflow-hidden relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96">

                <div class="duration-700 ease-in-out absolute inset-0 transition-all transform translate-x-0 z-20" data-carousel-item="">
                  <span class="absolute top-1/2 left-1/2 text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 sm:text-3xl dark:text-gray-800">First Slide</span>
                  <img src={imgSRC[0]} class="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2" alt="..." />
                </div>

                <div class="duration-700 ease-in-out absolute inset-0 transition-all transform translate-x-full z-10" data-carousel-item="">
                  <img src={imgSRC[1]} class="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2" alt="..." />
                </div>

                <div class="duration-700 ease-in-out absolute inset-0 transition-all transform -translate-x-full z-10" data-carousel-item="">
                  <img src={imgSRC[2]} class="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2" alt="..." />
                </div>
              </div>

              <div class="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
                <button type="button" class="w-3 h-3 rounded-full bg-white dark:bg-gray-800" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                <button type="button" class="w-3 h-3 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                <button type="button" class="w-3 h-3 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
              </div>

              <button type="button" class="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev="">
                <span class="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                  <span class="hidden">Previous</span>
                </span>
              </button>
              <button type="button" class="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-next="">
                <span class="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                  <span class="hidden">Next</span>
                </span>
              </button>
            </div>

          </div>
          <div class="flex w-2/3 flex-auto items-center justify-center rounded-lg bg-violet-500 p-4 shadow-lg">
            <table className=" text-sm text-left text-gray-500 dark:text-gray-400">
              {data[id].cpu ?
                <tr>
                  <th className="border-collapse bg-slate-200 px-6 py-3">
                    Vi xử lý
                  </th>
                  <td className="pl-3 bg-slate-100 px-6 py-3">
                    {data[id].cpu}
                  </td>
                </tr>
                : ""}

              {data[id].he_dieu_hanh ?
                <tr>
                  <th className="border-collapse bg-slate-200 px-6 py-3">
                    Hệ điều hành
                  </th>
                  <td className="pl-3 bg-slate-100 px-6 py-3">
                    {data[id].he_dieu_hanh}
                  </td>
                </tr>
                : ""}

              {data[id].kich_thuoc ?
                <tr>
                  <th className="border-collapse bg-slate-200 px-6 py-3">
                    Kích thước
                  </th>
                  <td className="pl-3 bg-slate-100 px-6 py-3">
                    {data[id].kich_thuoc}
                  </td>
                </tr>
                : ""}

              {data[id].mo_ta_them ?
                <tr>
                  <th className="border-collapse bg-slate-200 px-6 py-3">
                    Mô tả thêm
                  </th>
                  <td className="pl-3 bg-slate-100 px-6 py-3">
                    {data[id].mo_ta_them}
                  </td>
                </tr>
                : ""}

              {data[id].o_cung ?
                <tr>
                  <th className="border-collapse bg-slate-200 px-6 py-3">
                    Ổ cứng
                  </th>
                  <td className="pl-3 bg-slate-100 px-6 py-3">
                    {data[id].o_cung}
                  </td>
                </tr>
                : ""}

              {data[id].pin ?
                <tr>
                  <th className="border-collapse bg-slate-200 px-6 py-3">
                    PIN
                  </th>
                  <td className="pl-3 bg-slate-100 px-6 py-3">
                    {data[id].pin}
                  </td>
                </tr>
                : ""}

              {data[id].thiet_ke ?
                <tr>
                  <th className="border-collapse bg-slate-200 px-6 py-3">
                    Th
                  </th>
                  <td className="pl-3 bg-slate-100 px-6 py-3">
                    {data[id].thiet_ke}
                  </td>
                </tr>
                : ""}



            </table>
          </div>
        </div>


      </div>
      <script src="./node_modules/flowbite/dist/flowbite.js"></script>
    </div>
  );


}