import React from 'react';


class Product extends React.Component {

  constructor(props) {
    super(props);
    // this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      name: "",
      price: "",
      description: "",
      categories: [],
    };
  }

  handleBuy() {
  }

  handleDelete() {
  }

  componentDidMount() {
    this.loadCategories();
  }

  loadCategories() {
  }

  render() {
    const controls = [];
    controls.push(
      <button
        key="buyButton"
        onClick={this.handleBuy}
        className="btn btn-info"
      >
        <i class="fas fa-shopping-cart"></i>
      </button>
    );

    const categories =
      Array.isArray(this.state.categories) && this.state.categories.length
        ? this.state.categories.map((category) => (
          <div key={category.name}> {category.name} </div>
        ))
        : null;

    return (
      <div className="col-lg-4 col-md-6 mb-4">
        <div className="card h-100">
          <span><img className="card-img-top" src="http://placehold.it/700x400" alt="" /></span>
          <div className="card-body">
            <h4 className="card-title">
              <h1> {this.props.product.name} </h1>
            </h4>
            <h5> {this.props.product.price}  </h5>
            <p className="card-text"> {this.props.product.description} </p>
          </div>
          <div className="card-footer">
            <small className="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
            <span> {controls} </span> <span> {categories} </span>
          </div>
        </div>
      </div>

    );
  }
}

export default Product;