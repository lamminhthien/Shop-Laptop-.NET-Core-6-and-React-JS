export default function Paging(props) {
const highLightCurrentPage = () => {
    
}

    return (

        <nav aria-label="Page navigation example">
            <ul class="inline-flex items-center -space-x-px">
                <li>
                    {/* Nếu trang hiện tại là trang đầu thì ẩn nút previous đi */}
                    {props.currentPage == 1 ?
                        <li></li> :
                        <a href={(parseInt(props.currentPage) - 1).toString()}
                            class="
                    block py-2 px-3 ml-0 leading-tight 
                     text-gray-500 bg-white 
                    rounded-l-lg border border-gray-300 hover:bg-gray-100 
                    hover:text-gray-700 ">
                            <span class="sr-only">Previous</span>
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        </a>
                    }
                </li>
                {/* Tạo  dãy phân trang */}
                {Array.from({ length: props.pages }, (val, ind) =>
                    <li>
                        {/* Styling cho nút bâm của trang hiện tại đang xem */}
                        <a href={`${(ind + 1)}`} class={`${  ind + 1 == parseInt(props.currentPage) ? 
                            "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 "  : 
                            "text-gray-500 bg-white border hover:bg-gray-100 hover:text-gray-700 "
                    } py-2 px-3 leading-tight ` }
                        >{ind + 1}</a>
                    </li>
                )}
                {/* Nếu trang hiện tại là trang cuôi cùng, ẩn nút next đi */}
                {props.currentPage == props.pages ?
                    <li> </li> :
                    <li> <a href={(parseInt(props.currentPage) + 1).toString()} class="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">
                        <span class="sr-only">Next</span>
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    </a></li>
                }
            </ul>
        </nav>


    )
}