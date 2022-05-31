import Sidebar from "../../../Components/Admin/Sidebar";
import { useParams, useRouteMatch } from "react-router-dom";
import { useForm } from "react-hook-form";
import LoaiSanPhamApi from "../../../Api/LoaiSanPham/LoaiSanPhamApi";
import { useState, useEffect } from "react"

export default function EditLoaiSanPham() {
    // the dynamic pieces of the URL.
    let { id } = useParams();
    const [state, setState] = useState({})

    const {
        register, // Đăng ký input vô react hookform
        handleSubmit, //Xử lý khi submit form
        watch, // Theo dõi và báo lỗi
        setValue, // Gán sẵn giá trị cho từng input trong form
        formState: { errors } // Theo dõi người dùng tương tác form và xuât ra element báo lỗi
    } = useForm(
        {
            mode: 'onChange',
            reValidateMode: 'onChange',
        }
    ); // Na ná cách dùng useState  


    useEffect(() => {
        LoaiSanPhamApi.getLoaiSanPhamSingle(id).then((res) => {
            setState({
                data: res.data,
                done: true
            });

        })
            .catch(err => {
                setState({
                    error: err,
                    done: false
                })
            })
    }, [])




    if (state.done)
        setValue("tenLoaiSp", state.data[0].tenLoaiSp)
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="h-screen flex-1 p-7">
                    <div class="mb-6">
                        <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 ">Tên loại sản phẩm</label>
                        <input type="text" id="large-input"
                            class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg 
                            bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 "
                            {...register("tenLoaiSp", {
                                required: true,
                                minLength: 10,
                                maxLength: 50
                            })}
                        />
                    </div>
                    <div className="mb-6">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="user_avatar">Ảnh</label>
                        <img className="block mb-2 w-40 h-40" src={state.done ? state.data[0].anhMinhHoa : ""} alt={state.done ? state.data[0].tenLoaiSp : ""} />
                    </div>
                    <div className="mb-6">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="user_avatar">Đổi ảnh mới</label>
                        <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                        <div class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">A profile picture is useful to confirm your are logged into your account</div>
                    </div>

                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sữa</button>
                </div>
            </div>
        </>
    )
}