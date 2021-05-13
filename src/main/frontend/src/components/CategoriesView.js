import React from "react";

class CategoriesView extends React.Component {
  constructor(props) {
    super(props);
    this.categories = [];
    this.state = {};
  }

  handleSelectOnChangeDairy = (event) => {
    if (event.target.checked) this.categories.push("Wypieki");
    else {
      var categorieIndex = this.categories.indexOf("Wypieki");
      this.categories.splice(categorieIndex, 1);
    }
    this.props.parentHandler(this.categories);
  };

  handleSelectOnChangeFruit = (event) => {
    if (event.target.checked) this.categories.push("Fruit");
    else {
      var categorieIndex = this.categories.indexOf("Fruit");
      this.categories.splice(categorieIndex, 1);
    }
    this.props.parentHandler(this.categories);
  };

  handleSelectOnChangeVegetable = (event) => {
    if (event.target.checked) this.categories.push("Vegetable");
    else {
      var categorieIndex = this.categories.indexOf("Vegetable");
      this.categories.splice(categorieIndex, 1);
    }
    this.props.parentHandler(this.categories);
  };

  handleSelectOnChangeMeat = (event) => {
    if (event.target.checked) this.categories.push("Meat");
    else {
      var categorieIndex = this.categories.indexOf("Meat");
      this.categories.splice(categorieIndex, 1);
    }
    this.props.parentHandler(this.categories);
  };

  render() {
    return (
      <div className="categories_box">
        <div className="categories_title">Kategorie</div>
        <div className="categories_checkboxes">
          <label className="categories_container">
            Wypieki
            <input type="checkbox" onChange={this.handleSelectOnChangeDairy} />
            <span className="categories_checkmark"></span>
          </label>

          <label className="categories_container">
            Fruit
            <input type="checkbox" onChange={this.handleSelectOnChangeFruit} />
            <span className="categories_checkmark"></span>
          </label>

          <label className="categories_container">
            Vegetable
            <input
              type="checkbox"
              onChange={this.handleSelectOnChangeVegetable}
            />
            <span className="categories_checkmark"></span>
          </label>

          <label className="categories_container">
            Meat
            <input type="checkbox" onChange={this.handleSelectOnChangeMeat} />
            <span className="categories_checkmark"></span>
          </label>
        </div>
      </div>
    );
  }
}

export default CategoriesView;
