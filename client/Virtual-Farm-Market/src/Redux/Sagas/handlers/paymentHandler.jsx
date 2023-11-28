import { call, put } from "redux-saga/effects";
import {
  failRequestPayment,
  makeRequestPayment,
  setAddNewCardPayment,
  setAllCardPayment,
  setDeleteCardPayment,
  setMakeDefaultCardPayment,
  setMakePayment,
} from "../../Reducers/paymentReducer";
import {
  requestAddNewCardPayment,
  requestAllCardPayment,
  requestDeleteCardPayment,
  requestMakeDefaultCardPayment,
  requestMakePayment,
} from "../requests/paymentRequest";

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

export function* fetchAllCardPayment() {
  try {
    yield put(makeRequestPayment());
    const response = yield call(requestAllCardPayment);
    if (response.status === 200) {
      yield put(setAllCardPayment(response.data.data));
    } else {
      yield put(failRequestPayment(response.data.message));
    }
  } catch (error) {
    yield put(failRequestPayment(error.message));
  }
}

export function* fetchDeleteCardPayment({ payload }) {
  try {
    yield put(makeRequestPayment());
    const response = yield call(requestDeleteCardPayment, payload);
    if (response.status === 200) {
      yield put(setDeleteCardPayment(response.data.message));
    } else {
      yield put(failRequestPayment(response.data.message));
    }
  } catch (error) {
    yield put(failRequestPayment(error.message));
  }
}

export function* fetchMakeDefaultCardPayment({ payload }) {
  try {
    yield put(makeRequestPayment());
    const response = yield call(requestMakeDefaultCardPayment, payload);
    if (response.status === 200) {
      yield put(setMakeDefaultCardPayment(response.data.message));
    } else {
      yield put(failRequestPayment(response.data.message));
    }
  } catch (error) {
    yield put(failRequestPayment(error.message));
  }
}

export function* fetchMakePayment({ payload }) {
  try {
    yield put(makeRequestPayment());
    const response = yield call(requestMakePayment, payload);
    if (response.status === 200) {
      yield put(
        setMakePayment({
          message: response.data.message,
          paymentSuccess: response.data.data,
        })
      );
    } else {
      yield put(failRequestPayment(response.data.message));
    }
  } catch (error) {
    yield put(failRequestPayment(error.message));
  }
}
