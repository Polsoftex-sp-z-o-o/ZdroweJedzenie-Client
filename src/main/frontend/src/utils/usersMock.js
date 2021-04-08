import client from "../api/client"

class usersMock {
    usersMockGateway = "https://virtserver.swaggerhub.com/Atloas/ZdroweJedzenieAPIGateway/0.1.1/users";
    
    getUserById(id) {
        return client({
            method: "GET",
            path: this.usersMockGateway + "/" + id,
            headers: { Accept: "application/json" },
          }).then((response) => {
            return response;
          });
    }
}

export default usersMock;