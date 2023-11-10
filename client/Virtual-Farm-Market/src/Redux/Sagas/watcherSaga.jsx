import { all, fork, takeLatest } from "redux-saga/effects";
import {
  GET_CITY_LIST,
  GET_CONFIRM_EMAIL_FOR_USER,
  GET_PROVINCE_LIST,
  GET_USER_PROFILE_IMAGE,
  POST_SIGNIN_USER,
  POST_SIGNUP_USER,
} from "../Reducers/authReducer";
import {
  fetchCityList,
  fetchConfirmEmailUser,
  fetchPostSignInUser,
  fetchPostSignUpUser,
  fetchProvinceList,
  fetchUserProfileImageUser,
} from "./handlers/authHandler";
import { GET_CHANGE_PASSWORD } from "../Reducers/handlePasswordReducer";
import { fetchChangePassword } from "./handlers/handlePasswordHandler";
import { GET_UPDATED_USER_DETAIL, GET_USER } from "../Reducers/userReducer";
import {
  fetchGetUser,
  fetchUpdatedUserDetail,
} from "./handlers/userDetailsHandler";
import {
  GET_ADMINSIDE_USER_LIST,
  GET_ADMIN_CHANGE_PASSWORD,
  GET_ADMIN_EDIT_PROFILE,
  GET_ADMIN_LOGIN,
  GET_ADMIN_PROFILE_DATA,
  GET_ADMIN_UPDATE_USER_PROFILE,
  GET_ADMIN_USER_DELETE_REQUEST,
  GET_ADMIN_USER_EDIT_OBJECT,
} from "../Reducers/adminReducer";
import {
  fetchAdminChangePassword,
  fetchAdminEditProfile,
  fetchAdminLogin,
  fetchAdminProfileData,
  fetchAdminSideUserList,
  fetchAdminUpdateUserProfile,
  fetchAdminUserDeleteRequest,
  fetchAdminUserEditObj,
} from "./handlers/adminHandler";
import {
  GET_ADD_CATEGORIES,
  GET_ALL_CATEGORIES,
  GET_DELETE_CATEGORIES,
  GET_EDIT_CATEGORIES,
  GET_EDIT_STATUS_CATEGORIES,
} from "../Reducers/adminCategoriesReducer";
import {
  fetchAddCategories,
  fetchAllCategories,
  fetchDeleteCategories,
  fetchEditCategories,
  fetchEditStatusCategories,
} from "./handlers/adminCategoriesHandler";
import {
  fetchAddAdminFaqs,
  fetchAllAdminFaqs,
  fetchAllUserFaqs,
  fetchDeleteAdminFaqs,
  fetchObjectOfAdminFaqs,
  fetchUpdateAdminFaqs,
} from "./handlers/faqsHandler";
import {
  GET_ADD_ADMIN_FAQS,
  GET_ALL_ADMIN_FAQS,
  GET_ALL_USER_FAQS,
  GET_DELETE_ADMIN_FAQS,
  GET_OBJECT_OF_ADMIN_FAQS,
  GET_UPDATE_FAQS_ADMIN,
} from "../Reducers/faqsReducer";
import {
  GET_CMS_FOR_USER,
  GET_CMS_OBJECT_ADMIN,
  GET_CMS_UPDATE_ADMIN,
} from "../Reducers/cmsReducer";
import {
  fetchCmsForUser,
  fetchCmsObjectForAdmin,
  fetchCmsUpdateForAdmin,
} from "./handlers/cmsHandler";
import {
  GET_ADD_NEW_CARD_PAYMENT,
  GET_ALL_CARD_PAYMENT,
  GET_DELETE_CARD_PAYMENT,
  GET_MAKE_DEFAULT_CARD_PAYMENT,
} from "../Reducers/paymentReducer";
import {
  fetchAddNewCardPayment,
  fetchAllCardPayment,
  fetchDeleteCardPayment,
  fetchMakeDefaultCardPayment,
} from "./handlers/paymentHandler";
import {
  GET_ALL_DELETE_NOTI,
  GET_ALL_NOTI,
  GET_COUNT_OF_NOTI,
  GET_DELETE_NOTI,
  GET_OBJ_NOTI,
} from "../Reducers/userNotificationReducer";
import {
  fetchAllDeleteNofi,
  fetchAllNofi,
  fetchCountNofi,
  fetchDeleteNofi,
  fetchObjNofi,
} from "./handlers/userNotificationHandler";
import { GET_ALL_PRODUCTS, GET_CATEGORIES_PRODUCT, GET_PRODUCTS_BY_CATEGORY_PRODUCT } from "../Reducers/productReducer";
import { fetchGetAllProduct, fetchGetCategoryListProduct, fetchGetProductByCategory_Product } from "./handlers/productHandler";

function* authStuff() {
  yield takeLatest(POST_SIGNUP_USER, fetchPostSignUpUser);
  yield takeLatest(POST_SIGNIN_USER, fetchPostSignInUser);
  yield takeLatest(GET_CITY_LIST, fetchCityList);
  yield takeLatest(GET_PROVINCE_LIST, fetchProvinceList);
  yield takeLatest(GET_CONFIRM_EMAIL_FOR_USER, fetchConfirmEmailUser);
  yield takeLatest(GET_USER_PROFILE_IMAGE, fetchUserProfileImageUser);
}

function* changePassword() {
  yield takeLatest(GET_CHANGE_PASSWORD, fetchChangePassword);
}

function* userDetails() {
  yield takeLatest(GET_USER, fetchGetUser);
  yield takeLatest(GET_UPDATED_USER_DETAIL, fetchUpdatedUserDetail);
}

function* adminHandles() {
  yield takeLatest(GET_ADMIN_LOGIN, fetchAdminLogin);
  yield takeLatest(GET_ADMIN_PROFILE_DATA, fetchAdminProfileData);
  yield takeLatest(GET_ADMIN_EDIT_PROFILE, fetchAdminEditProfile);
  yield takeLatest(GET_ADMIN_CHANGE_PASSWORD, fetchAdminChangePassword);
  yield takeLatest(GET_ADMINSIDE_USER_LIST, fetchAdminSideUserList);
  yield takeLatest(GET_ADMIN_USER_DELETE_REQUEST, fetchAdminUserDeleteRequest);
  yield takeLatest(GET_ADMIN_USER_EDIT_OBJECT, fetchAdminUserEditObj);
  yield takeLatest(GET_ADMIN_UPDATE_USER_PROFILE, fetchAdminUpdateUserProfile);
}

function* adminCategories() {
  yield takeLatest(GET_ALL_CATEGORIES, fetchAllCategories);
  yield takeLatest(GET_EDIT_CATEGORIES, fetchEditCategories);
  yield takeLatest(GET_EDIT_STATUS_CATEGORIES, fetchEditStatusCategories);
  yield takeLatest(GET_DELETE_CATEGORIES, fetchDeleteCategories);
  yield takeLatest(GET_ADD_CATEGORIES, fetchAddCategories);
}

function* faqs() {
  yield takeLatest(GET_ALL_USER_FAQS, fetchAllUserFaqs);
  yield takeLatest(GET_ALL_ADMIN_FAQS, fetchAllAdminFaqs);
  yield takeLatest(GET_ADD_ADMIN_FAQS, fetchAddAdminFaqs);
  yield takeLatest(GET_OBJECT_OF_ADMIN_FAQS, fetchObjectOfAdminFaqs);
  yield takeLatest(GET_UPDATE_FAQS_ADMIN, fetchUpdateAdminFaqs);
  yield takeLatest(GET_DELETE_ADMIN_FAQS, fetchDeleteAdminFaqs);
}

function* cms() {
  yield takeLatest(GET_CMS_FOR_USER, fetchCmsForUser);
  yield takeLatest(GET_CMS_OBJECT_ADMIN, fetchCmsObjectForAdmin);
  yield takeLatest(GET_CMS_UPDATE_ADMIN, fetchCmsUpdateForAdmin);
}

function* payment() {
  yield takeLatest(GET_ADD_NEW_CARD_PAYMENT, fetchAddNewCardPayment);
  yield takeLatest(GET_ALL_CARD_PAYMENT, fetchAllCardPayment);
  yield takeLatest(GET_DELETE_CARD_PAYMENT, fetchDeleteCardPayment);
  yield takeLatest(GET_MAKE_DEFAULT_CARD_PAYMENT, fetchMakeDefaultCardPayment);
}

function* notification() {
  yield takeLatest(GET_COUNT_OF_NOTI, fetchCountNofi);
  yield takeLatest(GET_ALL_NOTI, fetchAllNofi);
  yield takeLatest(GET_OBJ_NOTI, fetchObjNofi);
  yield takeLatest(GET_DELETE_NOTI, fetchDeleteNofi);
  yield takeLatest(GET_ALL_DELETE_NOTI, fetchAllDeleteNofi);
}

function* product() {
  yield takeLatest(GET_CATEGORIES_PRODUCT, fetchGetCategoryListProduct);
  yield takeLatest(GET_ALL_PRODUCTS, fetchGetAllProduct);
  yield takeLatest(GET_PRODUCTS_BY_CATEGORY_PRODUCT, fetchGetProductByCategory_Product);
}

const authSaga = [fork(authStuff)];
const changePasswordSaga = [fork(changePassword)];
const userDetailsSaga = [fork(userDetails)];
const adminHandlesSaga = [fork(adminHandles)];
const adminCategoriesSaga = [fork(adminCategories)];
const faqsSaga = [fork(faqs)];
const cmsSage = [fork(cms)];
const paymentSaga = [fork(payment)];
const notificationSaga = [fork(notification)];
const productSaga = [fork(product)];

export default function* waterSaga() {
  yield all([
    ...authSaga,
    ...changePasswordSaga,
    ...userDetailsSaga,
    ...adminHandlesSaga,
    ...adminCategoriesSaga,
    ...faqsSaga,
    ...cmsSage,
    ...paymentSaga,
    ...notificationSaga,
    ...productSaga,
  ]);
}
