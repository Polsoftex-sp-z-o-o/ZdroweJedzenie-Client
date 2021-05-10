import React from "react";

class OrderSummary extends React.Component {

  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    console.log("handleSubmit")
  }

  render() {
    return (

        <div className='order_summary'>
          <div className='order_summary_inner'>
            <h1>{this.props.text}</h1>
              <form className="register_form" onSubmit={this.handleSubmit}>
              <label className="summary_title">Płatność</label>

              <label className="register_form__label">Numer karty</label>
              <input
                className="register_form__input"
                name="address"
                type="text"
              />
              <label className="register_form__label">Data ważności</label>
              <input
                className="register_form__input"
                name="address"
                type="text"
              />
              <label className="register_form__label">Kod</label>
              <input
                className="register_form__input"
                name="address"
                type="text"
              />
              <input
                className="register_form__submit"
                type="submit"
                value="Zamów"
              />
              <input
                className="register_form__submit"
                type="submit"
                value="Wróć"
                onClick={this.props.closePopup}
              />
            </form>
          </div>
      </div>
      );
  }
}

export default OrderSummary;
