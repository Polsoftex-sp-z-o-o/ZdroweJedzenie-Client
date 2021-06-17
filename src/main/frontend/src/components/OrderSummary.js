import React from "react";
import { decodeToken } from "react-jwt";
import UserStore from "../stores/UserStore";
import axios from "axios";

class OrderSummary extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      number: "",
      expiration: "",
      code: ""
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    console.log("handleSubmit")

    const apiURL = "http://zdrowejedzenie.44b0bdc6651241b0874a.eastus.aksapp.io/gateway/";
    const token = UserStore.token;
    const decodedToken = decodeToken(token);

    const authAxios = axios.create({
      baseURL: apiURL,
      headers: {
        Authorization: token,
      },
    });
    await authAxios.post(
      `payment/`,
      {
        number: this.state.number,
        expiration: this.state.expiration,
        code: this.state.code
      },
      {
        "Content-Type": "application/json",
        params: {
          userid: decodedToken["user-id"],
        },
      });
  }

  render() {
    return (
      <div className='blur_background_out'>
        <div className='order_summary'>
          <div className='order_summary_inner'>
            <form className="register_form" onSubmit={this.handleSubmit}>
              <label className="summary_title">Płatność</label>

              <label className="register_form__label">Numer karty</label>
              <input
                className="register_form__input"
                name="number"
                type="text"
                placeholder="1234123412341234"
                maxlength="16"
                onChange={this.onChange}
              />
              <label className="register_form__label">Data ważności</label>
              <input
                className="register_form__input"
                name="expiration"
                type="text"
                placeholder="09/21"
                maxlength="5"
                onChange={this.onChange}
              />
              <label className="register_form__label">Kod</label>
              <input
                className="register_form__input"
                name="code"
                type="text"
                placeholder="123"
                maxlength="3"
                onChange={this.onChange}
              />
              <input
                className="order_form__submit"
                type="submit"
                value="Zamów"
              />
              <input
                className="order_form__return"
                type="submit"
                value="Wróć"
                onClick={this.props.closePopup}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderSummary;
