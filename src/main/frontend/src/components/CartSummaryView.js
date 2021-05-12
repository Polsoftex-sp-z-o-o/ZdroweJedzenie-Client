import React from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import cartMock from "../utils/cartMock";
import OrderSummary from "./OrderSummary";

class CartSummaryView extends React.Component {
  constructor(props) {
    super(props);
    this.handleBuy = this.handleBuy.bind(this);
    this.state = {
      items: [],
      showSummary: false
    };
  }

  togglePopup() {
    this.setState({
      showSummary: !this.state.showSummary
    });
  }

  componentDidMount() {
    this.getCart();
  }

  async getCart() {
    const mock = new cartMock();
    const cart_Mock = await mock.getCart();
    this.setState({
      ...this.state,
      items: cart_Mock.entity.items,
    });
  }

  handleBuy(e) {
    e.preventDefault();
    console.log("buy request");
    this.togglePopup();
  }

  render() {
    return (
      <div className="content">
        {this.state.showSummary ?
            <OrderSummary text="Podsumowanie" closePopup={this.togglePopup.bind(this)}>
            </OrderSummary> : null
          }
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

export default CartSummaryView;
