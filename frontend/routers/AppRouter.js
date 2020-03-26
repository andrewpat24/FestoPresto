import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';
// Custom Routes
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import PublicOnlyRoute from './PublicOnlyRoute';
// Components
import NotFound from '../components/NotFound';
import MyFestivals from '../components/MyFestivals';
import Search from '../components/Search';
import Header from '../components/Header';
import Login from '../components/Login';
import Event from '../components/Event';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <PublicOnlyRoute exact path="/" component={Login} />
        <PrivateRoute exact path="/search" component={Search} />
        <PrivateRoute exact path="/event/:id" component={Event} />
        <PrivateRoute exact path="/my-festivals" component={MyFestivals} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
