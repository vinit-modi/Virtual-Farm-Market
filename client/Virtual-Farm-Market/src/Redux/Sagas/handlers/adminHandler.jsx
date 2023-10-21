import { call, put } from "redux-saga/effects";
import {
  failAdminRequest,
  makeAdminRequest,
  setAdminChangePassword,
  setAdminEditProfile,
  setAdminLogin,
  setAdminProfileData,
  setAdminSideUserList,
  setAdminUpdateUserProfile,
  setAdminUserDeleteRequest,
  setAdminUserEditObj,
} from "../../Reducers/adminReducer";
import {
  requestAdminChangePassword,
  requestAdminEditProfile,
  requestAdminLogin,
  requestAdminProfileData,
  requestAdminSideUserList,
  requestAdminUpdateUserProfile,
  requestAdminUserDeleteRequest,
  requestAdminUserEditObj,
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
    if (response.data.message === `Password changed successfully`) {
      yield put(setAdminChangePassword(response.data.message));
    } else {
      yield put(failAdminRequest(response.data.message));
    }
  } catch (error) {
    yield put(failAdminRequest(error.message));
  }
}
export function* fetchAdminSideUserList({ payload }) {
  try {
    yield put(makeAdminRequest());
    const response = yield call(requestAdminSideUserList, payload);
    if (response.data.data) {
      yield put(setAdminSideUserList(response.data?.data));
    } else {
      yield put(failAdminRequest(response.data.message));
    }
  } catch (error) {
    yield put(failAdminRequest(error.message));
  }
}
export function* fetchAdminUserDeleteRequest({ payload }) {
  try {
    yield put(makeAdminRequest());
    const response = yield call(requestAdminUserDeleteRequest, payload);
    if (response.data.message === `User deleted successfully.`) {
      yield put(setAdminUserDeleteRequest(response.data.message));
    } else {
      yield put(failAdminRequest(response.data.message));
    }
  } catch (error) {
    yield put(failAdminRequest(error.message));
  }
}
export function* fetchAdminUserEditObj({ payload }) {
  try {
    yield put(makeAdminRequest());
    const response = yield call(requestAdminUserEditObj, payload);
    if (response.status === 200) {
      yield put(setAdminUserEditObj(response.data.data));
    } else {
      yield put(failAdminRequest(response.data.message));
    }
  } catch (error) {
    yield put(failAdminRequest(error.message));
  }
}
export function* fetchAdminUpdateUserProfile({ payload }) {
  try {
    yield put(makeAdminRequest());
    const response = yield call(requestAdminUpdateUserProfile, payload);
    if (response.data.message ===`Profile updated successfully`) {
      yield put(setAdminUpdateUserProfile(response.data.message));
    } else {
      yield put(failAdminRequest(response.data.message));
    }
  } catch (error) {
    yield put(failAdminRequest(error.message));
  }
}
