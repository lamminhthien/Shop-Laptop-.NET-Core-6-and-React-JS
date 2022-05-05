import reactDom from "react-dom";
import "./Styles/tailwind.css";
import { BrowserRouter, Route, Switch,useParams } from "react-router-dom";
import Home from "./Pages/Home";
import TableTailwind from "./Pages/TableTest";

// https://v5.reactrouter.com/web/example/basic React Router Example
reactDom.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" children={Home}/>
            <Route exact path="/table" children={TableTailwind}/>
            <Route exact path={`/detail/:id`}>
                <div>
                    <h3>Path have id</h3>
                </div>
            </Route>
        </Switch>
    </BrowserRouter>, document.getElementById("root"));


