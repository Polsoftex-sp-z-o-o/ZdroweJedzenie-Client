import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.parentHandler = this.props.handler;
  }

  handleOnChange = (event) => {
    var query = event.target.value;
    this.props.parentHandler(query);
  };

  render() {
    return (
      <div className="search-bar">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            onChange={this.handleOnChange}
            placeholder="Szukaj"
          />
          <span className="input-group-addon"></span>
          <select className="form-control">
            <option value="wszystko">Wszystko</option>
            <option value="owoce">Owoce</option>
            <option value="warzywa">Warzywa</option>"
            <option value="nabiał">Nabiał</option>
          </select>
        </div>
      </div>
    );
  }
}

export default Search;
