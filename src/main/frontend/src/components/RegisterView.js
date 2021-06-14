import React from "react";
import axios from "axios";

class Logo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
    };
  }

  render() {
    return (
      <div className="logo_and_text">
        <img
          className="logo_image"
          src={"../../favicon.ico"}
          alt="Zdrowe Jedzenie logo"
        ></img>
        <p className="text_below_logo">{this.state.text}</p>
      </div>
    );
  }
}

class RegisterView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirmation: "",
      firstName: "",
      lastName: "",
      address: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    event.preventDefault();
  }

  createUser(state) {
    // Do sprawdzenia ( nie działa )
    // client({
    //   method: "POST",
    //   path: "http://127.0.0.1:3001/users",
    //   headers: { Accept: "application/json" },
    //   entity: {
    //     user: {
    //       email: state.email,
    //       password: state.password,
    //       password_confirmation: state.passwordConfirmation,
    //       last_name: state.lastName,
    //       first_name: state.firstName,
    //       address: state.address,
    //   }}
    // })
    //   .then((response) => console.log(response))
    //   .catch((error) => {
    //     console.log(error);
    //   });

    const headers = {
      'Content-Type':'application/json',
    }

    axios
      .post(
        "http://zdrowejedzenie.bcb17b143e9244b5a03d.eastus.aksapp.io/gateway/users/",
        {
          email: state.email,
          address: state.address,
          password: state.password,
          confirmPassword: state.passwordConfirmation,
          firstName: state.firstName,
          lastName: state.lastName,
        },
        { headers: headers }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSubmit(event) {
    if (this.state.password !== this.state.passwordConfirmation) {
      alert("Podane przez Ciebie hasła nie są jednakowe.");
    } else {
      this.createUser(this.state)
      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <section className="reg-panel">
        <div className="reg-panel__logo">
          <Logo text="Zdrowe Jedzenie jest najlepszym w kraju dostawcą pożywienia spełniającego wymagania wymagających smakoszy bedąc przy tym tanią i zdrową alternatywą dla sztucznie hodowanych produktów. Zarejestruj się i żyj zdrowo już dziś!" />
        </div>
        <form className="form" onSubmit={this.handleSubmit}>
          <label className="form__label">adres email</label>
          <input
            className="form__input"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <label className="form__label">hasło</label>
          <input
            className="form__input"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <label className="form__label">Potwierdź hasło</label>
          <input
            className="form__input"
            name="passwordConfirmation"
            type="password"
            value={this.state.passwordConfirmation}
            onChange={this.handleChange}
            required
          />
          <label className="form__label">Imię</label>
          <input
            className="form__input"
            name="firstName"
            type="text"
            value={this.state.firstName}
            onChange={this.handleChange}
            required
          />
          <label className="form__label">Nazwisko</label>
          <input
            className="form__input"
            name="lastName"
            type="text"
            value={this.state.lastName}
            onChange={this.handleChange}
            required
          />
          <label className="form__label">Adres zamieszkania</label>
          <input
            className="form__input"
            name="address"
            type="text"
            value={this.state.address}
            onChange={this.handleChange}
            required
          />
          <input
            className="form__submit"
            type="submit"
            value="Zarejestruj"
          />
        </form>
      </section>
    );
  }
}

export default RegisterView;
