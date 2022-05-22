import axios from "axios"
import { useState } from "react";
import { useForm } from 'react-hook-form'
export default function UploadFileTest() {

    const [previewPicture, setPreviewPicture] = useState([]);

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
        // File type to validate
        // Đếm số lượng ảnh
        const fileDataLength = data['image'].length
        console.log("Số lượng tệp đã up load là" + fileDataLength)
        // Danh sách ảnh
        const imageList = data['image']
        // Đếm số ảnh lỗi
        var errorImageCount = 0
        // Lấy từng ảnh tỏng danh sách ảnh
        for (let index = 0; index < imageList.length; index++) {
            console.log(imageList[index])
            if (imageList[index]['type'].split('/')[0] == "image") {
                // Tạo fileReader
                const fileReader = new FileReader()
                // Đọc file data image như là một url
                fileReader.readAsDataURL(imageList[index])
                // Đọc xong file thì đưa vào danh sách ảnh để preview
                fileReader.onload = () => {
                    setPreviewPicture((previewPicture) => [
                        ...previewPicture,fileReader.result
                    ])
                }

            }
            else {
                errorImageCount = errorImageCount + 1
            }
        }
        // Cuối cùng đưa danh sách ảnh preview vào array state của react
        console.log("Số ảnh lỗi là" + errorImageCount)
        console.log(previewPicture.length)
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
                   " id="multiple_files" type="file" multiple />
                <button className="bg-slate-400 border-2 rounded-lg block  text-sm text-gray-900 rounded-lg border-gray-300 "
                    type="submit">Thêm ảnh</button>
            </form>
            {/* Preview picture */}
            {previewPicture.length > 0 ? previewPicture.map((item) => {
               <p>Yes yes</p>
            }):<p>chưa upload ảnh</p>}

        </div>
    )

}
