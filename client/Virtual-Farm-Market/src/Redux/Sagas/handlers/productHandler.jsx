import { call, put } from "redux-saga/effects";
import {
  failRequestProduct,
  makeRequestProduct,
  setAllProduct,
  setCategoryListProduct,
  setObjectProduct,
} from "../../Reducers/productReducer";
import {
  requestGetAllProduct,
  requestGetCategoryListProduct,
  requestGetObjectProduct,
  requestGetProductsByCategory_Product,
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

//Set All Products Selected By Category into productList:[] (Same as fetchGetAllProduct)
export function* fetchGetProductByCategory_Product({payload}) {
    try {
        yield put(makeRequestProduct());
    const response = yield call(requestGetProductsByCategory_Product,payload);
    
    response.status === 200
    ? yield put(setAllProduct(response.data.data))
    : yield put(failRequestProduct(response.data?.message));
} catch (error) {
    yield put(failRequestProduct(error.message));
  }
}

export function* fetchGetObjectProduct({payload}) {
  try {
    yield put(makeRequestProduct());
    const response = yield call(requestGetObjectProduct,payload);

    response.status === 200
      ? yield put(setObjectProduct(response.data.data))
      : yield put(failRequestProduct(response.data?.message));
  } catch (error) {
    yield put(failRequestProduct(error.message));
  }
}