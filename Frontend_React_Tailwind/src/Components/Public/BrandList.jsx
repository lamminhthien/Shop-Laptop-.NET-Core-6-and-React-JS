import TrangChuApi from "../../Api/Public/TrangChuApi"
import { useState, useEffect } from "react"
export default function BrandList() {
    const [state, setState] = useState({})

    useEffect(() => {
        TrangChuApi.getListHangSanXuat().then((res) => {
            setState({
                data: res.data,
                done: true
            })
        })
            .catch(err => {
                setState({
                    error: err,
                    done: false
                })
            })
    }, [])
    if (state.done)
        return (
            <div>
                 <h1 className="text-center text-fuchsia-500 my-5  text-3xl font-semibold">Hãng sản xuất</h1>
                <div className="">
                    <a href="#" class="flex flex-wrap place-content-center overflow-hidden">
                        {state.data !== null ? state.data.map((item) =>
                            <a href={`?brand=${item.maHangSanXuat}`}>
                                <div className="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
                                    {/* Image */}
                                    <img className="h-40 object-fill rounded-xl h-20 w-40  rounded-xl" src={item.logo} alt />
                                    <div className="p-2">
                                        {/* Heading */}
                                        <h2 className="font-bold text-lg mb-2 ">{item.tenHangSanXuat}</h2>
                                    </div>
                                    {/* CTA */}
                                </div>
                            </a>
                        ) : <p>Đang load data</p>}
                    </a>
                </div>
            </div>
        )

};