import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amountToCart: 0,
    };
  }
  async addToCart() {
    try {
      const { history } = this.props;

      const response = await axios.post(
        "http://zdrowejedzenie.bcb17b143e9244b5a03d.eastus.aksapp.io/gateway/cart/",
        {
          productId: this.props.product.id,
          quantity: this.state.amountToCart,
        },
        { "Content-Type": "application/json" }
      );
      // const response = "temp";
      console.log(response);
      if (history) history.push("/cart");
    } catch (err) {
      console.warn(err);
    }
  }

  handleCartInput(e) {
    const amountToCartCurrent = e.target.validity.valid
      ? e.target.value
      : this.state.amountToCart;
    this.setState({ amountToCart: amountToCartCurrent });
  }

  handleDelete() {}

  componentDidMount() {
    this.loadCategories();
  }

  loadCategories() {}

  render() {
    const controls = [];
    controls.push(
      <input
        type="number"
        min="0"
        max="1000"
        size="7"
        step="1"
        value={this.state.amountToCart}
        onChange={this.handleCartInput.bind(this)}
      />
    );
    controls.push(
      <button
        id="buyButton"
        key="buyButton"
        onClick={this.addToCart.bind(this)}
        className="btn btn-info"
      >
        <i className="fas fa-shopping-cart"></i>
      </button>
    );

    return (
      <div className="col-lg-4 col-md-6 mb-4">
        <div className="card h-100">
          <span>
            <img
              className="card-img-top"
              src="http://placehold.it/700x400"
              alt=""
            />
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
          <div className="card-footer">
            <small className="text-muted">
              {" "}
              Pozostało: {this.props.product.quantity}
            </small>
            <span> {controls} </span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Product);
