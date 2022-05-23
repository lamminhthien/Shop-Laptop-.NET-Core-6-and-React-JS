import Sidebar from "../../Components/Sidebar";
import axios from "axios";
import { set, useForm } from "react-hook-form";
import { useState, useEffect } from "react";

export default function ThemLoaiSanPham() {
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
        // Khi nào vượt rào được thì mới xác nhận form hợp lệ
        // và hiện ra dữ liệu json  được chuỗi hóa
        // Test hiển thị thử JSON data
        alert(JSON.stringify(data));
        // Đưa dữ liệu từ form vô axios
        axios.post("https://localhost:7216/api/QuanLySanPham/ThemHangSanXuat", data)
            .then((res) => {
                alert("Submitloại sản phẩm qua api thành công")
                alert(res.data.split(":")[1])
                // Chỉ khi thêm sản phẩm, chi tiết sản phẩm, biến động giá thành công thì mới up ảnh lên database
                // Upload ảnh cho mã sản phẩm mới tương ứng
            })
            .catch((err) => {
                alert("Submitloại sản phẩm qua api không thành công")
                if (err.includes("sản phẩm bị trùng")) alert("Tên sản phẩm bị trùng")
            })
    }; // your form submit function which will invoke after successful validation

    const previewLogo = (e) => {
        const fileReader = new FileReader();
        const imageData = e.target.files[0]
        fileReader.readAsDataURL(imageData);
        fileReader.onload = () => {
            setPreviewPicture(fileReader.result)
        }

    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="h-screen flex-1 p-7">
                <div className="h-screen flex-1 p-7">
                    <div class="flex items-center"><h1 class="inline-block text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight 00">Thêm loại sản phẩm mới</h1></div>
                    <form className={formStyle}>
                        <div className="grid xl:grid-cols-2 xl:gap-6">
                            <div className={divStyle}>
                                <label className={labelStyle}>Tên loại sản phẩm</label>
                                <input className={inputStyle} />
                            </div>
                            <div className={divStyle}>
                                <label className={labelStyle}>Ảnh minh họa</label>
                                <input class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer
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