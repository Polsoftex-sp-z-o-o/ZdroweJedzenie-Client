import React from "react";
import cartMock from "../utils/cartMock";
import productsMock from "../utils/productsMock";
import CartItem from "./CartItem";

class CartSummaryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    this.mocked_products = [
      {
        id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
        name: "Apple",
        description: "A red ball thing.",
        quantity: 1000,
        price: 4.2,
      },
      {
        id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
        name: "Apple",
        description: "A red ball thing.",
        quantity: 1000,
        price: 4.2,
      },
    ];
  }

  componentDidMount() {
    this.getCart();
  }

  increaseAmount() {}

  async getCart() {
    const mock = new cartMock();
    const cart_Mock = await mock.getCart();
    console.warn(cart_Mock.entity.items[0]);
    this.setState({
      ...this.state,
      items: cart_Mock.entity.items,
    });
    // this.getProductInfo(cart_Mock.entity.items[0].productId);
  }

  // async getProductInfo(id) {
  //   var mock = new productsMock();
  //   const product = await mock.getProductById(id);
  //   console.warn(product.entity);
  //   return product.entity;
  // }

  render() {
    return (
      <div className="content">
        <div className="row justify-content-center">
          <div className="col-md-6">
            {this.state.items.map((product) => (
              // <div
              //   key={product.productId}
              //   className="cart_container row mt-2 justify-content-between align-items-center"
              // >
              //   <div className="col-md-2 row justify-content-center">
              //     <img
              //       className="card-img-top"
              //       src="http://placehold.it/700x400"
              //       alt="IMG"
              //     />
              //   </div>
              //   <div className="col-md-2 row justify-content-center">
              //     {product.name}
              //   </div>
              //   <div className="col-md-2 row justify-content-around">
              //     <button className="cart_delete_btn col-md-2 row justify-content-center align-items-center">
              //       <i className="fas fa-minus"></i>
              //     </button>
              //     <div className="col-md-2 row justify-content-center ">
              //       {product.quantity}
              //     </div>
              //     <button className="cart_delete_btn col-md-2 row justify-content-center align-items-center">
              //       <i className="fas fa-plus"></i>
              //     </button>
              //   </div>
              //   <div className="col-md-2 row justify-content-center">
              //     <button className="cart_delete_btn col-md-6">
              //       <i className="fas fa-trash-alt"></i>
              //     </button>
              //   </div>

              //   <div className="col-md-2 row justify-content-center">
              //     {product.price} zł
              //   </div>
              // </div>
              <CartItem key={product.productId} product={product} />
            ))}
          </div>
        </div>

        <div className="row mt-3 justify-content-center">
          <div className="cart_navigation_container row justify-content-around">
            <button className="login_form__submit " type="submit">
              Back to shop
            </button>
            <button className="login_form__submit" type="submit">
              Buy
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CartSummaryView;

// pobieranie danych przez api

// sterowanie ilością produktów
// dopracowanie stylów
// dopisanie funkcji
