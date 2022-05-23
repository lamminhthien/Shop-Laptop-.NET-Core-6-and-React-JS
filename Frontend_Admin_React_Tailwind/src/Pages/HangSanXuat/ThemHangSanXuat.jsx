import Sidebar from "../../Components/Sidebar";
import axios from "axios";
import { set, useForm } from "react-hook-form";
import { useState, useEffect } from "react";

export default function ThemHangSanXuat() {
    const [previewPicture, setPreviewPicture] = useState();
    const [imageFormData, setImageFormData] = useState([])

    // Tailwind CSS Reuse style 
    const inputStyle = `bg-gray-50 border border-gray-300
 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
 focus:border-blue-500 block w-full p-2.5`
    const labelStyle = `block mb-2 text-sm font-medium text-gray-900`
    const errorStyle = `before:content-['⚠'] mt-2 text-sm text-red-600 `
    const divStyle = `relative z-0 w-full mb-6 group`
    const formStyle = `mt-2 rounded-xl bg-gradient-to-r bg-white  border 
border-gray-200  p-2 sm:p-6  drop-shadow-2xl overscroll-contain`

const previewLogo = (e) => {
    const fileReader = new FileReader();
    const imageData = e.target.files[0]
    fileReader.readAsDataURL(imageData);
    fileReader.onload = () => {
        setPreviewPicture(fileReader.result)
    }
}

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

    return (
        <div className="flex">
            <Sidebar />
            <div className="h-screen flex-1 p-7">
                <div className="h-screen flex-1 p-7">
                    <div class="flex items-center"><h1 class="inline-block text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight 00">Thêm hãng sản xuất mới</h1></div>
                    <form className={formStyle}>
                        <div className="grid xl:grid-cols-2 xl:gap-6">
                            <div className={divStyle}>
                                <label className={labelStyle}>Tên loại sản phẩm</label>
                                <input className={inputStyle} 
                                    {...register("")}
                                />
                            </div>
                            <div className={divStyle}>
                                <label className={labelStyle}>Ảnh minh họa</label>
                                <input class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer
 " id="multiple_files" type="file"
                                />
                            </div>
                        </div>
                        <div className="grid xl:grid-cols-3 xl:gap-6">
                            <div className={divStyle}>

                            </div>
                            <div className={divStyle}>
                                <label className={`${labelStyle} mr-20 text-center`}>Xem trước ảnh</label>
                                {previewPicture == null ? "Chưa có ảnh" :
                                    <img src={previewPicture} alt="123" />
                                }
                            </div>
                            <div className={divStyle}>

                            </div>
                        </div>

                        {/* Preview ảnh trước */}

                    </form>

                </div>
            </div>

        </div>


    )
}