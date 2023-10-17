import { call, put } from "redux-saga/effects";
import {
  failRequest,
  makeRequest,
  setCityList,
  setConfirmEmailUser,
  setProvinceList,
  setSignInUser,
  setSignUpMessage,
} from "../../Reducers/authReducer";
import {
  requestCityList,
  requestConfirmEmailUser,
  requestGetUserById,
  requestPostSignUpUser,
  requestProvinceList,
  requestSignInUser,
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
      // const id = store.getState();
      // console.log('111111111',id)

      // const responseForGetUserAPI = yield call(
      //   requestGetUserById,
      //   id?.auth?.userId
      // );
      // console.log(
      //   "responseForGetUserAPI =>>",
      //   responseForGetUserAPI.data.data
      // );
      // const dataObj = {
      //   message: response.data.message,
      //   isEmailConfirmed: responseForGetUserAPI.data.data.isEmailConfirmed,
      // };
      // yield put(setConfirmEmailUser(dataObj));
      yield put(
        setConfirmEmailUser({
          message: "Email confirmed successfully.",
          isEmailConfirmed: true,
          // isEmailConfirmed: responseForGetUserAPI.data.data.isEmailConfirmed,
        })
      );
    } else {
      yield put(failRequest(response.data.message));
    }
  } catch (error) {
    yield put(failRequest(error.message));
  }
}
