import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { observer } from "mobx-react";
import UserStore from "../stores/UserStore";

import Footer from "./Footer";
import Navigation from "./Navigation";
import HomeView from "./HomeView";
import RegisterView from "./RegisterView";
import LoginView from "./LoginView";
import AccountView from "./AccountView";
import ProductsView from "./ProductsView";
import CartSummaryView from "./CartSummaryView";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">
          {
            UserStore.isLoggedIn ? (
              <p>Logged In</p>
            ) : (
              <p>Logged Out</p>
            )
          }
          <Navigation />
          <div className="jumbotron">
            <Switch>
              <Route path="/" exact component={HomeView} />
              <Route path="/register" exact component={RegisterView} />
              <Route path="/login" exact component={LoginView} />
              <Route path="/account" exact component={AccountView} />
              <Route path="/products" exact component={ProductsView} />
              <Route path="/cart" exact component={CartSummaryView} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default observer(App);
