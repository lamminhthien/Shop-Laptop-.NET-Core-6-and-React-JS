
import { useParams, useRouteMatch } from "react-router-dom";
import NotFoundPage from "../../Components/404ErrorPage";
import Sidebar from "../../Components/Sidebar";
export default function ChiTietSanPham() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();
  let { path, url } = useRouteMatch();

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
      mo_ta_them: "123"
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
        <div>
          <table className="table-auto">
            {data[id].cpu ?
              <tr>
                <th className="border-collapse bg-slate-200">
                  Vi xử lý
                </th>
                <td className="pl-3 bg-slate-100">
                  {data[id].cpu}
                </td>
              </tr>
              : ""}

            {data[id].he_dieu_hanh ?
              <tr>
                <th className="border-collapse bg-slate-200">
                  Hệ điều hành
                </th>
                <td className="pl-3 bg-slate-100">
                  {data[id].he_dieu_hanh}
                </td>
              </tr>
              : ""}

            {data[id].kich_thuoc ?
              <tr>
                <th className="border-collapse bg-slate-200">
                  Kích thước
                </th>
                <td className="pl-3 bg-slate-100">
                  {data[id].kich_thuoc}
                </td>
              </tr>
              : ""}

            {data[id].mo_ta_them ?
              <tr>
                <th className="border-collapse bg-slate-200">
                  Mô tả thêm
                </th>
                <td className="pl-3 bg-slate-100">
                  {data[id].mo_ta_them}
                </td>
              </tr>
              : ""}

            {data[id].o_cung ?
              <tr>
                <th className="border-collapse bg-slate-200">
                  Ổ cứng
                </th>
                <td className="pl-3 bg-slate-100">
                  {data[id].o_cung}
                </td>
              </tr>
              : ""}

            {data[id].pin ?
              <tr>
                <th className="border-collapse bg-slate-200">
                  PIN
                </th>
                <td className="pl-3 bg-slate-100">
                  {data[id].pin}
                </td>
              </tr>
              : ""}

            {data[id].thiet_ke ?
              <tr>
                <th className="border-collapse bg-slate-200">
                  PIN
                </th>
                <td className="pl-3 bg-slate-100">
                  {data[id].thiet_ke}
                </td>
              </tr>
              : ""}



          </table>
        </div>
      </div>

    </div>
  );


}