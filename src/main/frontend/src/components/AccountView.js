import React from "react";
import HistoryOrders from "./HistoryOrders";
import { decodeToken } from "react-jwt";
import UserStore from "../stores/UserStore";
import axios from "axios";

class AccountView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      firstName: "",
      lastName: "", 
      address: "",
      roles: [{ name: ""},],
    };
  }

  componentDidMount() {
    this.getUserInformation();
  }

  async getUserInformation() {
    try {
      const apiURL =
        "http://zdrowejedzenie.44b0bdc6651241b0874a.eastus.aksapp.io/gateway/";
      const token = UserStore.token;
      const decodedToken = decodeToken(token);
      console.log(decodedToken["user-id"]);
      const authAxios = axios.create({
        baseURL: apiURL,
        headers: {
          Authorization: token,
        },
      });
      const response = await authAxios.get(
        apiURL + "users/" + decodedToken["user-id"] + "/",
        null,
        { "Content-Type": "application/json" }
      );

      const userInformation = response.data;
      console.log(userInformation);
      this.setState({
        id: userInformation.id,
        firstName: userInformation.firstName,
        lastName: userInformation.lastName, 
        address: userInformation.address,
        roles: userInformation.roles,
      });
    } catch (err) {
      console.warn(err);
      alert("Nie udało się załadować użytkownika!");
    }
   
  }



  render() {
    var roleBadge = (
      <span className="badge rounded-pill bg-success">Klient</span>
    );
    // TODO: swap based on role
    // <span className="badge rounded-pill bg-warning">Admin</span>

    return (
      <div className="card">
        <div className="card-body">
          <h1 className="card-title"> {roleBadge} Twoje dane: </h1>
          <h2 className="card-subtitle mb-2 text-muted">
            {" "}
            Imię: {this.state.firstName}{" "}
          </h2>
          <h2 className="card-subtitle mb-2 text-muted">
            {" "}
            Nazwisko: {this.state.lastName}{" "}
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
