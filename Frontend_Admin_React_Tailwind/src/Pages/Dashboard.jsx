import Sidebar from "../Components/sidebar"
import isAuthorized from "../Helpers/Authentication";
import { Redirect } from "react-router-dom"

export default function Dashboard() {
    // Nếu chưa đăng nhập
    if (!isAuthorized()) {
        return <Redirect to="/login" />;
      }
    return (
        <div className="flex">
            <Sidebar/>
            <div className="h-screen flex-1 p-7">
                <h2>Home</h2>
            </div>
        </div>
    )
}