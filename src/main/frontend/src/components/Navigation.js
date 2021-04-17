import React from 'react';
import {Link} from "react-router-dom";

class Navigation extends React.Component {

   render() {
    const leftMenuLinks = [];
    leftMenuLinks.push(
        <Link key="products" to="/products">
          <li
            className="nav-item active"
            style={{ margin: "0px 10px 0px 10px" }}
          >
            <span className="nav-link"> Produkty</span>
          </li>
        </Link>
    );
    leftMenuLinks.push(
        <Link key="account" to="/account">
            <li
                className="nav-item active"
                style={{ margin: "0px 10px 0px 10px" }}
            >
                <span className="nav-link"> Moje konto</span>
            </li>
        </Link>
    );
    
    const rightMenuLinks = [];
    rightMenuLinks.push(
        <Link key="register" to="/register">
        <li
        key="register"
        className="nav-item active"
        style={{ margin: "0px 10px 0px 10px" }}
        >
        <a href="/register" className="btn btn-outline-warning">
          Zarejestruj
        </a>
        </li>
        </Link>
    );
    rightMenuLinks.push(
        <Link key="login" to="/login">
        <li
        key="login"
        className="nav-item active"
        style={{ margin: "0px 10px 0px 10px" }}
        >
        <a href="/logout" className="btn btn-outline-success">
          Zaloguj
        </a>
        </li>
        </Link>
    );
    rightMenuLinks.push(
        <li
          key="logout"
          className="nav-item active"
          style={{ margin: "0px 10px 0px 10px" }}
        >
          <a href="/logout" className="btn btn-outline-danger">
            Wyloguj
          </a>
        </li>
    );

    return (
        <header>
          <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <Link to="/">
              <span className="navbar-brand">
                <i
                  className="fas fa-seedling"
                  style={{ margin: "0px 10px 0px 10px" }}
                ></i>
                Library
              </span>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav mr-auto">
                {leftMenuLinks}
              </ul>
              <ul className="navbar-nav ml-auto"> {rightMenuLinks}</ul>
            </div>
          </nav>
        </header>
      );
  }

};

export default Navigation;