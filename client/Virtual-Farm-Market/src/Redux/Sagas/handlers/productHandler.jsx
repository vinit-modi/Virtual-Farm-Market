import { call, put } from "redux-saga/effects";
import {
  failRequestProduct,
  makeRequestProduct,
  setAllProduct,
  setCategoryListProduct,
} from "../../Reducers/productReducer";
import {
  requestGetAllProduct,
  requestGetCategoryListProduct,
} from "../requests/productRequest";

export function* fetchGetCategoryListProduct() {
  try {
    yield put(makeRequestProduct());
    const response = yield call(requestGetCategoryListProduct);

    response.status === 200
      ? yield put(setCategoryListProduct(response.data.data))
      : yield put(failRequestProduct(response.data?.message));
  } catch (error) {
    yield put(failRequestProduct(error.message));
  }
}
export function* fetchGetAllProduct() {
  try {
    yield put(makeRequestProduct());
    const response = yield call(requestGetAllProduct);

    response.status === 200
      ? yield put(setAllProduct(response.data.data))
      : yield put(failRequestProduct(response.data?.message));
  } catch (error) {
    yield put(failRequestProduct(error.message));
  }
}
