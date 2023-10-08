import { call, put } from "redux-saga/effects";
import {
  failRequestUserDetails,
  makeRequestUserDetails,
  setUser,
} from "../../Reducers/userReducer";
import { requestGetUserDetails } from "../requests/authRequest";

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
