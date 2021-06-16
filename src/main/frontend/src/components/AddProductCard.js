import React from "react";
import axios from "axios";
import { observer } from "mobx-react";
import { decodeToken } from "react-jwt";
import UserStore from "../stores/UserStore";

class AddProductCard extends React.Component {
  showDeleteOption = true;
  constructor(props) {
    super(props);
    console.log(props);
    this.showDeleteOption = true;
    console.log("Renderuje");
    console.log(this.props.product);

    this.state = {
      id: this.props.product.id || "",
      name: this.props.product.name || "",
      quantity: this.props.product.quantity || "",
      category: this.props.product.category || "",

      price: this.props.product.price || 0,
      description: this.props.product.description || "",
    };
    if (this.props.product.id === "") {
      this.showDeleteOption = false;
    }
    console.log("Show delete button");
    console.log(this.showDeleteOption);
  }

  async addNewProduct() {
    //TO DO
    try {
      const apiURL =
        "http://zdrowejedzenie.44b0bdc6651241b0874a.eastus.aksapp.io/gateway/";
      const token = UserStore.token;
      decodeToken(token);
      const authAxios = axios.create({
        baseURL: apiURL,
        headers: {
          Authorization: token,
        },
      });
      const response = await authAxios.post(
        "products/",
        {
          name: this.state.name,
          description: this.state.description,
          category: this.state.category,
          quantity: this.state.quantity,
          price: this.state.price,
        },
        {
          "Content-Type": "application/json",
          // params: { userid: decodedToken["user-id"] },
        }
      );
      console.log(response);
      this.props.reload();
      this.setState({
        quantity: 0,
        category: "",
        name: "",
        price: 0,
        description: "",
      });
      alert(`Dodano nowy produkt `);
    } catch (err) {
      console.warn(err);
      alert("Nie udało się dodać nowego produktu");
    }
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
      const response = await authAxios.delete(
        `products/${this.props.product.id}/`,
        {
          params: {
            userid: decodedToken["user-id"],
          },
        }
      );

      console.log(response);

      this.props.reload();
      alert("Usunieto produkt");
    } catch (err) {
      console.warn(err);
      alert("Nie udało się usunąć produktu");
    }
  }

  async EditProduct() {
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
      const response = await authAxios.put(
        `products/${this.props.product.id}/`,
        {
          name: this.state.name,
          description: this.state.description,
          category: this.state.category,
          quantity: this.state.quantity,
          price: this.state.price,
        },
        {
          "Content-Type": "application/json",
          params: {
            userid: decodedToken["user-id"],
          },
        }
      );

      console.log(response);

      this.props.reload();
      alert("Edytowano produkt");
    } catch (err) {
      console.warn(err);
      alert("Nie udało się edytować produktu");
    }
  }

  handleCategoryInput(e) {
    const categoryValue = e.target.value;
    this.setState({ category: categoryValue });
  }

  handleNameInput(e) {
    const nameValue = e.target.value;
    this.setState({ name: nameValue });
  }

  handlePriceInput(e) {
    const priceCurrent = e.target.validity.valid
      ? e.target.value
      : this.state.price;
    this.setState({ price: priceCurrent });
  }

  handleDescriptionInput(e) {
    const descriptionValue = e.target.value;
    this.setState({ description: descriptionValue });
  }

  handleQuantityInput(e) {
    const quantityCurrent = e.target.validity.valid
      ? e.target.value
      : this.state.quantity;
    this.setState({ quantity: quantityCurrent });
  }

  render() {
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
          <div className="card-body d-flex flex-column">
            <h1 className="card-title">
              <input
                type="text"
                placeholder="Kategoria"
                value={this.state.category}
                onChange={this.handleCategoryInput.bind(this)}
                className="col-md-6 rounded-pill bg-success"
              />
              <input
                type="text"
                placeholder="Nazwa produktu"
                value={this.state.name}
                onChange={this.handleNameInput.bind(this)}
                className=""
              />
            </h1>
            <div className="d-flex flex-row ">
              <label>Cena</label>
              <h5>
                {" "}
                <input
                  type="number"
                  min="0"
                  size="7"
                  step="0.1"
                  value={this.state.price}
                  onChange={this.handlePriceInput.bind(this)}
                  className="col-md-6 p-0"
                />
              </h5>
            </div>

            <input
              type="text"
              placeholder="Opis produkntu"
              value={this.state.description}
              onChange={this.handleDescriptionInput.bind(this)}
              className=""
            />
          </div>
          <div className="card-footer d-flex align-items-center justify-content-between">
            <small className="col-md-4 text-muted"> Dostępna ilość</small>
            <div className="col-md-8 d-flex justify-content-between">
              <input
                type="number"
                min="0"
                size="7"
                step="1"
                value={this.state.quantity}
                onChange={this.handleQuantityInput.bind(this)}
                className="col-md-2 p-0"
              />
              {this.showDeleteOption && (
                <button
                  id="delete"
                  key="delete"
                  className="col-md-2 btn btn-info"
                  onClick={this.deleteItem.bind(this)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              )}
              {this.showDeleteOption ? (
                <button
                  id="save"
                  key="save"
                  className="col-md-2 btn btn-info"
                  onClick={this.EditProduct.bind(this)}
                >
                  save
                </button>
              ) : (
                <button
                  id="save"
                  key="save"
                  className="col-md-2 btn btn-info"
                  onClick={this.addNewProduct.bind(this)}
                >
                  save
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddProductCard.defaultProps = {
  product: {
    id: "",
    quantity: 0,
    category: "",
    name: "",
    price: 0,
    description: "",
  },
};

export default observer(AddProductCard);
