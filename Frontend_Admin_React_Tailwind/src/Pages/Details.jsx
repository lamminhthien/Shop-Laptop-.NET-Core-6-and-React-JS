// https://v5.reactrouter.com/web/example/url-params
import { useParams } from "react-router-dom";
export default function Details() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();
  
    return (
      <div>
        <h3>ID: {id}</h3>
      </div>
    );
  }