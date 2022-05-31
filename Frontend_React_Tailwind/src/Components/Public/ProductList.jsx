import TrangChuApi from "../../Api/Public/TrangChuApi"
import { useState, useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import React from "react";


// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function ProductList() {
  const [state, setState] = useState({})
  let query = useQuery();



  useEffect(() => {
    //Đọc query parameter category
    if (query.get("category")) {
      TrangChuApi.getSanPhamByCategory(query.get("category")).then(res => {
        setState({
          data: res.data,
          done: true
        })
          .catch(err => {
            setState({
              error: err,
              done: false
            })
          })
      })
    }
    console.log("Category ID is " + query.get("category"));
    // Đọc query parameter brand
    if (query.get("brand")) {
      TrangChuApi.getSanPhamByBrand(query.get("brand")).then(res => {
        setState({
          data: res.data,
          done: true
        })
        .catch(err => {
          setState({
            error:err,
            done:false
          })
        })
      })
    }

    if (query == "" || query.get("searchKey").trim() == "" || query.get("searchKey").contains('+')) {
      TrangChuApi.getSanPhamByDefault(0).then((res) => {
        setState({
          data: res.data.ketQua,
          done: true
        })
      })
        .catch(err => {
          setState({
            error: err,
            done: false
          })
        })
    }

    if (query.get("searchKey")){
      TrangChuApi.getSanPhamBySearchKey(query.get("searchKey")).then((res) => {
        setState({
          data: res.data.ketQua,
          done:true
        })
      })
      .catch(err => {
        setState({
          error:err,
          done:false
        })
      })
    }
  }, [])
  console.log(state.data);
  if (state.done)
    return (
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {state.data.map((item) =>
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a className="block relative h-48 rounded overflow-hidden" href={`/public/san-pham/${item.maSanPham}`}>
                  <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={item.anhSanPham} />
                </a>

                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
                  <p className="mt-1">$16.00</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    )
}