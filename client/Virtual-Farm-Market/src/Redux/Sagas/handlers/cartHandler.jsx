import { call, put } from "redux-saga/effects";
import {
  failRequestCart,
  makeRequestCart,
  setAddProductToCart,
//   setAllItemsForCart,
  setAllProductsCart,
  setCartItemCountCart,
  setRemoveProductToCart,
} from "../../Reducers/cartReducer";
import {
  requestGetAddProductToCart,
//   requestGetAllItemForCart,
  requestGetAllProductCart,
  requestGetCartItemCountCart,
  requestGetRemoveProductToCart,
} from "../requests/cartRequest";

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

export function* fetchCartItemCountCart() {
  try {
    yield put(makeRequestCart());
    const response = yield call(requestGetCartItemCountCart);

    response.status === 200
      ? yield put(setCartItemCountCart(response.data.data))
      : yield put(failRequestCart(response.data?.message));
  } catch (error) {
    yield put(failRequestCart(error.message));
  }
}

// export function* fetchAllCartItemsCart() {
//   try {
//     yield put(makeRequestCart());
//     const response = yield call(requestGetAllItemForCart);

//     response.status === 200
//       ? yield put(setAllItemsForCart(response.data.data))
//       : yield put(failRequestCart(response.data?.message));
//   } catch (error) {
//     yield put(failRequestCart(error.message));
//   }
// }
