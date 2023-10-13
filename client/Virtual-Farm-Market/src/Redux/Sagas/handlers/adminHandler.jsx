import { call, put } from "redux-saga/effects";
import {
  failAdminRequest,
  makeAdminRequest,
  setAdminLogin,
} from "../../Reducers/adminReducer";
import { requestAdminLogin } from "../requests/adminRequest";

export function* fetchAdminLogin({ payload }) {
  try {
    yield put(makeAdminRequest());
    const response = yield call(requestAdminLogin, payload);
    if (
      response.data.message === `Welcome! You have successfully logged in` &&
      response.data.data.name === `Admin`
    ) {
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
