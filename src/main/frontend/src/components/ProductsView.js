import ReactDOM from "react-dom";
import React from "react";
import Search from "./Search";
import Product from "./Product";
import Fuse from "fuse.js"
import CategoriesView from "./CategoriesView" 


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

    this.mocked_products = [
      {
        id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
        name: "Masło",
        price: "15$",
        description: "Pyszne i tłuste.",
        category: "Dairy",
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

  handleSearch(query, category) {
    this.setState({
      filteredProducts: this.filterProducts(query, category),
    });
  }
  
  handleCategories(categories) {
    this.setState({
      filteredProducts: this.filterProductsByCategories(categories),
    });
  }

  filterProductsByCategories(categories) {
    var candidates = this.mocked_products;
	if(categories.length===0) return candidates;
    candidates = this.mocked_products.filter(
	  function(product){
	    return categories.includes(product.category);
    });
    return candidates;
  }

  filterProducts(query, category) {
    var candidates = this.mocked_products;
    if(category !== "All"){
      candidates = this.mocked_products.filter(
        function(product){
          return product.category === category;
      })
    }

    if (!query) {
      return candidates;
    }

    const fuse = new Fuse(candidates, {
      keys: ["name", "description"],
    })
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
	  	<CategoriesView parentHandler={this.handleCategories}/>
        <Search parentHandler={this.handleSearch} />
        <div className="row">{products}</div>
      </div>
    );
  }
}

export default ProductsView;
