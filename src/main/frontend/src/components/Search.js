import React from 'react';

const filterProducts = (products, query) => {
    if (!query) {
        return products;
    }

    return products.filter((product) => {
        const productName = product.name.toLowerCase();
        return productName.includes(query);
    });
};

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.parentHandler = this.props.handler;
        this.products = this.props.products;
        this.productsToShow = this.props.products;
    }

    handleOnChange = (event) => {
        var query = event.target.value;
        this.productsToShow = filterProducts(this.products, query)
        this.setState({temp: event.target.value});
        this.props.parentHandler(this.productsToShow);
    }

    render() {
        
        return (
            <div className="search-bar">
                <div className="input-group">
                    <input className="form-control"
                        type="text"
                        onChange = {this.handleOnChange}
                        placeholder="Szukaj"
                    />
                    <span class="input-group-addon"></span>
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
