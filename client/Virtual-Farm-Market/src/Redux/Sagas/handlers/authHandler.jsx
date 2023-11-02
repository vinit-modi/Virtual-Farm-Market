import { call, put } from "redux-saga/effects";
import {
  failRequest,
  makeRequest,
  setCityList,
  setConfirmEmailUser,
  setProvinceList,
  setSignInUser,
  setSignUpMessage,
  setUserProfileImageUser,
} from "../../Reducers/authReducer";
import {
  requestCityList,
  requestConfirmEmailUser,
  requestGetUserById,
  requestPostSignUpUser,
  requestProvinceList,
  requestSignInUser,
  requestUserProfileImageUser,
} from "../requests/authRequest";
import { store } from "../../store";

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

export function* fetchPostSignUpUser({ payload }) {
  try {
    yield put(makeRequest());
    const response = yield call(requestPostSignUpUser, payload);

    if (
      response.data.message !==
      "This email is already exist. Please use another email."
    ) {
      const dataObj = {
        message: response.data.message,
        userId: response.data.data._id,
      };
      yield put(setSignUpMessage(dataObj));
    } else {
      yield put(failRequest(response.data.message));
    }
  } catch (error) {
    yield put(failRequest(error.message));
  }
}

export function* fetchConfirmEmailUser({ payload }) {
  try {
    yield put(makeRequest());
    const response = yield call(requestConfirmEmailUser, payload);
    if (response.data.message === `Email confirmed successfully.`) {
      yield put(
        setConfirmEmailUser({
          message: "Email confirmed successfully.",
          isEmailConfirmed: true,
        })
      );
    } else {
      yield put(failRequest(response.data.message));
    }
  } catch (error) {
    yield put(failRequest(error.message));
  }
}
export function* fetchUserProfileImageUser() {
  try {
    yield put(makeRequest());
    const response = yield call(requestUserProfileImageUser);
    if (response.status === 200) {
      yield put(
        setUserProfileImageUser(response.data.data)
      );
    } else {
      yield put(failRequest(response.data.message));
    }
  } catch (error) {
    yield put(failRequest(error.message));
  }
}
