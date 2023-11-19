import { call, put } from "redux-saga/effects";
import { failRequestFarmer, makeRequestFarmer, setCategoryListForProductFarmer, setUnitListForProductFarmer } from "../../../Reducers/Farmer/farmerReducer";
import { requestCategoryListForProduct, requestUnitListForProduct } from "../../requests/Farmer/farmerRequest";

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
  