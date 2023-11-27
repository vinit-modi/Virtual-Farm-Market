import { call, put } from "redux-saga/effects";
import {
  failRequestStripePayment,
  makeRequestStripePayment,
  setAddCardStripePayment,
  setAllCardStripePayment,
  setDeleteCardStripePayment,
  setMakeDefaultCardStripePayment,
} from "../../Reducers/stripePaymentReducer";
import { requestAddCardStripePayment, requestAllCardStripePayment, requestDeleteCardStripePayment, requestMakeDefaultCardStripePayment } from "../requests/stripePaymentRequest";

export function* fetchAddCardStripePayment({ payload }) {
  try {
    yield put(makeRequestStripePayment());
    const response = yield call(requestAddCardStripePayment, payload);

    response.status === 200
      ? yield put(setAddCardStripePayment(response.data.message))
      : yield put(failRequestStripePayment(response.data?.message));
  } catch (error) {
    yield put(failRequestStripePayment(error.message));
  }
}

export function* fetchAllCardStripePayment() {
  try {
    yield put(makeRequestStripePayment());
    const response = yield call(requestAllCardStripePayment);

    response.status === 200
      ? yield put(setAllCardStripePayment(response.data.data))
      : yield put(failRequestStripePayment(response.data?.message));
  } catch (error) {
    yield put(failRequestStripePayment(error.message));
  }
}

export function* fetchMakeDefaultCardStripePayment({payload}) {
  try {
    yield put(makeRequestStripePayment());
    const response = yield call(requestMakeDefaultCardStripePayment,payload);

    response.status === 200
      ? yield put(setMakeDefaultCardStripePayment(response.data.message))
      : yield put(failRequestStripePayment(response.data?.message));
  } catch (error) {
    yield put(failRequestStripePayment(error.message));
  }
}

export function* fetchDeleteCardStripePayment({payload}) {
  try {
    yield put(makeRequestStripePayment());
    const response = yield call(requestDeleteCardStripePayment,payload);

    response.status === 200
      ? yield put(setDeleteCardStripePayment(response.data.message))
      : yield put(failRequestStripePayment(response.data?.message));
  } catch (error) {
    yield put(failRequestStripePayment(error.message));
  }
}
