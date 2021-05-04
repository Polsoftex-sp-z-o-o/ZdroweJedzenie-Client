import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.parentHandler = this.props.handler;
    this.query = "";
    this.category = "All";
  }

  handleInputOnChange = (event) => {
    this.query = event.target.value;
    this.props.parentHandler(this.query, this.category);
  };

  handleSelectOnChange = (event) => {
    this.category = event.target.value;
    this.props.parentHandler(this.query, this.category)
  }

  render() {
    return (
      <div className="search-bar">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            onChange={this.handleInputOnChange}
            placeholder="Szukaj"
          />
          <span className="input-group-addon"></span>
          <select className="form-control" onChange={this.handleSelectOnChange}>
            <option value="All">Wszystko</option>
            <option value="Fruit">Owoce</option>
            <option value="Vegetable">Warzywa</option>"
            <option value="Dairy">Nabiał</option>
          </select>
        </div>
      </div>
    );
  }
}

export default Search;
