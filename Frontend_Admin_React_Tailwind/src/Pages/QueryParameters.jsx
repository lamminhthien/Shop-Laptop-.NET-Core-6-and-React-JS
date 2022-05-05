// https://v5.reactrouter.com/web/example/url-params
import React from "react";
import { useParams,useRouteMatch,useLocation } from "react-router-dom";
import queryString from "query-string"
export default function QueryParameters() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();
    let {path,url} = useRouteMatch();
    const { search } = useLocation();
    const {name,age} = queryString.parse(search)
  
    return (
      <div>
        <h3>ID: {id}</h3>
        <h4>Current path = {path}</h4>
        <h4>Current url = {url}</h4>
        <h3>Query parameters test: {name} {age}</h3>
      </div>
    );
  }