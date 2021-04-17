import client from "../api/client";

class productsMock {
  productsMockGateway =
    "https://virtserver.swaggerhub.com/Atloas/ZdroweJedzenieAPIGateway/0.2/products";

  getProducts() {
    return client({
      method: "GET",
      path: this.productsMockGateway,
      headers: { Accept: "application/json" },
    }).then((response) => {
      return response;
    });
  }
  getProductById(id) {
    return client({
      method: "GET",
      path: this.productsMockGateway + "/" + id,
      headers: { Accept: "application/json" },
    }).then((response) => {
      return response;
    });
  }
}

export default productsMock;
