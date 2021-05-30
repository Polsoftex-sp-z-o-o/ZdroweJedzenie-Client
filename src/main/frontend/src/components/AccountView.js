import UsersMock from "../utils/usersMock";
import React from "react";
import HistoryOrders from "./HistoryOrders";

class AccountView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      address: "",
    };
  }

  componentDidMount() {
    this.getUserInformation().then((result) =>
      this.setState({
        id: result.entity.id,
        name: result.entity.name,
        address: result.entity.address,
      })
    );
  }

  getUserInformation() {
    let user = new UsersMock();
    return user.getUserById(0);
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Twoje dane: </h1>
          <h2 className="card-subtitle mb-2 text-muted">
            {" "}
            Godność: {this.state.name}{" "}
          </h2>
          <h2 className="card-text">
            {" "}
            Adres zamieszkania: {this.state.address}
          </h2>
        </div>
        <HistoryOrders></HistoryOrders>
      </div>
    );
  }
}

export default AccountView;
