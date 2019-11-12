import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
// Components
import NotFound from "../components/NotFound";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import AddExpense from "../components/AddExpense";
import EditExpense from "../components/EditExpense";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute exact path="/" component={Login} />

        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create" component={AddExpense} />
        <PrivateRoute exact path="/edit/:id" component={EditExpense} />

        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
