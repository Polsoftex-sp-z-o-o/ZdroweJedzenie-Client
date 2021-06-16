import React from "react";

class AddProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      category: "",
      name: "",
      price: 0,
      description: "",
    };
  }

  // async addNewProduct() {
  //   //TO DO
  //   if (this.state.amountToCart > 0) {
  //     try {
  //       const apiURL =
  //         "http://zdrowejedzenie.fe6a0d090dd54915b798.eastus.aksapp.io/gateway/";
  //       const token = UserStore.token;
  //       const decodedToken = decodeToken(token);
  //       const authAxios = axios.create({
  //         baseURL: apiURL,
  //         headers: {
  //           Authorization: token,
  //         },
  //       });
  //       const response = await authAxios.post(
  //         "products/",
  //         {
  //           productId: this.props.product.id,
  //           quantity: this.state.amountToCart,
  //         },
  //         {
  //           "Content-Type": "application/json",
  //           params: { userid: decodedToken["user-id"] },
  //         }
  //       );
  //       // console.log(response);
  //       this.setState({ amountToCart: 0 });
  //       alert(
  //         `Dodano do koszyka ${this.props.product.name} w ilości ${this.state.amountToCart} `
  //       );
  //     } catch (err) {
  //       console.warn(err);
  //       alert("Nie udało się dodać produktu do koszyka");
  //     }
  //   }
  // }

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
                  step="1"
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
            <small className="col-md-3 text-muted"> Dostępna ilość</small>
            <div className="col-md-6 justify-content-around">
              <input
                type="number"
                min="0"
                size="7"
                step="1"
                value={this.state.quantity}
                onChange={this.handleQuantityInput.bind(this)}
                className="col-md-4 p-0"
              />
              <button id="save" key="save" className="col-md-4 btn btn-info">
                save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddProductCard;