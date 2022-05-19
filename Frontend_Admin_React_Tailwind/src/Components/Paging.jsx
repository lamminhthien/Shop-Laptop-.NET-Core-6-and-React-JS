export default function Paging(props) {

    return (
        <nav aria-label="Page navigation example">
            <ul class="inline-flex -space-x-px">
                {Array.from({ length: props.pages }, (val, ind) =>
                    <li>
                        <a href="#" class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{ind+1}</a>
                    </li>
                )}

            </ul>
        </nav>

    )
}