import React from "react";
import { observer } from "mobx-react";
import { decodeToken } from "react-jwt";
import UserStore from "../stores/UserStore";
import axios from "axios";
import { DateTime } from 'luxon';

class HistoryProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      price: props.price,
      quantity: props.quantity,
    };
  }

  render() {
    return (
      <div className="col-lg-12 col-md-12 mb-2">
        <div className="card h-100">
          <div className="card-body">
            <h5 className="card-title">
              <span> {this.state.name}</span>
            </h5>
            <h5>
              <span> cena: {this.state.price}</span>
            </h5>
            <h5>
              <span> liczba: {this.state.quantity}</span>
            </h5>
          </div>
        </div>
      </div>
    );
  }
}

class HistoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.date,
      products: props.products,
      isLoading: true,
    };
    this.loadedProducts = 0;
    this.jsonProducts = [];
    this.total = 0;
  }

  getProductQuantity(id) {
    return this.state.products.find((element) => element.productId === id).quantity;
  }

  async getProduct(id) {
    try {
      const response = await axios.get(
        "http://zdrowejedzenie.44b0bdc6651241b0874a.eastus.aksapp.io/gateway/products/" +
          id +
          "/",
        null,
        { "Content-Type": "application/json" }
      );

      response.data.quantity = this.getProductQuantity(id);
      this.jsonProducts.push(response.data);
      this.loadedProducts += 1;
      this.total += response.data.price * response.data.quantity;

      //Rerender when all products from the order are received
      if (this.loadedProducts === this.state.products.length) {
        this.setState({
          isLoading: false,
        });
      }
    } catch (err) {
      console.warn(err);
      alert("Nie udało się załadować historii");
    }
  }

  render() {
    this.state.products.forEach((element) => {
      this.getProduct(element.productId);
    });

    if (this.state.isLoading === true) {
      return <div>Wczytywanie...</div>;
    }

    const products = this.jsonProducts.map((product) => (
      <HistoryProduct
        key={product.id}
        name={product.name}
        price={product.price}
        quantity={product.quantity}
      />
    ));

    const groupDateDisplayFormat = "dd-MM-yyyy";
    const groupTimeDisplayFormat = "hh:mm:ss";
    const placementDate = DateTime.fromISO(this.state.date).toFormat(groupDateDisplayFormat);
    const placementTime = DateTime.fromISO(this.state.date).toFormat(groupTimeDisplayFormat);

    return (
      <div className="history_item">
        <div>
          <div className="history_item_date"><b>{placementDate}</b>{", " + placementTime}</div>
        </div>
        <div>{products}</div>
        <div>
          <div className="history_item_price">
            total: {this.total.toFixed(2)}
          </div>
        </div>
      </div>
    );
  }
}

class HistoryOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }

  componentDidMount() {
    this.getHistoryOrders();
  }

  async getHistoryOrders() {
    try {
      const apiURL =
        "http://zdrowejedzenie.44b0bdc6651241b0874a.eastus.aksapp.io/gateway/";
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
      const response = await authAxios.get("orders/", {
        params: { userid: decodedToken["user-id"] },
      });

      console.log("history")
      console.log(response.data);

      this.setState({
        orders: response.data
      })

    } catch (err) {
      console.warn(err);
      alert("Nie udało się załadować historii");
    }
  }

  render() {
    const orders = this.state.orders.map((order) => (
      <HistoryItem key={order.id} date={order.placementDate} products={order.orderedProducts} />
      //<p key>test</p>
    ));

    return <div className="history_orders">{orders}</div>;
  }
}

export default observer(HistoryOrders);
