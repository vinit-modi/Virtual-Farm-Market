import { call, put } from "redux-saga/effects";
import { failRequestOrder, makeRequestOrder, setAllOrder } from "../../Reducers/OrderReducer";

export function* fetchAllOrder() {
    try {
      yield put(makeRequestOrder());
      const response = yield call(requestDeleteCardOrdermakeRequestOrder,payload);
  
      response.status === 200
        ? yield put(setAllOrder(response.data.message))
        : yield put(failRequestOrder(response.data?.message));
    } catch (error) {
      yield put(failRequestOrder(error.message));
    }
  }
  