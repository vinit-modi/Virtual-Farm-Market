import { call, put } from "redux-saga/effects";
import {
  failRequestUserDetails,
  makeRequestUserDetails,
  setUpdatedUserDetail,
  setUser,
} from "../../Reducers/userReducer";
import {
  requestGetUserDetails,
  requestUpdatedUserDetail,
} from "../requests/authRequest";

export function* fetchGetUser({ payload }) {
  try {
    yield put(makeRequestUserDetails());
    const response = yield call(requestGetUserDetails, payload);

    if (response.status === 200) {
      yield put(setUser(response.data.data));
    }
  } catch (error) {
    yield put(failRequestUserDetails(error?.message));
  }
}
export function* fetchUpdatedUserDetail({ payload }) {
  try {
    yield put(makeRequestUserDetails());
    const response = yield call(requestUpdatedUserDetail, payload);
    if (response.status === 200) {
      yield put(setUpdatedUserDetail(response.data.message));
    }
  } catch (error) {
    yield put(failRequestUserDetails(error?.message));
  }
}
