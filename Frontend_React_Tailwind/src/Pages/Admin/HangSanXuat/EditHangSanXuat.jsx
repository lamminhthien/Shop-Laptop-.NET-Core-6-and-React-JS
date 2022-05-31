import Sidebar from "../../../Components/Admin/Sidebar";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useState, useEffect } from "react"
import HangSanXuatApi from "../../../Api/HangSanXuat/HangSanXuatApi";

export default function EditHangSanXuat() {
    // the dynamic pieces of the URL.
    let { id } = useParams();
    const [state, setState] = useState({})
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm(
        {
            mode: 'onChange',
            reValidateMode: 'onChange',
        }
    ); // Na ná cách dùng useState  


 useEffect(() => {
    HangSanXuatApi.getSingleHangSanXuat(id).then( (res) => {
        setState({
            data: res.data,
            done: true
        });
        setValue("tenHangSx",res.data[0].tenHangSx)
        
    })
        .catch(err => {
            console.log(err);
        })
}, [])

    // if (state.done) console.log(state.data[0].tenHangSx);
    console.log(state);

    const errorStyle = `before:content-['⚠'] mt-2 text-sm text-red-600 `
    // Xử lý khi submit form
    const onSubmit = (data) => {
        // Đổi tên loại sản phẩm
        if (data.tenHangSx !== undefined) {
            HangSanXuatApi.editNameHangSanXuat(id,data.tenHangSx)
        } 
        if (data.image !== undefined) {
            HangSanXuatApi.editNameHangSanXuat(id,data.image[0])
        }
        alert(JSON.stringify(data));
    };

    if (state.done)
    {
        return (
            <>
                <div className="flex">
                    <Sidebar />
                    <div className="h-screen flex-1 p-7">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div class="mb-6">
                                <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 ">Tên loại sản phẩm</label>
                                <input type="text" id="large-input"
                                    class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg
                                bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 "
                                    {...register("tenHangSx", {
                                        required: true,
                                        minLength: 10,
                                        maxLength: 50
                                    })}
                                />
                                {errors?.tenHangSx?.type === "required" && <p className={errorStyle}>Tên sản phẩm bắt buộc nhập</p>}
                                {errors?.tenHangSx?.type === "minLength" && <p className={errorStyle}>Tên sản phẩm tối thiểu 10 kí tự</p>}
                                {errors?.tenHangSx?.type === "maxLength" && <p className={errorStyle}>Tên sản phẩm tối đa 50 kí tự</p>}
                            </div>
                            <div className="mb-6">
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="user_avatar">Ảnh</label>
                                <img className="block mb-2 w-40 h-40" src={state.data[0].anhMinhHoa} alt={state.data[0].tenHangSx} />
                            </div>
                            <div className="mb-6">
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="user_avatar">Đổi ảnh mới</label>
                                <input {...register("image", {
                                    required: false
                                })}
                                    class="block w-full text-sm text-gray-900 border border-gray-300 
                            rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none 
                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                                {errors?.image?.type === "required" && <p className={errorStyle}>Ảnh bắt buộc chọn</p>}

                            </div>
                            <div className="flex justify-center">
                                {/* Quan trọng, type = submit */}
                                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                                                 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Sữa</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
        
}