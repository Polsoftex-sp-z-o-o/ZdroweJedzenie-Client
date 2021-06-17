import React from "react";
import client from "../api/client";

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: "",
    };
  }

  componentDidMount() {
    this.getQuoteOfTheDay();
  }

  getQuoteOfTheDay() {
    client({
      method: "GET",
      path: "https://quotes.rest/qod?language=en",
      headers: { Accept: "application/json" },
    }).then((response) => {
      this.setState({
        quote: response.entity.contents.quotes[0].quote,
        author: response.entity.contents.quotes[0].author,
      });
    });
  }

  render() {
    return (
      <div className="card bg-light">
        <div className="card-body mx-auto" style={{ maxWidth: "80%" }}></div>
        <h4 className="card-title mt-3 text-center">
          Witaj w sklepie ze zdrowym jedzeniem!
        </h4>
        <div className="container">
          <div className="row align-items-center">
            <blockquote className="quote-box">
              <p className="quotation-mark">“</p>
              <p className="quote-text">{this.state.quote}</p>
              <hr></hr>
              <div className="blog-post-actions">
                <p className="blog-post-bottom pull-left">
                  {" "}
                  {this.state.author}{" "}
                </p>
              </div>
            </blockquote>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeView;
