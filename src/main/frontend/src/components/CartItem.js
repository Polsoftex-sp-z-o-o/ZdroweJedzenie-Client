import React from "react";
import productsMock from "../utils/productsMock";

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: props.product.quantity,
      price: 0,
    };
    this.idRef = React.createRef();
    this.idRef.current = this.props.product.productId;
    this.nameRef = React.createRef();
    this.availableQuantityRef = React.createRef();
  }
  componentDidMount() {
    this.getProductInfo(this.idRef.current);
  }
  async getProductInfo(id) {
    var mock = new productsMock();
    const product = await mock.getProductById(id);
    // console.warn(product.entity);
    this.nameRef.current = product.entity.name;
    this.availableQuantityRef.current = product.entity.quantity;
    const computedPrice = product.entity.price * this.state.quantity;
    this.setState({
      ...this.state,
      price: computedPrice,
    });
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
          <button className="cart_delete_btn col-md-2 row justify-content-center align-items-center">
            <i className="fas fa-minus"></i>
          </button>
          <div className="col-md-2 row justify-content-center ">
            {this.state.quantity}
          </div>
          <button className="cart_delete_btn col-md-2 row justify-content-center align-items-center">
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <div className="col-md-2 row justify-content-center">
          <button className="cart_delete_btn col-md-6">
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
