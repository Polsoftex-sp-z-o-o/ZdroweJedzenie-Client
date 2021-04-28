import React from "react";
import axios from "axios";
import { decodeToken } from "react-jwt";
import UserStore from "../stores/UserStore";

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  loginUser(state) {
    const headers = {
      'Content-Type':'application/json',
    } 

    axios
      .post(
        "http://zdrowejedzenie.bcb17b143e9244b5a03d.eastus.aksapp.io/gateway/login/",
        {
          email: state.email,
          password: state.password
        },
        { headers: headers }
      )
      .then((response) => {
        let token = response.data
        const decodedToken = decodeToken(token)  
        console.log(decodedToken)
        
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    event.preventDefault();
  }

  handleSubmit(event) {
    this.loginUser(this.state)
    event.preventDefault();

    UserStore.isLoggedIn = true;
    UserStore.username = "test";

  }

  render() {
    return (
      <div className="container_login">
        <form className="login_form" onSubmit={this.handleSubmit}>
          <label className="login_form__label">adres email</label>
          <input
            className="login_form__input"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label className="login_form__label">hasło</label>
          <input
            className="login_form__input"
            name="password"
            type="text"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <input className="login_form__submit" type="submit" value="Zaloguj" />
          <p className="login_form__info">
            Potrzebujesz konta? <a href="/register">Zarejestruj się</a>
          </p>
        </form>
      </div>
    );
  }
}

export default LoginView;
