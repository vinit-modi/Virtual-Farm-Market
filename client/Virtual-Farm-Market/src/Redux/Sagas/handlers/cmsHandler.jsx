import { call, put } from "redux-saga/effects";
import {
  failCmsRequest,
  makeCmsRequest,
  setCmsForUser,
  
  setCmsObjectForAdmin,
  setCmsUpdateForAdmin,
} from "../../Reducers/cmsReducer";
import {
  requestCmsForUser,
  requestCmsObjectForAdmin,
  requestCmsUpdateForAdmin,
} from "../requests/cmsRequest";

//User:-
export function* fetchCmsForUser({ payload }) {
  try {
    yield put(makeCmsRequest());
    const response = yield call(requestCmsForUser, payload);
    if (response.status === 200) {
      yield put(setCmsForUser(response.data.data));
    } else {
      yield put(failCmsRequest(response.data.message));
    }
  } catch (error) {
    yield put(failCmsRequest(error.message));
  }
}

//Admin:-
export function* fetchCmsObjectForAdmin({ payload }) {
  try {
    yield put(makeCmsRequest());
    const response = yield call(requestCmsObjectForAdmin, payload);
    if (response.status === 200) {
      yield put(setCmsObjectForAdmin(response.data.data));
    } else {
      yield put(failCmsRequest(response.data.message));
    }
  } catch (error) {
    yield put(failCmsRequest(error.message));
  }
}
export function* fetchCmsUpdateForAdmin({ payload }) {
  try {
    yield put(makeCmsRequest());
    const response = yield call(requestCmsUpdateForAdmin, payload);
    if (response.status === 200) {
      yield put(setCmsUpdateForAdmin(response.data.message));
    } else {
      yield put(failCmsRequest(response.data.message));
    }
  } catch (error) {
    yield put(failCmsRequest(error.message));
  }
}
