import Axios from "../../../Utils/Axios";

export function requestGetAddProductToCart(payload) {
  const response = Axios.post(`/api/addToCart`, payload);
  return response;
}

export function requestGetRemoveProductToCart(payload) {
  const response = Axios.post(`/api/decreaseQuantity`, payload);
  return response;
}

export function requestGetAllProductCart() {
  const response = Axios.get(`/api/getCartProducts`);
  return response;
}

export function requestGetCartItemCountCart() {
  const response = Axios.get(`/api/cartItemsCount`);
  return response;
}

export function requestRemoveProductCart(payload) {
  const response = Axios.post(`/api/removeProduct`,payload);
  return response;
}
