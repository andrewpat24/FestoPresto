import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// Router
import AppRouter, { history } from "./routers/AppRouter";
// Redux
import configureStore from "./store/configureStore";
import { startSetExpenses } from "./actions/expenses";
import { login, logout } from "./actions/auth";
// Styles
import "./styles/styles.scss";
import "normalize.css/normalize.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
// Firebase
import { firebase } from "./firebase/firebase";
// Components
import Loading from "./components/Loading";

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById("app"));
    hasRendered = true;
  }
};
ReactDOM.render(<Loading />, document.getElementById("app"));

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (history.location.pathname === "/") {
        history.push("/dashboard");
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
});
