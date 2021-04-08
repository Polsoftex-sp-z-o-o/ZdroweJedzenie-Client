import React from 'react';
import {BrowserRouter as Router,  Switch, Route} from "react-router-dom";

import Footer from './Footer'
import Navigation from './Navigation'
import HomeView from './HomeView'
import RegisterView from './RegisterView'
import LoginView from './LoginView'

class  App  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "Cytat na dziś, który jest bardzo mądry.",
      author: "Mądra osoba",
    };
  }
  render() {
    return (
      <Router>
        <div className="container-fluid">
          <Navigation />
          <div className="jumbotron">
            <Switch>
              <Route path="/" exact component={HomeView} />
              <Route path="/register" exact component={RegisterView} />
              <Route path="/login" exact component={LoginView} />

            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
