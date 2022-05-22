import axios from "axios"
import { useState } from "react";
import { useForm } from 'react-hook-form'
export default function UploadFileTest() {

    const [previewPicture, setPreviewPicture] = useState(null);

    const {
        register, // Đăng ký input vô react hookform
        handleSubmit, //Xử lý khi submit form
        formState: { errors } // Theo dõi người dùng tương tác form và xuât ra element báo lỗi
    } = useForm(
        {
            mode: 'onChange',
            reValidateMode: 'onChange',
        }
    ); // Na ná cách dùng useState

    // Xử lý submit ảnh
    const onSubmit = (data) => {
        console.log(data)
        // First file
        const file = data
        // File type to validate
        const fileType = file['image'][0]['type']

        // Check fileType is image/* or not
        alert(fileType)
        if (fileType.split("/")[0] == "image") {
            // Xác nhận đây là ảnh hợp lệ
            alert("This is valid image")
            //Lấy Dữ liệu nhị phân của hình ảnh
            const fileData = file['image'][0]
            // Tạo trình đọc file
            const fileReader = new FileReader()
            // Đọc file nhị phân ấy như một url
            fileReader.readAsDataURL(fileData)
            // Khi fileReader đọc file thành công (onLoad)
            fileReader.onload = () => {
                // Lấy url của file
                const url = fileReader.result
                // Đưa url ảnh vào state của react
                setPreviewPicture(url)
            }

        } else {
            alert("This is not valid image")
        }
    }


    return (
        <div>
            <form className="" onSubmit={handleSubmit(onSubmit)} encType="multipart-form">

                <label class="block mb-2 text-sm font-medium text-gray-900
                 " for="multiple_files">Upload multiple files</label>
                <input {...register("image", {
                    require: true,
                })}

                    class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer
                   " id="multiple_files" type="file" multiple="" />
                <button className="bg-slate-400 border-2 rounded-lg block  text-sm text-gray-900 rounded-lg border-gray-300 "
                    type="submit">Thêm ảnh</button>
            </form>
            {/* Preview picture */}
            {previewPicture != null ?
                <img src={previewPicture}/> : <p>Ảnh chưa upload</p>
            }
  
        </div>
    )

}
