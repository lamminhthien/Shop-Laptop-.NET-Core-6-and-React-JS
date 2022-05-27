import './Styles/Paging.css'

export default function Paging(props) {
const highLightCurrentPage = () => {
    
}

    return (

        <nav aria-label="Page navigation example">
            <ul>
                <li>
                    {/* Nếu trang hiện tại là trang đầu thì ẩn nút previous đi */}
                    {props.currentPage == 1 ?
                        <li></li> :
                        <a href={(parseInt(props.currentPage) - 1).toString()}
                            class="page-navigation">
                            <span>Previous</span>
                            <svg  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        </a>
                    }
                </li>
                {/* Tạo  dãy phân trang */}
                {Array.from({ length: props.pages }, (val, ind) =>
                    <li>
                        {/* Styling cho nút bâm của trang hiện tại đang xem */}
                        <a href={`${(ind + 1)}`} class={`${  ind + 1 == parseInt(props.currentPage) ? 
                            "page-current"  : 
                            "page-navigation "
                    } py-2 px-3 leading-tight ` }
                        >{ind + 1}</a>
                    </li>
                )}
                {/* Nếu trang hiện tại là trang cuôi cùng, ẩn nút next đi */}
                {props.currentPage == props.pages ?
                    <li> </li> :
                    <li> <a href={(parseInt(props.currentPage) + 1).toString()} class="page-navigation">
                        <span>Next</span>
                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    </a></li>
                }
            </ul>
        </nav>


    )
}