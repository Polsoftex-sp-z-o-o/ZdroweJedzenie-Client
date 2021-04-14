import ReactDOM from 'react-dom';
import React from 'react';

class  ProductView  extends React.Component {

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
        Kup
      </button>
    );

    const categories = 
      Array.isArray(this.state.categories) && this.state.categories.length
        ? this.state.categories.map((category) => (
            <div key={category.name}> {category.name} </div>
          ))
        : null;

    return (
      <tr>
        <td> {this.props.product.name} </td>
        <td> {this.props.product.price} </td>
        <td> {this.props.product.description} </td>
        <td> {categories} </td>
        <td> {controls} </td> 
      </tr>
    );
  }
}

class  ProductListView  extends React.Component {
  constructor(props) {
    super(props);
    this.handleNavFirst = this.handleNavFirst.bind(this);
    this.handleNavPrev = this.handleNavPrev.bind(this);
    this.handleNavNext = this.handleNavNext.bind(this);
    this.handleNavLast = this.handleNavLast.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.mocked_products = [{name: "produkt 1", price: "cena 1", description: "description 1"}, 
                            {name: "produkt 2", price: "cena 2", description: "description 2"}];
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

  render() {
    const products = this.mocked_products.map((product) => (
      <ProductView
        product={product}
        onReserve={this.props.onReserve}
        onUpdate={this.props.onUpdate}
        onDelete={this.props.onDelete}
      />
    ));

    return (
      <div>
        <div className="col">
          <div className="row">
            <table className="table table-striped table-bordered table-hover">
              <tbody>
                <tr>
                  <th> Nazwa produktu: </th>
                  <th> Cena: </th>
                  <th> Opis: </th>
                  <th> Kategorie: </th>
                  <th> Akcje: </th>
                </tr>
                {products}
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col">
              <div className="input-group">
                <div className="input-group-prepend">
                  {
                    //<span className="input-group-text"> Entries per page: </span>
                  }
                </div>
                {<input
                  //ref="pageSize"
                  //defaultValue={this.props.pageSize}
                  //onInput={this.handleInput}
                  //id="pageSizeInput"
                />
                }
              </div>
            </div>
            <div className="col"> {
            //navLinks
            } </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductListView;