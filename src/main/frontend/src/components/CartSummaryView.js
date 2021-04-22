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
      <div className="content">
        <div className="row align-items-center">
          <div className="col-md-3 temp">Obrazek</div>
          <div className="col-md-3 temp">Product Name</div>
          <div className="col-md-3 temp">Amount</div>
          <div className="col-md-3 temp">Delete and Price</div>
        </div>
      </div>
    );
  }
}

export default CartSummaryView;
