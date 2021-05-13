import React from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import { observer } from "mobx-react";
import { decodeToken } from "react-jwt";
import UserStore from "../stores/UserStore";
import axios from "axios";

class CartSummaryView extends React.Component {
  constructor(props) {
    super(props);
    this.handleBuy = this.handleBuy.bind(this);
    this.state = {
      items: [],
      showSummary: false,
    };
  }

  togglePopup() {
    this.setState({
      showSummary: !this.state.showSummary,
    });
  }

  componentDidMount() {
    this.getCart();
  }

  async getCart() {
    try {
      const apiURL =
        "http://zdrowejedzenie.fe6a0d090dd54915b798.eastus.aksapp.io/gateway/";
      const token = UserStore.token;
      const decodedToken = decodeToken(token);
      console.log(token);
      console.log(decodedToken);
      console.log(decodedToken["user-id"]);
      const authAxios = axios.create({
        baseURL: apiURL,
        headers: {
          Authorization: token,
        },
      });
      const response = await authAxios.get("cart/", {
        params: { userid: decodedToken["user-id"] },
      });

      const cart = response.data.orderedProducts;
      console.log(cart);

      this.setState({
        ...this.state,
        items: cart,
      });
    } catch (err) {
      console.warn(err);
      alert("Nie udało się załadować koszyka");
    }
  }

  handleBuy(e) {
    e.preventDefault();
    console.log("buy request");
    this.togglePopup();
  }

  render() {
    return (
      <div className="content">
        {this.state.showSummary ? (
          <OrderSummary
            text="Podsumowanie"
            closePopup={this.togglePopup.bind(this)}
          ></OrderSummary>
        ) : null}
        <div className="row justify-content-center">
          <div className="col-md-6">
            {this.state.items.map((product) => (
              <CartItem key={product.productId} product={product} />
            ))}
          </div>
        </div>

        <div className="row mt-3 justify-content-center">
          <div className="cart_navigation_container row justify-content-around">
            <Link key="products" to="/products">
              <button className="login_form__submit " type="submit">
                Powrót do sklepu
              </button>
            </Link>
            <button
              className="login_form__submit"
              type="submit"
              onClick={this.handleBuy}
            >
              Kup
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default observer(CartSummaryView);
