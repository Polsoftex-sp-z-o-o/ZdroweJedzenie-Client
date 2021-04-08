import client from "../api/client"

class ordersMock {
    ordersMockGateway = "https://virtserver.swaggerhub.com/Atloas/ZdroweJedzenieAPIGateway/0.1.1/orders";

    getOrders() {
        return client({
            method: "GET",
            path: this.ordersMockGateway,
            headers: { Accept: "application/json" },
          }).then((response) => {
            return response;
          });
    }
    getOrderById(id) {
        return client({
            method: "GET",
            path: this.ordersMockGateway + "/" + id,
            headers: { Accept: "application/json" },
          }).then((response) => {
            return response;
          });
    }
    
}

export default ordersMock;