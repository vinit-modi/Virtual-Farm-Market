import { call, put } from "redux-saga/effects";
import {
  failRequestFarmer,
  makeRequestFarmer,
  // setAddProductFarmer,
  setAllOrderFarmer,
  setCategoryListForProductFarmer,
  setUnitListForProductFarmer,
  setUpdateStatusOrderFarmer,
} from "../../../Reducers/Farmer/farmerReducer";
import {
  // requestAddProductFarmer,
  requestAllOrderFarmer,
  requestCategoryListForProduct,
  requestUnitListForProduct,
  requestUpdateStatusOrderFarmer,
} from "../../requests/Farmer/farmerRequest";

export function* fetchCategoryListForProductFarmer() {
  try {
    yield put(makeRequestFarmer());
    const response = yield call(requestCategoryListForProduct);

    response.status === 200
      ? yield put(setCategoryListForProductFarmer(response.data.data))
      : yield put(failRequestFarmer(response.data?.message));
  } catch (error) {
    yield put(failRequestFarmer(error.message));
  }
}

export function* fetchUnitListForProductFarmer() {
  try {
    yield put(makeRequestFarmer());
    const response = yield call(requestUnitListForProduct);

    response.status === 200
      ? yield put(setUnitListForProductFarmer(response.data.data))
      : yield put(failRequestFarmer(response.data?.message));
  } catch (error) {
    yield put(failRequestFarmer(error.message));
  }
}

// export function* fetchAddProductFarmer(payload) {
//   try {
//     yield put(makeRequestFarmer());
//     const response = yield call(requestAddProductFarmer, payload);

//     response.status === 200
//       ? yield put(setAddProductFarmer(response.data.message))
//       : yield put(failRequestFarmer(response.data?.message));
//   } catch (error) {
//     yield put(failRequestFarmer(error.message));
//   }
// }

export function* fetchAllOrderFarmer() {
  try {
    yield put(makeRequestFarmer());
    const response = yield call(requestAllOrderFarmer);

    response.status === 200
      ? yield put(setAllOrderFarmer(response.data.data))
      : yield put(failRequestFarmer(response.data?.message));
  } catch (error) {
    yield put(failRequestFarmer(error.message));
  }
}

export function* fetchUpdateStatusOrderFarmer({ payload }) {
  try {
    yield put(makeRequestFarmer());
    const response = yield call(requestUpdateStatusOrderFarmer, payload);

    response.status === 200
      ? yield put(setUpdateStatusOrderFarmer(response.data.message))
      : yield put(failRequestFarmer(response.data?.message));
  } catch (error) {
    yield put(failRequestFarmer(error.message));
  }
}
