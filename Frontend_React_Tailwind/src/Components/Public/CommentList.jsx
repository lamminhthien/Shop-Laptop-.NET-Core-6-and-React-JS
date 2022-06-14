import { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

export default function CommentList() {
  const [listBinhLuan,setListBinhLuan] = useState([])
  const [state,setState] = useState(false)
  let { id } = useParams();
  useEffect(()=>{
    axios.get(`https://localhost:7216/api/TrangChiTietSanPham/ListBinhLuanSanPham?id=${id}`).then((res)=>{
      console.log("%cThis is a green text", "color:green");
      setListBinhLuan(res.data);
      setState(true)
    }).catch(err => {
      console.log("%cThis is a red text", "color:red");
    })
  },[])
  const renderData = () => {
    console.log(listBinhLuan);
    if (state === true) {
    return <div>
      {listBinhLuan.map(item => 
        <div className="div">
          <p>{item.tenKhachHang}</p>
          <p>{item.noiDung}</p>
        </div>
        )}
    </div>
     
    } else return (
      <>No data</>
    )
  }

  return (
    renderData()
  );
}
