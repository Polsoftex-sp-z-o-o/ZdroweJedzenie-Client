import React from "react";

class CategoriesView extends React.Component {
  constructor(props) {
    super(props);
    this.categories = [];
    this.state = {};
    this.categories_checkbox = [];
    var categories_from_products = [];
    categories_from_products.push("Wypieki");
    categories_from_products.push("Dzemy, miody i kremy");
    categories_from_products.push("Przetwory owocowe i warzywne");
    categories_from_products.push("Bakalie");
    categories_from_products.push("Warzywa i owoce");
    categories_from_products.push("Oleje, oliwy, octy");
    for(var category in categories_from_products){
      if(categories_from_products[category]==="Wypieki"){
        this.categories_checkbox.push(
            <label className="categories_container">
            {categories_from_products[category]}
            <input type="checkbox" onChange={this.handleSelectOnChangeWypieki} />
            <span className="categories_checkmark"></span>
          </label>);
      }
      else if(categories_from_products[category]==="Dzemy, miody i kremy"){
        this.categories_checkbox.push(
          <label className="categories_container">
          {categories_from_products[category]}
          <input type="checkbox" onChange={this.handleSelectOnChangeDzemy} />
          <span className="categories_checkmark"></span>
        </label>);
      }
      else if(categories_from_products[category]==="Przetwory owocowe i warzywne"){
        this.categories_checkbox.push(
          <label className="categories_container">
          {categories_from_products[category]}
          <input type="checkbox" onChange={this.handleSelectOnChangePrzetwory} />
          <span className="categories_checkmark"></span>
        </label>);
      }
      else if(categories_from_products[category]==="Bakalie"){
        this.categories_checkbox.push(
          <label className="categories_container">
          {categories_from_products[category]}
          <input type="checkbox" onChange={this.handleSelectOnChangeBakalie} />
          <span className="categories_checkmark"></span>
        </label>);
      }
      else if(categories_from_products[category]==="Warzywa i owoce"){
        this.categories_checkbox.push(
          <label className="categories_container">
          {categories_from_products[category]}
          <input type="checkbox" onChange={this.handleSelectOnChangeOwoce} />
          <span className="categories_checkmark"></span>
        </label>);
      }
      else if(categories_from_products[category]==="Oleje, oliwy, octy"){
        this.categories_checkbox.push(
          <label className="categories_container">
          {categories_from_products[category]}
          <input type="checkbox" onChange={this.handleSelectOnChangeOleje} />
          <span className="categories_checkmark"></span>
        </label>);
      }
    }
  }

  handleSelectOnChangeWypieki = (event) => {
    if (event.target.checked) this.categories.push("Wypieki");
    else {
      var categorieIndex = this.categories.indexOf("Wypieki");
      this.categories.splice(categorieIndex, 1);
    }
    this.props.parentHandler(this.categories);
  };

  handleSelectOnChangeDzemy = (event) => {
    if (event.target.checked) this.categories.push("Dzemy, miody i kremy");
    else {
      var categorieIndex = this.categories.indexOf("Dzemy, miody i kremy");
      this.categories.splice(categorieIndex, 1);
    }
    this.props.parentHandler(this.categories);
  };

  handleSelectOnChangePrzetwory = (event) => {
    if (event.target.checked) this.categories.push("Przetwory owocowe i warzywne");
    else {
      var categorieIndex = this.categories.indexOf("Przetwory owocowe i warzywne");
      this.categories.splice(categorieIndex, 1);
    }
    this.props.parentHandler(this.categories);
  };

  handleSelectOnChangeBakalie = (event) => {
    if (event.target.checked) this.categories.push("Bakalie");
    else {
      var categorieIndex = this.categories.indexOf("Bakalie");
      this.categories.splice(categorieIndex, 1);
    }
    this.props.parentHandler(this.categories);
  };

  handleSelectOnChangeOwoce = (event) => {
    if (event.target.checked) this.categories.push("Warzywa i owoce");
    else {
      var categorieIndex = this.categories.indexOf("Warzywa i owoce");
      this.categories.splice(categorieIndex, 1);
    }
    this.props.parentHandler(this.categories);
  };

  handleSelectOnChangeOleje = (event) => {
    if (event.target.checked) this.categories.push("Oleje, oliwy, octy");
    else {
      var categorieIndex = this.categories.indexOf("Oleje, oliwy, octy");
      this.categories.splice(categorieIndex, 1);
    }
    this.props.parentHandler(this.categories);
  };

  render() {
    return (
      <div className="categories_box">
        <div className="categories_title">Kategorie</div>
        <div className="categories_checkboxes">
          <div>{this.categories_checkbox}</div>
        </div>
      </div>
    );
  }
}

export default CategoriesView;
