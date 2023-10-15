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
import { GET_ADMINSIDE_USER_LIST, GET_ADMIN_CHANGE_PASSWORD, GET_ADMIN_EDIT_PROFILE, GET_ADMIN_LOGIN, GET_ADMIN_PROFILE_DATA, GET_ADMIN_UPDATE_USER_PROFILE, GET_ADMIN_USER_DELETE_REQUEST, GET_ADMIN_USER_EDIT_OBJECT } from "../Reducers/adminReducer";
import { fetchAdminChangePassword, fetchAdminEditProfile, fetchAdminLogin, fetchAdminProfileData, fetchAdminSideUserList, fetchAdminUpdateUserProfile, fetchAdminUserDeleteRequest, fetchAdminUserEditObj } from "./handlers/adminHandler";

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
  yield takeLatest(GET_ADMIN_PROFILE_DATA,fetchAdminProfileData)
  yield takeLatest(GET_ADMIN_EDIT_PROFILE,fetchAdminEditProfile)
  yield takeLatest(GET_ADMIN_CHANGE_PASSWORD,fetchAdminChangePassword)
  yield takeLatest(GET_ADMINSIDE_USER_LIST,fetchAdminSideUserList)
  yield takeLatest(GET_ADMIN_USER_DELETE_REQUEST,fetchAdminUserDeleteRequest)
  yield takeLatest(GET_ADMIN_USER_EDIT_OBJECT,fetchAdminUserEditObj)
  yield takeLatest(GET_ADMIN_UPDATE_USER_PROFILE,fetchAdminUpdateUserProfile)
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
