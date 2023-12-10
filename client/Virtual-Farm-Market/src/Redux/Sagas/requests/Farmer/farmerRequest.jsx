import Axios from "../../../../Utils/Axios";

export function requestCategoryListForProduct() {
  const response = Axios.get("/api/categoriesForProduct");
  return response;
}
export function requestUnitListForProduct() {
  const response = Axios.get("/api/getAllUnits");
  return response;
}

// export function requestAddProductFarmer(payload) {
//   const response = Axios.post("/api/addProduct", payload);
//   return response;
// }

export function requestAllOrderFarmer() {
  const response = Axios.get("/api/getAllOrdersForFarmer");
  return response;
}
export function requestUpdateStatusOrderFarmer(payload) {
  const response = Axios.post("/api/updateOrderStatus", payload);
  return response;
}
