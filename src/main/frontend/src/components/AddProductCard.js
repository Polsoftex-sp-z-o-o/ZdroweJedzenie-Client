import React from "react";

class AddProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      category: "",
      name: "",
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
  //         "cart/",
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

  // handleNameInput(e) {
  //   const amountToCartCurrent = e.target.validity.valid
  //     ? e.target.value
  //     : this.state.amountToCart;
  //   this.setState({ amountToCart: amountToCartCurrent });
  // }

  // handleCategoryInput(e) {
  //   const amountToCartCurrent = e.target.validity.valid
  //     ? e.target.value
  //     : this.state.amountToCart;
  //   this.setState({ amountToCart: amountToCartCurrent });
  // }

  // handleAmountInput(e) {
  //   const amountToCartCurrent = e.target.validity.valid
  //     ? e.target.value
  //     : this.state.amountToCart;
  //   this.setState({ amountToCart: amountToCartCurrent });
  // }

  handleDelete() {}

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
          <div className="card-body">
            <h1 className="card-title">
              <span className="badge  rounded-pill bg-success">
                {" "}
                Edytuj kategorie{" "}
              </span>{" "}
              <span> Edytuj nazwe produktu</span>
            </h1>
            <h5> Edytuj cene</h5>
            <p className="card-text"> Type description </p>
          </div>
          <div className="card-footer d-flex align-items-center justify-content-between">
            <small className="col-md-3 text-muted"> Edytuj ilość</small>
            <div className="col-md-4 justify-content-around">
              <input
                type="number"
                min="0"
                max="1000"
                size="7"
                step="1"
                value="1"
                onChange={() => {}}
                className="col-md-6 p-0"
              />
              <button
                id="buyButton"
                key="buyButton"
                className="col-md-4 btn btn-info"
              >
                <i className="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddProductCard;
