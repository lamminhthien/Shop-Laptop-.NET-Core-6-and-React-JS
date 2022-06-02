import Sidebar from "../../../Components/Admin/Sidebar";
import axios from "axios";
import { set, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import HangSanXuatApi from "../../../Api/HangSanXuat/HangSanXuatApi";
import LoginCreateJWT from '../../Admin/Login/Login';
export default function ThemHangSanXuat() {
     const [statusCode, setStatusCode] = useState('');
    const [previewPicture, setPreviewPicture] = useState();
    const [imageFormData, setImageFormData] = useState()

    // Tailwind CSS Reuse style 
    const inputStyle = `bg-gray-50 border border-gray-300
 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
 focus:border-blue-500 block w-full p-2.5`
    const labelStyle = `block mb-2 text-sm font-medium text-gray-900`
    const errorStyle = `before:content-['⚠'] mt-2 text-sm text-red-600 `
    const divStyle = `relative z-0 w-full mb-6 group`
    const formStyle = `mt-2 rounded-xl bg-gradient-to-r bg-white  border 
border-gray-200  p-2 sm:p-6  drop-shadow-2xl overscroll-contain`
    const imgStyle = `max-w-sm bg-white rounded-lg border border-gray-200 shadow-md`

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

    const onSubmit = (data) => {
        if (imageFormData) {
            alert(JSON.stringify(data));
            var formData = new FormData();
            formData.append("tenHangSX",data.tenHangSX)
            formData.append("image",imageFormData)
            // Đưa dữ liệu từ form vô axios
            HangSanXuatApi.themHangSanXuat(formData)
                .then((res) => {
                    alert("Submitloại hãng sản xuất qua api thành công")
                    alert(res.data.split(":")[1])
                    // Chỉ khi thêm hãng sản xuất, chi tiết hãng sản xuất, biến động giá thành công thì mới up ảnh lên database
                    // Upload ảnh cho mã hãng sản xuất mới tương ứng
                })
                .catch((err) => {
                    alert("Submitloại hãng sản xuất qua api không thành công")
                    if (err.includes("hãng sản xuất bị trùng")) alert("Tên hãng sản xuất bị trùng")
                })
        }
        else {
            alert("You don't upload picture !!!")
        }
    };

    const previewLogo = (e) => {
        const fileReader = new FileReader();
        const imageData = e.target.files[0]
        // Validate image content type
        if (imageData['type'].split('/')[0] === "image") {
            alert("This is valid picture")
            fileReader.readAsDataURL(imageData);
            fileReader.onload = () => {
                setPreviewPicture(fileReader.result)
            }
            setImageFormData(imageData);

        } else {
            alert("This is not valid picture")
        }
    }
  if (statusCode === 403 ) {
    return <LoginCreateJWT expire="1" />;
  }
  if (statusCode === 401) {
      return <LoginCreateJWT login="0" />
  }
    return (
        <div className="flex">
            <Sidebar />
            <div className="h-screen flex-1 p-7">
                <div className="h-screen flex-1 p-7">
                    <div class="flex items-center"><h1 class="inline-block text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight 00">Thêm hãng sản xuất mới</h1></div>
                    <form className={formStyle} onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid xl:grid-cols-2 xl:gap-6">
                            <div className={divStyle}>
                                <label className={labelStyle}>Tên hãng sản xuất</label>
                                <input
                                    {...register("tenHangSX", {
                                        required: true,
                                        minLength: 5,
                                        maxLength: 50
                                    })}
                                    className={inputStyle} />
                                {errors?.tenHangSX?.type === "required" && <p className={errorStyle}>Tên hãng sản xuất bắt buộc nhập</p>}
                                {errors?.tenHangSX?.type === "minLength" && <p className={errorStyle}>Tên hãng sản xuất tối thiếu 5 kí tự</p>}
                                {errors?.tenHangSX?.type === "maxLength" && <p className={errorStyle}>Tên hãng sản xuất không được vượt quá 50 kí tự</p>}
                            </div>
                            <div className={divStyle}>
                                <label className={labelStyle}>Ảnh minh họa</label>
                                <input 
                                    class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer
 " id="multiple_files" type="file"
                                    onChange={previewLogo}
                                />
                            </div>
                        </div>
                        <div className="grid xl:grid-cols-3 xl:gap-6">
                            <div className={divStyle}>

                            </div>
                            <div className={divStyle}>
                                <label className={`${labelStyle} mr-20 text-center`}>Xem trước ảnh</label>
                                {
                                    previewPicture == null ? 
                                    <p className={errorStyle}>Chưa có ảnh nào</p> :
                                    <img src={previewPicture} alt="123" />
                                }
                            </div>
                            <div className={divStyle}>

                            </div>
                        </div>
                        {/* Preview ảnh trước */}
                        {/* Khu vực nút bấm */}
                        <div className="flex justify-center">
                            {/* Quan trọng, type = submit */}
                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
            focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Thêm</button>
                        </div>

                    </form>

                </div>
            </div>

        </div>


    )
}