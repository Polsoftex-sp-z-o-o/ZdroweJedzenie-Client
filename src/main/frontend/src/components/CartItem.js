import React from "react";
import axios from "axios";
import { observer } from "mobx-react";
import { decodeToken } from "react-jwt";
import UserStore from "../stores/UserStore";

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.refleshPrice = this.refreshPrice.bind(this);
    this.handleQuantityInput = this.handleQuantityInput.bind(this);
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
    try {
      const apiURL =
        "http://zdrowejedzenie.44b0bdc6651241b0874a.eastus.aksapp.io/gateway/";

      const authAxios = axios.create({
        baseURL: apiURL,
      });
      const response = await authAxios.get("products/", {
        params: { productid: id },
      });

      const allProducts = response.data;
      const product = allProducts.find((item) => item.id === id);
      this.nameRef.current = product.name;
      this.availableQuantityRef.current = product.quantity;
      this.eachPriceRef.current = product.price;
      const computedPrice = this.refreshPrice(this.state.quantity);

      this.setState({
        ...this.state,
        price: computedPrice,
      });
    } catch (err) {
      console.warn(err);
      alert("Nie udało się załadować produktu");
    }
  }

  refreshPrice(quantity) {
    let newPrice = this.eachPriceRef.current * quantity;
    newPrice = newPrice.toFixed(2);
    return newPrice;
  }

  async handleQuantityInput(event) {
    const newQuantity = event.target.value;
    const newPrice = this.refreshPrice(newQuantity);

    this.setState({ quantity: newQuantity, price: newPrice });

    const apiURL = "http://zdrowejedzenie.44b0bdc6651241b0874a.eastus.aksapp.io/gateway/";
    const token = UserStore.token;
    const decodedToken = decodeToken(token);

    const authAxios = axios.create({
      baseURL: apiURL,
      headers: {
        Authorization: token,
      },
    });
    const response = await authAxios.post(
      `cart/`,
      {
        productId: this.idRef.current,
        quantity: this.state.quantity,
      },
      {
        "Content-Type": "application/json",
        params: {
          userid: decodedToken["user-id"],
        },
      });

    // TODO: Error handling

    console.log(response);
  }

  async deleteItem() {
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
      const response = await authAxios.delete(`cart/${this.idRef.current}/`, {
        params: {
          userid: decodedToken["user-id"],
        },
      });

      console.log(response);

      this.props.deleteHandler();
    } catch (err) {
      console.warn(err);
      alert("Nie udało się usunąć produktu z koszyka");
    }
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
          {/* TODO: better min width */}
          <input
            style={{ minWidth: 2 + 'em' }}
            type="number"
            min="0"
            size="7"
            step="1"
            value={this.state.quantity}
            onChange={this.handleQuantityInput}
            className="col-md-4 p-0"
          />
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
export default observer(CartItem);
