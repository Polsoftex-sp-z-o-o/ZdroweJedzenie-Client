import React from 'react';
import client from '../api/client';

class  ProductView  extends React.Component {
    render() {
        return (
           <div className="product">
            <div className="card-body mx-auto" style={{ maxWidth: "80%" }}></div>
            <h4 className="card-title mt-3 text-center">Witaj w sklepie ze zdrowym jedzeniem!</h4>
            <div className="container">
              <div className="row align-items-center">
                {this.props.name}
              </div>
            </div>
           </div>
        );
      }
}

class  ProductListView  extends React.Component {
    constructor(props) {
        super(props);
        this.state = [{
          name: "produkt 1",
          price: "",
          desc: "",
        },
        {
            name: "produkt 2",
            price: "",
            desc: "",
          }
        ];
      }
    returnProducts(){
        var products = [];
        for (var i=0; i < this.state.length; i++) {
            products.push(<ProductView value={this.state[i].name}/>);
        }   
    }
    render() {
      return (
        <div className="card bg-light">
            Produkty
            {this.returnProducts()}   
        </div>
      );
    }
  }

export default ProductListView;