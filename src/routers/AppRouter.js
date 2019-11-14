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
import Header from "../components/Header";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <PublicRoute exact path="/" component={Home} />
        <PublicRoute exact path="/search" component={Search} />

        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
