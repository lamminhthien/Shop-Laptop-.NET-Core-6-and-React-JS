import reactDom from "react-dom";
import "./Styles/tailwind.css";
import { BrowserRouter, Route, Switch,useParams } from "react-router-dom";
import Home from "./Pages/Home";
import TableTailwind from "./Pages/TableTest";
import Details from "./Pages/Details";

// https://v5.reactrouter.com/web/example/basic React Router Example
reactDom.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" children={<Home />} />

            <Route exact path="/table" children={<TableTailwind />} />

            <Route path="/details/:id" children={<Details />} />
        </Switch>
    </BrowserRouter>, document.getElementById("root"));

