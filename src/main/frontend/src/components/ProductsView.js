import ReactDOM from "react-dom";
import React from "react";
import Search from "./Search";
import Product from "./Product";
import Fuse from "fuse.js";
import CategoriesView from "./CategoriesView";
import axios from "axios";

class ProductsView extends React.Component {
  constructor(props) {
    super(props);
    this.handleNavFirst = this.handleNavFirst.bind(this);
    this.handleNavPrev = this.handleNavPrev.bind(this);
    this.handleNavNext = this.handleNavNext.bind(this);
    this.handleNavLast = this.handleNavLast.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCategories = this.handleCategories.bind(this);

    this.state = {
      products: [],
      filteredProducts: [],
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  async getProducts() {
    try {
      const response = await axios.get(
        "http://zdrowejedzenie.fe6a0d090dd54915b798.eastus.aksapp.io/gateway/products/",
        null,
        { "Content-Type": "application/json" }
      );
      const newProducts = response.data;

      this.setState({
        ...this.state,
        products: newProducts,
        filteredProducts: newProducts,
      });
      console.log(response);
      console.log(this.state.products);
    } catch (err) {
      console.warn(err);
      alert("Nie udało się załadować produktów");
    }
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

  handleSearch(query, category) {
    this.setState({
      ...this.state,
      filteredProducts: this.filterProducts(query, category),
    });
  }

  handleCategories(categories) {
    this.setState({
      ...this.state,
      filteredProducts: this.filterProductsByCategories(categories),
    });
  }

  filterProductsByCategories(categories) {
    var candidates = this.state.products;
    if (categories.length === 0) return candidates;
    candidates = this.state.products.filter(function (product) {
      return categories.includes(product.category);
    });
    return candidates;
  }

  filterProducts(query, category) {
    var candidates = this.state.products;
    if (category !== "All") {
      candidates = this.state.products.filter(function (product) {
        return product.category === category;
      });
    }

    if (!query) {
      return candidates;
    }

    const fuse = new Fuse(candidates, {
      keys: ["name", "description"],
    });
    const result = fuse.search(query);
    const output = [];

    result.forEach((item) => {
      output.push(item.item);
    });

    return output;
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
        <CategoriesView parentHandler={this.handleCategories} />
        <Search parentHandler={this.handleSearch} />
        <div className="row">{products}</div>
      </div>
    );
  }
}

export default ProductsView;
