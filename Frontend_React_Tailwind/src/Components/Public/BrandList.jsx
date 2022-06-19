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
                 <h1 className="text-center text-fuchsia-500 my-5  text-3xl font-semibold">Thương hiệu</h1>
                <div className="brand-list">
                    <div href="#" class="flex flex-wrap place-content-center gap-5">
                        {state.data !== null ? state.data.map((item) =>
                            <a href={`?brand=${item.maHangSanXuat}`}>
                                <div className="flex flex h-[100px] w-[100px] transform flex-col flex-wrap flex-wrap justify-center rounded-xl border-0 border-2 border-indigo-600 bg-white p-2 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                                    {/* Image */}
                                    <img className="w-36 rounded-xl object-cover" src={item.logo} alt={item.tenHangSanXuat} />
                                    {/* CTA */}
                                </div>
                            </a>
                        ) : <p>Đang load data</p>}
                    </div>
                </div>
            </div>
        )

};
