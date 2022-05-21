import { useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";


export default function XoaSanPham() {
  // the dynamic pieces of the URL.
  let { id } = useParams();
  alert(id)

    axios.delete(`https://localhost:7216/api/QuanLySanPham/XoaSanPham/${id}`)
    .then(
        () => {
            alert("Delete complete")
        }
    )
    .catch(
        () => {
            alert("Error" + id)
        }
    )
}