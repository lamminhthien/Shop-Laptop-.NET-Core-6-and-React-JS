/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import Sidebar from "../../../Components/Admin/Sidebar";
import axios from 'axios';
// Sử dụng useFrom từ react hook  form
import { set, useForm } from "react-hook-form";
import LoginCreateJWT from '../../Admin/Login/Login';
import validateJWT from '../../../Api/validateJWT'
import {configJWT} from '../../../Api/config.js'
export default function ThemSanPham() {
   const [statusCode, setStatusCode] = useState('');
  // Khởi tạo dữ liệu về hãng sản xuất và danh mục sản phẩm
  const [maHangSXOption, setmaHangSXOption] = useState([])
  const [maLoaiSpOption, setmaLoaiSpOpton] = useState([])
  // Khởi tạo dữ liệu hình ảnh preview và ảnh(form data) để upload lên server
  const [previewPicture, setPreviewPicture] = useState([]);
  const [imageFormData, setImageFormData] = useState([])
  // Tạo dữ liệu cho các option trong thẻ select
  const doPhanGiaiOption = ["HD+", "Full HD", "2K", "4K"]
  const oCungOption = [128, 256, 512, 1024, 2048]
  const heDieuHanhOption = ["Windows 8", "Windows 10", "Window 11", "Mac OS", "Ubuntu"]
  const manHinhOption = [11.6, 12.3, 12.4, 13.3, 13.4, 14, 13, 15.6, 16, 16.1, 16.2, 17, 17.3]
  const dungLuongRAMOption = [4, 6, 8, 12, 16, 32]


  useEffect(() => {
    setValue("tenSanPham", "abc")
    // Get Danh sách các hãng sản xuât
    axios.get("https://localhost:7216/api/QuanLyHangSanXuat/ListHangSanXuat?allRecord=true",configJWT)
      .then((res) => {
        setmaHangSXOption(res.data)
        console.log(res);
      })
      .catch((error) => {
        console.log(error)
      })

    // Get danh sách các danh mục sản phẩm
    axios.get("https://localhost:7216/api/QuanLyDanhMucSanPham/ListDanhMucSanPham?allRecord=true",configJWT)
      .then((res) => {
        setmaLoaiSpOpton(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  const {
    register, // Đăng ký input vô react hookform
    handleSubmit, //Xử lý khi submit form
    watch,
    setValue, // Theo dõi và báo lỗi
    formState: { errors } // Theo dõi người dùng tương tác form và xuât ra element báo lỗi
  } = useForm(
    {
      mode: 'onChange',
      reValidateMode: 'onChange',
    }
  ); // Na ná cách dùng useState

  // Xử lý khi submit form
  const onSubmit = (data) => {
    // Khi nào vượt rào được thì mới xác nhận form hợp lệ
    // và hiện ra dữ liệu json  được chuỗi hóa
    // Đổi giá trị phần trăm chiết khấu sang số thực
    if (previewPicture.length != 0) {
      data.chietKhau = (data.chietKhau) / 100;
      var sanPhamData = Object.assign(data, { trangThaiSp: 1 })

      // Test hiển thị thử JSON data
      alert(JSON.stringify(sanPhamData));
      // Đưa dữ liệu từ form vô axios
      axios.post("https://localhost:7216/api/QuanLySanPham/ThemSanPham", data,configJWT)
        .then((res) => {
          alert("Submit dữ liệu sản phẩm, chi tiết sản phẩm, biến động giá qua api thành công")
          alert(res.data.split(":")[1])
          // Chỉ khi thêm sản phẩm, chi tiết sản phẩm, biến động giá thành công thì mới up ảnh lên database
          // Upload ảnh cho mã sản phẩm mới tương ứng
          uploadImageToBackend(res.data.split(":")[1])
          window.location.href = "/admin/san-pham/1"
        })
        .catch((err) => {
          alert("Submit dữ liệu sản phẩm, chi tiết sản phẩm, biến động giá qua api không thành công")
          if (err.includes("sản phẩm bị trùng")) alert("Tên sản phẩm bị trùng")
        })
    } else {
      alert("Bạn chưa upload ảnh nào");
    }
  }; // your form submit function which will invoke after successful validation

  // Xử lý submit ảnh
  const previewImage = (e) => {
    console.log(e.target.files)
    // // Danh sách ảnh
    const imageList = e.target.files
    // Đếm số ảnh lỗi
    var errorImageCount = 0
    // Clear danh sách ảnh cũ
    setPreviewPicture([])
    // Giới hạn số lượng ảnh tối đa là 4
    var limitPicture = 0
    // Lấy từng ảnh tỏng danh sách ảnh
    for (let index = 0; index < imageList.length; index++) {
      console.log(imageList[index])
      if (limitPicture < 4) {
        if (imageList[index]['type'].split('/')[0] == "image") {
          // Tạo fileReader
          const fileReader = new FileReader()
          // Đọc file data image như là một url
          fileReader.readAsDataURL(imageList[index])
          // Đọc xong file thì đưa vào danh sách ảnh để preview
          fileReader.onload = () => {
            setPreviewPicture((previewPicture) => [
              ...previewPicture, fileReader.result
            ])
          }
          // Lưu ảnh để gửi lên server
          setImageFormData((imageFormData) => [
            ...imageFormData, imageList[index]
          ])

        }
        else {
          errorImageCount = errorImageCount + 1
        }
        limitPicture = limitPicture + 1
      }
    }
    // Cuối cùng đưa danh sách ảnh preview vào array state của react
    console.log("Số ảnh lỗi là" + errorImageCount)
    console.log(previewPicture.length)
  }

  // Upload ảnh lên backend
  const uploadImageToBackend = (id) => {
    // Duyệt từng ảnh của người dùng
    Array.from({ length: imageFormData.length }, (val, ind) => {
      // Tạo form data
      var formData = new FormData()
      // Đưa ảnh vào formdata
      formData.append("image", imageFormData[ind])
      // Đưa id sản phẩm vào formData
      formData.append("id", id)
      // Up formdata chứa ảnh lên server
      axios.post("https://localhost:7216/api/UploadAnh/ThemAnhSanPham", formData,configJWT)
        .then(() => {
          alert(`Đã up ảnh thứ ${ind + 1}  thành công`)
        })
        .catch(() => {
          alert(`Up ảnh thứ ${ind + 1} thất bại`)
        })
    })
  }

  // Watcher theo dõi input theo name property 
  console.log(watch("tenSanPham"));

  // Tailwind CSS Reuse style 
  const inputStyle = `bg-gray-50 border border-gray-300
   text-gray-900 text-sm rounded-lg focus:ring-blue-500 
   focus:border-blue-500 block w-full p-2.5`
  const labelStyle = `block mb-2 text-sm font-medium text-gray-900`
  const errorStyle = `before:content-['⚠'] mt-2 text-sm text-red-600 `
  const divStyle = `relative z-0 w-full mb-6 group`
  const formtyle = `mt-2 rounded-xl bg-gradient-to-r bg-white  border 
  border-gray-200  p-2 sm:p-6  drop-shadow-2xl overscroll-contain`


  validateJWT().catch(err => setStatusCode(err.response.status));
    if (statusCode === 403 ) {
    return <LoginCreateJWT expire="1" />;
  }
  if (statusCode === 401) {
      return <LoginCreateJWT login="0" />
  }
  // Khu vực render giao diện
  return (
   <>Hello
    <>{statusCode}</>
   </>
  );


}