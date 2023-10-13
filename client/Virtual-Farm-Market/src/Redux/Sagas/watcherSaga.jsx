import { all, fork, takeLatest } from "redux-saga/effects";
import {
  GET_CITY_LIST,
  GET_CONFIRM_EMAIL_FOR_USER,
  GET_PROVINCE_LIST,
  POST_SIGNIN_USER,
  POST_SIGNUP_USER,
} from "../Reducers/authReducer";
import {
  fetchCityList,
  fetchConfirmEmailUser,
  fetchPostSignInUser,
  fetchPostSignUpUser,
  fetchProvinceList,
} from "./handlers/authHandler";
import { GET_CHANGE_PASSWORD } from "../Reducers/handlePasswordReducer";
import { fetchChangePassword } from "./handlers/handlePasswordHandler";
import { GET_UPDATED_USER_DETAIL, GET_USER } from "../Reducers/userReducer";
import {
  fetchGetUser,
  fetchUpdatedUserDetail,
} from "./handlers/userDetailsHandler";
import { GET_ADMIN_LOGIN } from "../Reducers/adminReducer";
import { fetchAdminLogin } from "./handlers/adminHandler";

function* authStuff() {
  yield takeLatest(POST_SIGNUP_USER, fetchPostSignUpUser);
  yield takeLatest(POST_SIGNIN_USER, fetchPostSignInUser);
  yield takeLatest(GET_CITY_LIST, fetchCityList);
  yield takeLatest(GET_PROVINCE_LIST, fetchProvinceList);
  yield takeLatest(GET_CONFIRM_EMAIL_FOR_USER, fetchConfirmEmailUser);
}

function* changePassword() {
  yield takeLatest(GET_CHANGE_PASSWORD, fetchChangePassword);
}

function* userDetails() {
  yield takeLatest(GET_USER, fetchGetUser);
  yield takeLatest(GET_UPDATED_USER_DETAIL, fetchUpdatedUserDetail);
}

function* adminHandles() {
  yield takeLatest(GET_ADMIN_LOGIN,fetchAdminLogin)
}

const authSaga = [fork(authStuff)];
const changePasswordSaga = [fork(changePassword)];
const userDetailsSaga = [fork(userDetails)];
const adminHandlesSaga = [fork(adminHandles)];

export default function* waterSaga() {
  yield all([
    ...authSaga,
    ...changePasswordSaga,
    ...userDetailsSaga,
    ...adminHandlesSaga,
  ]);
}
