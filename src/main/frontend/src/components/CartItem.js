import React from "react";
import productsMock from "../utils/productsMock";

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.refleshPrice = this.refleshPrice.bind(this);
    this.increaseAmount = this.increaseAmount.bind(this);
    this.decreaseAmount = this.decreaseAmount.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

    this.state = {
      quantity: props.product.quantity,
      price: 0,
    };
    this.idRef = React.createRef();
    this.idRef.current = this.props.product.productId;
    this.nameRef = React.createRef();
    this.availableQuantityRef = React.createRef();
    this.eachPriceRef = React.createRef();
  }
  componentDidMount() {
    this.getProductInfo(this.idRef.current);
  }
  async getProductInfo(id) {
    var mock = new productsMock();
    const product = await mock.getProductById(id);
    this.nameRef.current = product.entity.name;
    this.availableQuantityRef.current = product.entity.quantity;
    this.eachPriceRef.current = product.entity.price;
    const computedPrice = this.refleshPrice(this.state.quantity);
    this.setState({
      ...this.state,
      price: computedPrice,
    });
  }

  refleshPrice(quantity) {
    let newPrice = this.eachPriceRef.current * quantity;
    newPrice = newPrice.toFixed(2);
    return newPrice;
  }

  increaseAmount() {
    console.log("increase");
    if (this.state.quantity <= this.availableQuantityRef.current) {
      const increasedAmount = this.state.quantity + 1;
      const newPrice = this.refleshPrice(increasedAmount);
      this.setState({ quantity: increasedAmount, price: newPrice });
    }
  }

  decreaseAmount() {
    console.log("decrease");
    if (this.state.quantity > 0) {
      const decreasedAmount = this.state.quantity - 1;
      const newPrice = this.refleshPrice(decreasedAmount);
      this.setState({ quantity: decreasedAmount, price: newPrice });
    }
  }

  deleteItem() {
    console.log("item delete requested");
  }

  buy() {
    console.log("buy request");
  }

  render() {
    return (
      <div className="cart_container row mt-2 justify-content-between align-items-center">
        <div className="col-md-2 row justify-content-center">
          <img
            className="card-img-top"
            src="http://placehold.it/700x400"
            alt="IMG"
          />
        </div>
        <div className="col-md-2 row justify-content-center">
          {this.nameRef.current}
        </div>
        <div className="col-md-2 row justify-content-around">
          <button
            className="cart_delete_btn col-md-2 row justify-content-center align-items-center"
            onClick={this.decreaseAmount}
          >
            <i className="fas fa-minus"></i>
          </button>
          <div className="col-md-2 row justify-content-center ">
            {this.state.quantity}
          </div>
          <button
            className="cart_delete_btn col-md-2 row justify-content-center align-items-center"
            onClick={this.increaseAmount}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <div className="col-md-2 row justify-content-center">
          <button
            className="cart_delete_btn col-md-6"
            onClick={this.deleteItem}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>

        <div className="col-md-2 row justify-content-center">
          {this.state.price} zł
        </div>
      </div>
    );
  }
}
export default CartItem;

// aktualizacja ceny po zmianie stanu
