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
		<div className='blur_background_out'>
			<div className='order_summary'>
			  <div className='order_summary_inner'>
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
					className="order_form__submit"
					type="submit"
					value="Zamów"
				  />
				  <input
					className="order_form__return"
					type="submit"
					value="Wróć"
					onClick={this.props.closePopup}
				  />
				</form>
			  </div>
		  </div>
		</div>
      );
  }
}

export default OrderSummary;
