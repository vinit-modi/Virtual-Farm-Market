import { call, put } from "redux-saga/effects";
import { failRequestPayment, makeRequestPayment, setAddNewCardPayment } from "../../Reducers/paymentReducer";
import { requestAddNewCardPayment } from "../requests/paymentRequest";

export function* fetchAddNewCardPayment({ payload }) {
    try {
      yield put(makeRequestPayment());
      const response = yield call(requestAddNewCardPayment, payload);
      if (response.status === 200) {
        yield put(setAddNewCardPayment(response.data.message));
      } else {
        yield put(failRequestPayment(response.data.message));
      }
    } catch (error) {
      yield put(failRequestPayment(error.message));
    }
  }