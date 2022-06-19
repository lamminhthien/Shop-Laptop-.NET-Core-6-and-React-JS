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
                    <a href="#" class="flex flex-wrap place-content-center gap-5 overflow-x-scroll">
                        {state.data !== null ? state.data.map((item) =>
                            <a href={`?brand=${item.maHangSanXuat}`}>
                                <div className="h-60 flex flex-col  p-2 bg-white rounded-xl border-0  border-indigo-600 border-2
                                transform transition-all hover:-translate-y-2 flex flex-wrap justify-center
                                duration-300 shadow-lg hover:shadow-2xl">
                                    {/* Image */}
                                    <img className="h-40 object-fill rounded-xl " src={item.logo} alt={item.tenHangSanXuat} />
                                    <div className="p-2">
                                        {/* Heading */}
                                        <h2 className="font-bold text-lg mb-2 text-center">{item.tenHangSanXuat}</h2>
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
