import React from "react";

class Product extends React.Component {
  handleBuy() {}

  handleDelete() {}

  componentDidMount() {
    this.loadCategories();
  }

  loadCategories() {}

  render() {
    const controls = [];
    controls.push(
      <button
        id="buyButton"
        key="buyButton"
        onClick={this.handleBuy}
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

export default Product;
