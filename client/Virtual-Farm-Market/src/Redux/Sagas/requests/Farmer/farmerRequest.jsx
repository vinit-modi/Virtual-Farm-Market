import Axios from "../../../../Utils/Axios";

export function requestCategoryListForProduct() {
  const response = Axios.get("/api/categoriesForProduct");
  return response;
}
export function requestUnitListForProduct() {
  const response = Axios.get("/api/getAllUnits");
  return response;
}
