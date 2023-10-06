import { call, put } from "redux-saga/effects";
import {
  failRequest,
  makeRequest,
  setCityList,
  setProvinceList,
  setSignInUser,
  setSignUpMessage,
} from "../../Reducers/authReducer";
import {
  requestCityList,
  requestPostSignUpUser,
  requestProvinceList,
  requestSignInUser,
} from "../requests/authRequest";

export function* fetchPostSignUpUser({ payload }) {
  try {
    yield put(makeRequest());
    const response = yield call(requestPostSignUpUser, payload);
    if (
      response.data.message !==
      "This email is already exist. Please use another email."
    ) {
      yield put(setSignUpMessage(response.data.message));
    } else {
      yield put(failRequest(response.data.message));
    }
  } catch (error) {
    yield put(failRequest(error.message));
  }
}

export function* fetchPostSignInUser({ payload }) {
  try {
    yield put(makeRequest());
    const response = yield call(requestSignInUser, payload);
    if (response.data.message === `Welcome! You have successfully logged in`) {
      yield put(setSignInUser(response.data));
    } else {
      yield put(failRequest(response.data.message));
    }
  } catch (error) {
    yield put(failRequest(error.message));
  }
}

export function* fetchProvinceList() {
  try {
    yield put(makeRequest());
    const response = yield call(requestProvinceList);
    yield put(setProvinceList(response.data));
  } catch (error) {
    yield put(failRequest(error.message));
  }
}
export function* fetchCityList() {
  try {
    yield put(makeRequest());
    const response = yield call(requestCityList);
    yield put(setCityList(response.data));
  } catch (error) {
    yield put(failRequest(error.message));
  }
}
