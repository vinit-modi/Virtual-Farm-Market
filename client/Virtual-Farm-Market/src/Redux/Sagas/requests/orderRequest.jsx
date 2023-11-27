
export function requestAllOrder() {
    const response = Axios.get("/api/getAllOrders");
    return response;
  }
  