import { useParams, useRouteMatch } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import axios from "axios";
import LoginCreateJWT from '../../Admin/Login/Login';

export default function XoaSanPham() {
  // the dynamic pieces of the URL.
  let { id } = useParams();
  const history = useHistory()

    axios.delete(`https://localhost:7216/api/QuanLySanPham/XoaSanPham/${id}`)
    .then(
        () => {
            alert("Delete complete")
            // Điều hướng về lại trang trước
            history.goBack()
        }
    )
    .catch(
        () => {
            alert("Error" + id)
            // Điều hướng về lại trang trước
            history.goBack()
        }
    )
}