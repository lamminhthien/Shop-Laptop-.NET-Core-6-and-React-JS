// https://v5.reactrouter.com/web/example/url-params
import { useParams,useRouteMatch } from "react-router-dom";
export default function Details() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();
    let {path,url} = useRouteMatch();
  
    return (
      <div>
        <h3>ID: {id}</h3>
        <h4>Current path = {path}</h4>
        <h4>Current url = {url}</h4>
      </div>
    );
  }