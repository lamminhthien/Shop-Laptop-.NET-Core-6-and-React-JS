import reactDom from "react-dom";
import "./Styles/tailwind.css";
import { BrowserRouter, Route, Switch,useParams } from "react-router-dom";
import Home from "./Pages/Home";
import TableTailwind from "./Pages/TableTest";
import Details from "./Pages/Details";
import NotFoundPage from "./Pages/404ErrorPage";
import QueryParameters from "./Pages/QueryParameters";


// https://v5.reactrouter.com/web/example/basic React Router Example
reactDom.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" children={<Home />} />

            <Route exact path="/table" children={<TableTailwind />} />

            <Route exact path="/details/:id" children={<Details />} />

            <Route exact path="/queryparams" children={<QueryParameters/>} />

            <Route path="*" children={<NotFoundPage/>}  / >
            
        </Switch>
    </BrowserRouter>, document.getElementById("root"));

