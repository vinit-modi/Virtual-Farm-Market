import { call, put } from "redux-saga/effects";
import {
  failAdminRequest,
  makeAdminRequest,
  setAdminChangePassword,
  setAdminEditProfile,
  setAdminLogin,
  setAdminProfileData,
} from "../../Reducers/adminReducer";
import {
  requestAdminChangePassword,
  requestAdminEditProfile,
  requestAdminLogin,
  requestAdminProfileData,
} from "../requests/adminRequest";

export function* fetchAdminLogin({ payload }) {
  try {
    yield put(makeAdminRequest());
    const response = yield call(requestAdminLogin, payload);
    if (response.data.message === `Welcome! You have successfully logged in`) {
      yield put(
        setAdminLogin({
          message: response.data.message,
          id: response.data.data._id,
        })
      );
    } else {
      yield put(failAdminRequest(response.data.message));
    }
  } catch (error) {
    yield put(failAdminRequest(error.message));
  }
}

export function* fetchAdminProfileData({ payload }) {
  try {
    yield put(makeAdminRequest());
    const response = yield call(requestAdminProfileData, payload);
    if (response.status === 200) {
      yield put(setAdminProfileData(response.data.data));
    } else {
      yield put(failAdminRequest(response.data.message));
    }
  } catch (error) {
    yield put(failAdminRequest(error.message));
  }
}
export function* fetchAdminEditProfile({ payload }) {
  try {
    yield put(makeAdminRequest());
    const response = yield call(requestAdminEditProfile, payload);
    if (response.status === 200) {
      yield put(setAdminEditProfile(response.data.message));
    } else {
      yield put(failAdminRequest(response.data.message));
    }
  } catch (error) {
    yield put(failAdminRequest(error.message));
  }
}
export function* fetchAdminChangePassword({ payload }) {
  try {
    yield put(makeAdminRequest());
    const response = yield call(requestAdminChangePassword, payload);
    if (response.data.message === ``) {
      yield put(setAdminChangePassword(response.data.message));
    } else {
      yield put(failAdminRequest(response.data.message));
    }
  } catch (error) {
    yield put(failAdminRequest(error.message));
  }
}
