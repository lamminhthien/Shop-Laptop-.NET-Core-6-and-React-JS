import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Sidebar from "../Components/sidebar";
export default function NotFoundPage() {
    let location = useLocation();
  
    return (
      <div className="flex">
        <Sidebar/>
        <div className="h-screen flex-1 p-7">
            <h3>
              Not found page for <code>{location.pathname}</code>
            </h3>
        </div>
      </div>
    );
  }