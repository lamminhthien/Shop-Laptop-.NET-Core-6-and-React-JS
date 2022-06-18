import React from 'react';
import Footer from '../../Components/Public/Footer';
import PrimarySearchAppBar from '../../Components/Public/Navbar';
import {useState, useEffect} from 'react';
import axios from 'axios';


export default function TinhTrangDonHang() {
  const [objectDonHang, setObjectDonHang] = useState([]);
  const [state, setState] = useState(false);
  const [error, setError] = useState(false);
  const configJWT = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  };

  useEffect(() => {
    axios
      .get(`https://localhost:7216/api/DonHang/ListDonHang`,configJWT)
      .then(res => {
        console.log('%cThis is a green text', 'color:green');
        setObjectDonHang(res.data);
        setState(true);
      })
      .catch(err => {
        console.log('%cThis is a red text', 'color:red');
        setError(true)
      });
  }, []);
  return (
    <>
      <PrimarySearchAppBar />
      {(state?
      <div>
        <>{JSON.stringify(objectDonHang)}</>
      </div> 
      : <p>Đang chờ load dữ liệu</p>
      )}
            {(error?
      <p>Có lỗi</p> 
      : <></>
      )}

      <Footer />
    </>
  );
}
