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
    <div className="flex">
      <Sidebar />
      <div className="h-screen flex-1 p-7">
        <div class="flex items-center"><h1 class="inline-block text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight 00">Thêm sản phẩm mới</h1></div>
        {/*  Chế độ onSubmit sẽ là HandleSubmit */}
        <form onSubmit={handleSubmit(onSubmit)}
          className={formtyle}>
          {/* Input tên sản phẩm */}
          <div className="grid xl:grid-cols-3 xl:gap-6">
            <div className={divStyle}>
              <label class={labelStyle}>Tên sản phẩm</label>
              <input
                className={inputStyle}
                // Đăng ký vào react hook form
                {...register("tenSanPham", {
                  // Các ràng buộc validation
                  required: true, // Bắt buộc
                  maxLength: 50, // Độ dài tối đa
                  minLength: 10,
                })}

              />
              {/* // Hình thức hiển thị lỗi (dựa theo formState)
           //  lỗi ở tenSanPham là required  thì hiện thẻ p thông báo lỗi */}
              {errors?.tenSanPham?.type === "required" && <p className={errorStyle}>Tên sản phẩm bắt buộc nhập</p>}
              {errors?.tenSanPham?.type === "maxLength" && (
                <p className={errorStyle}>Tên sản phẩm không được vượt quá 50 kí tự</p>
              )}
              {errors?.tenSanPham?.type === "minLength" && <p className={errorStyle}>Tên sản phẩm ít nhất phải 10 kí tự</p>}
            </div>

            {/* Hãng sản xuất */}
            <div className={divStyle}>
              <label class={labelStyle}>Hãng sản xuất</label>
              {/* Đăng ký react hook form */}
              <select {...register("maHangSX", {
                //Các ràng buộc validation
                required: true,
                valueAsNumber: true,
                min: 0
              })}
                class={inputStyle}>
                {maHangSXOption.map((item) =>
                  <option value={item.maHangSx}>{item.tenHangSx}</option>
                )}
              </select>
              {errors?.maHangSX?.type === "required" && <p className={errorStyle}>Hãng sản xuất băt buộc chọn</p>}
              {errors?.maHangSX?.type === "valueAsNumber" && <p className={errorStyle}>Cảnh báo, bạn đang cố sữa code value khác kiểu số</p>}
              {errors?.maHangSX?.type === "min" && <p className={errorStyle}>Cảnh báo, bạn đang cố sữa code, min cannot below 0</p>}
            </div>

            {/* Loại sản phẩm */}
            <div className={divStyle}>
              <label class={labelStyle}>Loại sản phẩm</label>
              <select {...register("maLoaiSp", {
                required: true,
                valueAsNumber: true,
                min: 0
              })}
                class={inputStyle}>
                {maLoaiSpOption.map((item) =>
                  <option value={item.maLoaiSp}>{item.tenLoaiSp}</option>
                )}
              </select>
              {errors?.maLoaiSp?.type === "required" && <p className={errorStyle}>Loại sản phẩm bắt buộc chọn</p>}
              {errors?.maLoaiSp?.type === "valueAsNumber" && <p className={errorStyle}>Cảnh báo, bạn đang cố sữa code value khác kiểu số</p>}
              {errors?.maLoaiSp?.type === "min" && <p className={errorStyle}>Cảnh báo, bạn đang cố sữa code, min cannot below 0</p>}
            </div>
          </div>

          {/* Trạng thái sản phẩm,CPU, CARD đồ họa */}
          {/* Trạng thái sản phẩm */}
          <div className="grid xl:grid-cols-3 xl:gap-6">
            {/* CPU */}
            <div className={divStyle}>
              <label class={labelStyle}>CPU</label>
              <input
                {...register("cpu", {
                  maxLength: 40
                })}
                className={inputStyle} />
              {errors?.cpu?.type === "maxLength" && <p className={errorStyle}>Độ dài của tên CPU không được vượt quá 40 ký tự</p>}
            </div>

            {/* Card đồ họa */}
            <div className={divStyle}>
              <label class={labelStyle}>Card đồ họa</label>
              <input
                {...register("cardDoHoa", {
                  maxLength: 40
                })}
                className={inputStyle} />
              {errors?.cardDoHoa?.type === "maxLength" && <p className={errorStyle}>Độ dài của tên card đồ họa không được vượt quá 40 ký tự</p>}
            </div>
          </div>
          {/* Kết thúc trạng thái sản phẩm, CPU, CARD đồ họa */}
          {/* ------------------------------------- */}
          {/* Độ phân giải, ổ cứng, hệ điều hành */}
          {/* Độ phân giải */}
          <div className="grid xl:grid-cols-3 xl:gap-6">
            <div className={divStyle}>
              <label class={labelStyle}>Độ phân giải</label>
              <select
                {...register("doPhanGiai", {
                  maxLength: 10,
                })}
                class={inputStyle}>
                {doPhanGiaiOption.map((item) =>
                  <option value={item}>{item}</option>
                )}
              </select>
              {errors?.doPhanGiai?.type === "maxLength" && <p className={errorStyle}>Số lượng ký tự không được vượt quá 10</p>}
            </div>

            <div className={divStyle}>
              <label class={labelStyle}>Ổ cứng</label>
              <select
                {...register("oCung", {
                  valueAsNumber: true
                })}
                class={inputStyle}>
                {oCungOption.map((item) =>
                  <option value={item}>{item} GB</option>
                )}
              </select>
              {errors?.oCung?.type === "valueAsNumber" && <p className={errorStyle}>Cảnh báo Bạn đang cố chỉnh code cho value của select không phải là kiểu số</p>}
            </div>
            <div className={divStyle}>
              <label class={labelStyle}>Hệ điều hành</label>
              <select
                {...register("heDieuHanh", {
                  maxLength: 20
                })}
                class={inputStyle}>
                {heDieuHanhOption.map((item) =>
                  <option value={item}>{item}</option>
                )}
              </select>
              {errors?.heDieuHanh?.type === "maxLength" && <p className={errorStyle}>Độ dài của tên hệ điều hành không vượt quá 20</p>}
            </div>
          </div>
          {/* Kết thúc độ phân giải, ổ cứng, hệ điều hành */}
          {/* Màn hình, kích thước, trọng lượng */}
          <div className="grid xl:grid-cols-3 xl:gap-6">
            <div className={divStyle}>
              <label class={labelStyle}>Màn hình</label>
              <select
                {...register("manHinh", {
                  min: 11.6
                })}
                class={inputStyle}>
                {manHinhOption.map((item) =>
                  <option value={item}>{item}</option>
                )}
              </select>
              {errors?.manHinh?.type === "min" && <p className={errorStyle}> Độ phân giải màn hình không được nhỏ hơn 11.6 inch</p>}
            </div>
            <div className={divStyle}>
              <label class={labelStyle}>Kích thước</label>
              <input {...register("kichThuoc", {
                maxLength: 50
              })}
                className={inputStyle} placeholder=""></input>
              {errors?.kichThuoc?.type === "maxLength" && <p className={errorStyle}>Mô tả về kích thước không được vượt quá 100 kí tự</p>}
            </div>
            <div className={divStyle}>
              <label class={labelStyle}>Trọng lượng</label>
              <input
                {...register("trongLuong", {
                  required: true,
                  valueAsNumber: true,
                  min:0.1,
                  max: 6
                })}
                className={inputStyle} type="number" />
              {errors?.trongLuong?.type === "required" && <p className={errorStyle}> Trọng lượng không được để trống</p>}
              {errors?.trongLuong?.type === "valueAsNumber" && <p className={errorStyle}> Trọng lượng phải là kiểu số</p>}
              {errors?.trongLuong?.type === "max" && <p className={errorStyle}> Trọng lượng không được vượt quá 6 kg</p>}
              {errors?.trongLuong?.type === "min" && <p className={errorStyle}> Trọng lượng phải từ 0.1 kg trở lên</p>}
            </div>
            {/* Dung lượng RAM */}
            <div className={divStyle}>
              <label class={labelStyle}>Dung lượng RAM</label>
              <select
                {...register("ram", {
                  max: 32
                })}
                className={inputStyle}>
                {dungLuongRAMOption.map((item) =>
                  <option value={item}>{item} GB</option>
                )}
              </select>
              {errors?.ram?.type === "max" && <p className={errorStyle}> Dung lượng ram tối đa không vượt quá 32 GB</p>}
            </div>
            {/* Giá */}
            <div className={divStyle}>
              <label className={labelStyle}> Giá nhập vào</label>
              <input
              type="number"
                className={inputStyle}
                {...register("gia", {
                  valueAsNumber:true,
                  required: true,
                  min: 101000,
                  max: 1000000000
                })} />
              {errors?.gia?.type === "required" && <p className={errorStyle}> Giá nhập vào không được để trống </p>}
              {errors?.gia?.type === "valueAsNumber" && <p className={errorStyle}> Giá nhập vào phải là kiểu số </p>}
              {errors?.gia?.type === "min" && <p className={errorStyle}> Giá nhập vào không được dưới 101.000 </p>}
              {errors?.gia?.type === "max" && <p className={errorStyle}> Giá nhập vào không được vượt quá 1.000.000.000</p>}
            </div>


            {/* Chiết khấu */}
            <div className={divStyle}>
              <label class={labelStyle}>Chiết khấu %</label>
              <input {...register("chietKhau", {
                required: true,
                min: 1,
                max: 100
              })}
                className={inputStyle} type="number" />
              {errors?.chietKhau?.type === "required" && <p className={errorStyle}> Chiết khấu bắt buộc phải nhập </p>}
              {errors?.chietKhau?.type === "min" && <p className={errorStyle}> Chiết khấu không được dưới 1% </p>}
              {errors?.chietKhau?.type === "max" && <p className={errorStyle}>Chiết khấu không được vượt quá 100% </p>}
            </div>
          </div>
          {/* Kết thúc chiết khấu */}

          {/* Số lượng */}
          <div className={divStyle}>
            <label class={labelStyle}>Số lượng</label>
            <input {...register("soLuong", {
              required: true,
              min: 1,
              max: 1000
            })}
              className={inputStyle} type="number" />
            {errors?.soLuong?.type === "required" && <p className={errorStyle}> Số lượng bắt buộc phải nhập </p>}
            {errors?.soLuong?.type === "min" && <p className={errorStyle}> Số lượng không được dưới 1 </p>}
            {errors?.soLuong?.type === "max" && <p className={errorStyle}>Số lượng không được vượt quá 1000 </p>}
            {errors?.soLuong?.type === "valueAsNumber" && <p className={errorStyle}>Không phải kiểu số</p>}
          </div>
          {/* Số lượng */}


          {/* Kết thúc Màn hình, kích thước, trọng lượng ,ram */}
          {/* Mô tả thêm */}
          <div className={divStyle}>

            <label for="message" class={labelStyle}>Mô tả thêm</label>
            <textarea
              {...register("moTaThem", {
                required: true,
                minLength: 20,
                maxLength: 1000
              })}
              rows="4"
              className={inputStyle}
              placeholder="Your message..."></textarea>
            {errors?.moTaThem?.type === "required" && <p className={errorStyle}> Mô tả thêm bắt buộc phải nhập</p>}
            {errors?.moTaThem?.type === "minLength" && <p className={errorStyle}> Bắt buộc phải nhập từ 20 kí tự trở lên tính tluoon khoảng trống</p>}
            {errors?.moTaThem?.type === "maxLength" && <p className={errorStyle}> Mô tả thêm không được vượt quá 1000 ký tự</p>}

          </div>
          {/* Khu vực upload ảnh */}
          <div
            {...register("image", {
              require: true,
            })}

            class="relative z-0 w-full mb-6 group"><label for="message" class="block mb-2 text-sm font-medium text-gray-900">Upload ảnh</label>
            <input onChange={previewImage} name="image"
              class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer
                  " id="multiple_files" type="file" multiple />
            <div class="flex flex-wrap -mx-2 overflow-hidden">
              {/* Khu vực preview ảnh */}
              {previewPicture.length > 0 ?
                Array.from({ length: previewPicture.length }, (val, ind) =>
                  <div className="my-2 px-2 w-1/5 overflow-hidden">
                    <img className="lg:h-48 md:h-36  object-cover object-center" src={previewPicture[ind]} alt="Hi" />
                  </div>
                )
                : <p className={errorStyle}>chưa có ảnh</p>}
            </div>
          </div>
          {/* Khu vực nút bấm */}
          <div className="flex justify-center">
            {/* Quan trọng, type = submit */}
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
            focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Thêm</button>
          </div>
        </form>

      </div >
      <script src="./node_modules/flowbite/dist/flowbite.js"></script>
    </div >
  );


}
