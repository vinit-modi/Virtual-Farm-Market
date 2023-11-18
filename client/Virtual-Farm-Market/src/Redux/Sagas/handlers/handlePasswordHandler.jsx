import { call, put } from "redux-saga/effects";
import {
  failRequestPassword,
  makeRequestPassword,
  setChangePassword,
} from "../../Reducers/handlePasswordReducer";
import { requestChangePassword } from "../requests/authRequest";

export function* fetchChangePassword({ payload }) {
  try {
    yield put(makeRequestPassword());
    const response = yield call(requestChangePassword, payload);
    if (response.status === 200) {
      yield put(setChangePassword(response.data.message));
    } else {
      yield put(failRequestPassword(response.data.message));
    }
  } catch (error) {
    yield put(failRequestPassword(error.message));
  }
}
