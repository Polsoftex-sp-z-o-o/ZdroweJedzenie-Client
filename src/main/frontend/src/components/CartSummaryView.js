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
    this.handleClear = this.handleClear.bind(this);
    this.handleItems = this.handleItems.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
    this.state = {
      items: [],
      showSummary: false,
    };
    this.isItemDeleted = false;
  }

  handleItemDelete() {
    this.setState({ isItemDeleted: true });
  }
  handleItems(item) { }

  togglePopup() {
    this.setState({
      showSummary: !this.state.showSummary,
    });
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    if (this.state.isItemDeleted === true) {
      console.log("cart items reload triggered");
      this.getCart();

      this.setState({ isItemDeleted: false });
      console.log("load after delete");
    }
  }

  componentDidMount() {
    this.getCart();
  }

  async getCart() {
    try {
      const apiURL =
        "http://zdrowejedzenie.44b0bdc6651241b0874a.eastus.aksapp.io/gateway/";
      const token = UserStore.token;
      const decodedToken = decodeToken(token);
      // console.log(decodedToken["user-id"]);
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
      // console.log(cart);

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

  async handleClear(e) {
    e.preventDefault();
    console.log("Clear request");

    const apiURL =
      "http://zdrowejedzenie.44b0bdc6651241b0874a.eastus.aksapp.io/gateway/";
    const token = UserStore.token;
    const decodedToken = decodeToken(token);
    const authAxios = axios.create({
      baseURL: apiURL,
      headers: {
        Authorization: token,
      },
    });
    await authAxios.delete("cart/", {
      params: { userid: decodedToken["user-id"] },
    });

    const cart = [];

    // TODO: Error handling

    this.setState({
      ...this.state,
      items: cart,
    });
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
            {this.state.items.map((product) => {
              // console.log(product);
              return (
                <CartItem
                  key={product.productId}
                  product={product}
                  deleteHandler={this.handleItemDelete}
                />
              );
            })}
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
            <button
              className="login_form__submit"
              type="submit"
              onClick={this.handleClear}
            >
              Wyczyść
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default observer(CartSummaryView);
