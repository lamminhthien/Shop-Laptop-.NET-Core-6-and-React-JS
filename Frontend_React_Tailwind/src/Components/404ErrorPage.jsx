import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import "./Styles/404ErrorPage.css"
export default function NotFoundPage() {
  let location = useLocation();

  return (
   
  
      <div className="div-1">
        <div className="div-2">
          <div class="div-3">
            <div class="div-4">
              <h1>404</h1>

              <h6>
                <span>Oops!</span> Page not found
              </h6>

              <p>
                The page "<code>{location.pathname}</code>" you’re looking for doesn’t exist.
              </p>
              <a href="/">Go home</a>
            </div>
          </div>
        </div>
      </div>
  );
}