import { call, put } from "redux-saga/effects";
import {
  failRequestAddress,
  makeRequestAddress,
  setAddNewAddress,
  setAllAddress,
  setDeleteAddress,
  setEditAddress,
  setMakeDefaultAddress,
  setObjectAddress,
} from "../../Reducers/addressReducer";
import {
  requestAddNewAddress,
  requestAllAddress,
  requestDeleteAddress,
  requestEditAddress,
  requestMakeDefaultAddress,
  requestObjectAddress,
} from "../requests/addressRequest";

export function* fetchAddNewAddress({ payload }) {
  try {
    yield put(makeRequestAddress());
    const response = yield call(requestAddNewAddress, payload);

    response.status === 200
      ? yield put(setAddNewAddress(response.data.message))
      : yield put(failRequestAddress(response.data?.message));
  } catch (error) {
    yield put(failRequestAddress(error.message));
  }
}

export function* fetchAllAddress() {
  try {
    yield put(makeRequestAddress());
    const response = yield call(requestAllAddress);

    response.status === 200
      ? yield put(setAllAddress(response.data.data))
      : yield put(failRequestAddress(response.data?.message));
  } catch (error) {
    yield put(failRequestAddress(error.message));
  }
}

export function* fetchDeleteAddress({ payload }) {
  try {
    yield put(makeRequestAddress());
    const response = yield call(requestDeleteAddress, payload);

    response.status === 200
      ? yield put(setDeleteAddress(response.data.message))
      : yield put(failRequestAddress(response.data?.message));
  } catch (error) {
    yield put(failRequestAddress(error.message));
  }
}

export function* fetchObjectAddress({ payload }) {
  try {
    yield put(makeRequestAddress());
    const response = yield call(requestObjectAddress, payload);

    response.status === 200
      ? yield put(setObjectAddress(response.data.data))
      : yield put(failRequestAddress(response.data?.message));
  } catch (error) {
    yield put(failRequestAddress(error.message));
  }
}

export function* fetchEditAddress({ payload }) {
  try {
    yield put(makeRequestAddress());
    const response = yield call(requestEditAddress, payload);

    response.status === 200
      ? yield put(setEditAddress(response.data.message))
      : yield put(failRequestAddress(response.data?.message));
  } catch (error) {
    yield put(failRequestAddress(error.message));
  }
}

export function* fetchMakeDefaultAddress({ payload }) {
  try {
    yield put(makeRequestAddress());
    const response = yield call(requestMakeDefaultAddress, payload);

    response.status === 200
      ? yield put(
          setMakeDefaultAddress({
            message: response.data.message,
            addressList: response.data.data,
          })
        )
      : yield put(failRequestAddress(response.data?.message));
  } catch (error) {
    yield put(failRequestAddress(error.message));
  }
}
