import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.parentHandler = this.props.handler;
    this.query = "";
    this.category = "All";

    console.log("contructor")
    console.log(this.props.categories)
  }

  handleInputOnChange = (event) => {
    this.query = event.target.value;
    this.props.parentHandler(this.query, this.category);
  };

  handleSelectOnChange = (event) => {
    this.category = event.target.value;
    this.props.parentHandler(this.query, this.category)
  }

  createOptions() {
    return (
      this.props.categories.map((category, index) => {
        return <option key={category} value={category}>{category}</option>
      })
    );
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
            {this.createOptions()}
          </select>
        </div>
      </div>
    );
  }
}

export default Search;
