import ReactDOM from "react-dom";
import React from "react";
import Search from "./Search";
import Product from "./Product";
import Fuse from "fuse.js";
import CategoriesView from "./CategoriesView";
import axios from "axios";
import UserStore from "../stores/UserStore";
import { observer } from "mobx-react";
import AddProductCard from "./AddProductCard";

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
    console.log(UserStore.isAdmin);

    this.getCategories = this.getCategories.bind(this);

    this.state = {
      products: [],
      filteredProducts: [],
      toogleRefresh: false,
      categories: [],
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  // refreshProducts() {
  //   this.setState({ toogleRefresh: true });
  // }

  async getProducts() {
    try {
      const response = await axios.get(
        "http://zdrowejedzenie.44b0bdc6651241b0874a.eastus.aksapp.io/gateway/products/",
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
      this.getCategories();
    } catch (err) {
      console.warn(err);
      alert("Nie udało się załadować produktów");
    }

    try {
      const response = await axios.get(
        "http://zdrowejedzenie.44b0bdc6651241b0874a.eastus.aksapp.io/gateway/products/getAllCategories/",
        null,
        { "Content-Type": "application/json" }
      );
      //const newProducts = response.data;
      
      console.log(response.data);
      this.setState({
        categories: response.data,

      });
      // this.setState({
      //   ...this.state,
      //   products: newProducts,
      //   filteredProducts: newProducts,
      // });
      // console.log(response);
      // console.log(this.state.products);
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
      categories_from_products: this.getCategories(),
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
      keys: [
        { name: "name", weight: 0.7 },
        { name: "description", weight: 0.3 },
      ],
      threshold: 0.4,
    });
    const result = fuse.search(query);
    const output = [];

    result.forEach((item) => {
      output.push(item.item);
    });

    return output;
  }

  getCategories() {
    var categories = [];
    this.state.products.forEach(function (product) {
      if (!categories.includes(product.category))
        categories.push(product.category);
    });
    
    console.log("KATEGORIE");
    console.log(categories);
    return categories;
  }

  render() {
    const products = this.state.filteredProducts.map((product) => {
      // console.log(product);
      return UserStore.isAdmin ? (
        <AddProductCard
          key={product.id}
          product={product}
          reload={this.getProducts.bind(this)}
        />
      ) : (
        <Product
          key={product.id}
          product={product}
          onReserve={this.props.onReserve}
          onUpdate={this.props.onUpdate}
          onDelete={this.props.onDelete}
        />
      );
    });

    return (
      <div>
        <CategoriesView
          parentHandler={this.handleCategories}
          categories_from_products={this.state.categories}
        />
        <Search
          parentHandler={this.handleSearch}
          categories={this.state.categories}
        />

        <div className="row">
          {UserStore.isAdmin && (
            <AddProductCard reload={this.getProducts.bind(this)} />
          )}
          {products}
        </div>

      </div>
    );
  }
}

export default observer(ProductsView);
