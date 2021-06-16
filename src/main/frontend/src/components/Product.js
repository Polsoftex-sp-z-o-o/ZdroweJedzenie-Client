import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { observer } from "mobx-react";
import { decodeToken } from "react-jwt";
import UserStore from "../stores/UserStore";
import ProductImage from "./ProductImage";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amountToCart: 0,
    };
  }
  async addToCart() {
    if (this.state.amountToCart > 0) {
      try {
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
        await authAxios.post(
          "cart/",
          {
            productId: this.props.product.id,
            quantity: this.state.amountToCart,
          },
          {
            "Content-Type": "application/json",
            params: { userid: decodedToken["user-id"] },
          }
        );
        // console.log(response);
        this.setState({ amountToCart: 0 });
        alert(`Dodano produkt do koszyka.`);
      } catch (err) {
        console.warn(err);
        alert("Nie udało się dodać produktu do koszyka");
      }
    }
  }

  handleCartInput(e) {
    const amountToCartCurrent = e.target.validity.valid
      ? e.target.value
      : this.state.amountToCart;
    this.setState({ amountToCart: amountToCartCurrent });
  }

  componentDidMount() {
    this.loadCategories();
  }

  loadCategories() {}

  render() {
    return (
      <div className="col-lg-4 col-md-6 mb-4">
        <div className="card h-100">
          <span>
            <ProductImage productId={this.props.product.id}></ProductImage>
          </span>
          <div className="card-body">
            <h1 className="card-title">
              <span className="badge  rounded-pill bg-success">
                {" "}
                {this.props.product.category}{" "}
              </span>{" "}
              <span> {this.props.product.name}</span>
            </h1>
            <h5> {this.props.product.price} </h5>
            <p className="card-text"> {this.props.product.description} </p>
          </div>
          <div className="card-footer d-flex align-items-center justify-content-between">
            <small className="col-md-3 text-muted">
              {" "}
              Pozostało: {this.props.product.quantity}
            </small>
            {UserStore.isLoggedIn && (
              <div className="col-md-4 justify-content-around">
                <input
                  type="number"
                  min="0"
                  max={this.props.product.quantity}
                  size="7"
                  step="1"
                  value={this.state.amountToCart}
                  onChange={this.handleCartInput.bind(this)}
                  className="col-md-6 p-0"
                />
                <button
                  id="buyButton"
                  key="buyButton"
                  onClick={this.addToCart.bind(this)}
                  className="col-md-4 btn btn-info"
                >
                  <i className="fas fa-shopping-cart"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(observer(Product));
