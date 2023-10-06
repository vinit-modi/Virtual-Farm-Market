import { all, fork, takeLatest } from "redux-saga/effects";
import {
  GET_CITY_LIST,
  GET_PROVINCE_LIST,
  POST_SIGNIN_USER,
  POST_SIGNUP_USER,
} from "../Reducers/authReducer";
import {
  fetchCityList,
  fetchPostSignInUser,
  fetchPostSignUpUser,
  fetchProvinceList,
} from "./handlers/authHandler";
import { GET_CHANGE_PASSWORD } from "../Reducers/handlePasswordReducer";
import { fetchChangePassword } from "./handlers/handlePasswordHandler";

function* authStuff() {
  yield takeLatest(POST_SIGNUP_USER, fetchPostSignUpUser);
  yield takeLatest(POST_SIGNIN_USER, fetchPostSignInUser);
  yield takeLatest(GET_CITY_LIST, fetchCityList);
  yield takeLatest(GET_PROVINCE_LIST, fetchProvinceList);
}

function* changePassword() {
  yield takeLatest(GET_CHANGE_PASSWORD, fetchChangePassword);
}

const authSaga = [fork(authStuff)];
const changePasswordSaga = [fork(changePassword)];

export default function* waterSaga() {
  yield all([...authSaga, ...changePasswordSaga]);
}
