import { call, put } from "redux-saga/effects";
import {
  failRequestOrder,
  makeRequestOrder,
  setAllOrder,
} from "../../Reducers/OrderReducer";
import { requestAllOrder } from "../requests/orderRequest";

export function* fetchAllOrder() {
  try {
    yield put(makeRequestOrder());
    const response = yield call(requestAllOrder);

    response.status === 200
      ? yield put(setAllOrder(response.data.data))
      : yield put(failRequestOrder(response.data?.message));
  } catch (error) {
    yield put(failRequestOrder(error.message));
  }
}
