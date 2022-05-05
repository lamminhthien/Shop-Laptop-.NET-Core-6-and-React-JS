import Sidebar from "../Components/Sidebar"
export default function TableTailwind() {
    return (
        <div className="flex">
            <Sidebar/>
            <div className="h-screen flex-1 p-7">
                <h2>Table Test</h2>
            </div>
        </div>
    )
}