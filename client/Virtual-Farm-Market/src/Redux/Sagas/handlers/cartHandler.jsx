import { call, put } from "redux-saga/effects";
import {
  failRequestCart,
  makeRequestCart,
  setAddProductToCart,
  setAllProductsCart,
  setRemoveProductToCart,
} from "../../Reducers/cartReducer";
import { requestGetAddProductToCart, requestGetAllProductCart, requestGetRemoveProductToCart } from "../requests/cartRequest";

export function* fetchGetAddProductToCart({ payload }) {
  try {
    yield put(makeRequestCart());
    const response = yield call(requestGetAddProductToCart, payload);

    response.status === 200
      ? yield put(setAddProductToCart(response.data.data))
      : yield put(failRequestCart(response.data?.message));
  } catch (error) {
    yield put(failRequestCart(error.message));
  }
}

export function* fetchGetRemoveProductToCart({ payload }) {
  try {
    yield put(makeRequestCart());
    const response = yield call(requestGetRemoveProductToCart, payload);

    response.status === 200
      ? yield put(setRemoveProductToCart(response.data.data))
      : yield put(failRequestCart(response.data?.message));
  } catch (error) {
    yield put(failRequestCart(error.message));
  }
}
export function* fetchGetAllProductCart() {
  try {
    yield put(makeRequestCart());
    const response = yield call(requestGetAllProductCart);

    response.status === 200
      ? yield put(setAllProductsCart(response.data.data))
      : yield put(failRequestCart(response.data?.message));
  } catch (error) {
    yield put(failRequestCart(error.message));
  }
}
