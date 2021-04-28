import React from "react";
import { Link } from "react-router-dom";
import UserStore from "../stores/UserStore";

class Navigation extends React.Component {
  doLogout() {
    UserStore.isLoggedIn = false;
    UserStore.username = '';
  }

  render() {
    const leftMenuLinks = [];
    leftMenuLinks.push(
      <Link key="products" to="/products">
        <li className="nav-item active" style={{ margin: "0px 10px 0px 10px" }}>
          <span className="nav-link"> Produkty</span>
        </li>
      </Link>
    );
    leftMenuLinks.push(
      <Link key="account" to="/account">
        <li className="nav-item active" style={{ margin: "0px 10px 0px 10px" }}>
          <span className="nav-link"> Moje konto</span>
        </li>
      </Link>
    );

    leftMenuLinks.push(
      <Link key="cart" to="/cart">
        <li className="nav-item active" style={{ margin: "0px 10px 0px 10px" }}>
          <span className="nav-link">Koszyk</span>
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
          <button href="/register" className="btn btn-outline-warning">
            Zarejestruj
          </button>
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
          <button href="/logout" className="btn btn-outline-success">
            Zaloguj
          </button>
        </li>
      </Link>
    );
    rightMenuLinks.push(
      <Link key="logout" to="/logout">
        <li
          key="logout"
          className="nav-item active"
          style={{ margin: "0px 10px 0px 10px" }}
        >
          <button href="/logout" className="btn btn-outline-danger" onClick="this.doLogout">
            Wyloguj
          </button>
        </li>
      </Link>
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
              Zdrowe Jedzenie
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
            <ul className="navbar-nav mr-auto">{leftMenuLinks}</ul>
            <ul className="navbar-nav ml-auto"> {rightMenuLinks}</ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Navigation;
