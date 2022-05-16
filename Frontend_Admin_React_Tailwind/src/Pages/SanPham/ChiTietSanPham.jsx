
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



        <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex">
          {/* Cho một khung ảnh, dùng javascript để đổi ảnh */}
          <div className=" object-scale-down self-center ">
            <img  src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1024&amp;h=1280&amp;q=80"/>
          </div>
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
      <script src="../../node_modules/flowbite/dist/flowbite.js"></script>          
    </div>
  );


}