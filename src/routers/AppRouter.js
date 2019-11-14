import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
// Custom Routes
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
// Components
import NotFound from "../components/NotFound";
import Home from "../components/Home";
import Search from "../components/Search";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/search" component={Search} />

        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
