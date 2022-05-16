
import { useParams, useRouteMatch } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";
export default function ChiTietSanPham() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();
  let { path, url } = useRouteMatch();

  return (
    <div className="flex">
      <Sidebar />
      <div className="h-screen flex-1 p-7">
        <h3>ID: {id}</h3>
        <h4>Current path = {path}</h4>
        <h4>Current url = {url}</h4>
      </div>

    </div>
  );


}