import reactDom from "react-dom";
import "./Styles/tailwind.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import TableTailwind from "./Pages/TableTest";

reactDom.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/">
                <div>
                    <h2>Testing</h2>
                </div>
            </Route>
            <Route path="/table">
                <div>
                    <h3>Table</h3>
                </div>
            </Route>
        </Switch>
    </BrowserRouter>, document.getElementById("root"));


