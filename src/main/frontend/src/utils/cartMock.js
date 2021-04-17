import client from "../api/client";

class cartMock {
  cartMockGateway =
    "https://virtserver.swaggerhub.com/Atloas/ZdroweJedzenieAPIGateway/0.2/cart";

  getCart() {
    return client({
      method: "GET",
      path: this.cartMockGateway,
      headers: { Accept: "application/json" },
    }).then((response) => {
      return response;
    });
  }
}

export default cartMock;
