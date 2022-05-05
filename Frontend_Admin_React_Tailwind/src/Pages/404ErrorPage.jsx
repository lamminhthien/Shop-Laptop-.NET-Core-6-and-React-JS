import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
export default function NotFoundPage() {
    let location = useLocation();
  
    return (
      <div>
        <h3>
          Not found page for <code>{location.pathname}</code>
        </h3>
      </div>
    );
  }