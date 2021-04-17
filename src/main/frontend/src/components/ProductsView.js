import ReactDOM from "react-dom";
import React from "react";
import Search from "./Search";
import Product from "./Product";

class ProductsView extends React.Component {
  constructor(props) {
    super(props);
    this.handleNavFirst = this.handleNavFirst.bind(this);
    this.handleNavPrev = this.handleNavPrev.bind(this);
    this.handleNavNext = this.handleNavNext.bind(this);
    this.handleNavLast = this.handleNavLast.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.mocked_products = [
      {
        id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
        name: "Masło",
        price: "15$",
        description: "Pyszne i tłuste.",
        category: "Fruit",
        quantity: 1000,
      },
      {
        id: "d290f1ee-6c54-4b01-90e6-d701748f0852",
        name: "Jabłka Champion",
        price: "10 $/kg",
        description: "Twarde ale słodiutkie.",
        category: "Fruit",
        quantity: 2317,
      },
      {
        id: "d290f1ee-6c54-4b01-90e6-d701748f0853",
        name: "Jabłka Zwykłe",
        price: "9 $/kg",
        description: "Twarde i kwaśne.",
        category: "Fruit",
        quantity: 69,
      },
      {
        id: "d290f1ee-6c54-4b01-90e6-d701748f0854",
        name: "Ksylitol",
        price: "420 $/kg",
        description: "Gdy masz nadmiar cukru bo jesteś zbyt słodki.",
        category: "Fruit",
        quantity: 100,
      },
    ];

    this.state = {
      filteredProducts: this.mocked_products,
    };
  }

  handleInput(e) {
    e.preventDefault();
    const pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
    if (/^[0-9]+$/.test(pageSize)) {
      this.props.updatePageSize(pageSize);
    } else {
      ReactDOM.findDOMNode(this.refs.pageSize).value = pageSize.substring(
        0,
        pageSize.length - 1
      );
    }
  }

  handleNavFirst(e) {
    e.preventDefault();
    this.props.onNavigate(this.props.links.first.href);
  }

  handleNavPrev(e) {
    e.preventDefault();
    this.props.onNavigate(this.props.links.prev.href);
  }

  handleNavNext(e) {
    e.preventDefault();
    this.props.onNavigate(this.props.links.next.href);
  }

  handleNavLast(e) {
    e.preventDefault();
    this.props.onNavigate(this.props.links.last.href);
  }

  handleSearch(query) {
    this.setState({
      filteredProducts: this.filterProducts(query),
    });
  }

  filterProducts(query) {
    if (!query) {
      return this.mocked_products;
    }

    return this.mocked_products.filter((product) => {
      const productName = product.name.toLowerCase();
      return productName.includes(query);
    });
  }

  render() {
    const products = this.state.filteredProducts.map((product) => (
      <Product
        key={product.id}
        product={product}
        onReserve={this.props.onReserve}
        onUpdate={this.props.onUpdate}
        onDelete={this.props.onDelete}
      />
    ));

    return (
      <div>
        <Search parentHandler={this.handleSearch} />
        <div className="row">{products}</div>
      </div>
    );
  }
}

export default ProductsView;
