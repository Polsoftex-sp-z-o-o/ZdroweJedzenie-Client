import ReactDOM from 'react-dom';
import React from 'react';

import Product from './Product';

class ProductsView extends React.Component {
  constructor(props) {
    super(props);
    this.handleNavFirst = this.handleNavFirst.bind(this);
    this.handleNavPrev = this.handleNavPrev.bind(this);
    this.handleNavNext = this.handleNavNext.bind(this);
    this.handleNavLast = this.handleNavLast.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.mocked_products = [{ name: "Masło", price: "15$", description: "Pyszne i tłuste." },
    { name: "Jabłka Champion", price: "10 $/kg", description: "Twarde ale słodiutkie." },
    { name: "Ksylitol", price: "420 $/kg", description: "Gdy masz nadmiar cukru bo jesteś zbyt słodki." }];
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
      <Product
        product={product}
        onReserve={this.props.onReserve}
        onUpdate={this.props.onUpdate}
        onDelete={this.props.onDelete}
      />
    ));

    return (
      <div>
        <div className="row">
          <div className="col-lg-9">
            <div className="row">
              {products}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductsView;