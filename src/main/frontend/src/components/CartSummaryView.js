import React from "react";

class CartSummaryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  async getCart() {}

  render() {
    return (
      <div className="content ">
        <div className="row justify-content-center">
          <div className="col-md-2">Obrazek</div>
          <div className="col-md-2">Product Name</div>
          <div className="col-md-2">Amount</div>
          <div className="col-md-2">Delete and Price</div>
        </div>
      </div>
    );
  }
}

export default CartSummaryView;
