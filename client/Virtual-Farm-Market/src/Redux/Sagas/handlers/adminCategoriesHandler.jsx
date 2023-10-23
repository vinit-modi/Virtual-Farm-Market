import { call, put } from "redux-saga/effects";
import {
  categoriesFailRequest,
  categoriesMakeRequest,
  setAddCategories,
  setAllCategories,
  setDeleteCategories,
  setEditCategories,
  setEditStatusCategories,
} from "../../Reducers/adminCategoriesReducer";
import { requestAddCategories, requestAllCategories, requestDeleteCategories, requestEditCategories, requestEditStatusCategories } from "../requests/adminCategoriesRequest";

export function* fetchAllCategories({ payload }) {
  try {
    yield put(categoriesMakeRequest());
    const response = yield call(requestAllCategories, payload);
    if (response.status === 200) {
        const valueObj = {
            data:response.data.data,
            message:response.data.message
        }
      yield put(setAllCategories(valueObj));
    } else {
      yield put(categoriesFailRequest(response.error.message));
    }
  } catch (error) {
    yield put(categoriesFailRequest(error.message));
  }
}
export function* fetchEditCategories({ payload }) {
  try {
    yield put(categoriesMakeRequest());
    const response = yield call(requestEditCategories, payload);
    if (response.status === 200) {
        const valueObj = {
            message:response.data.message
        }
      yield put(setEditCategories(valueObj));
    } 
    else {
      yield put(categoriesFailRequest(response.error.message));
    }
  } catch (error) {
    yield put(categoriesFailRequest(error.message));
  }
}
export function* fetchEditStatusCategories({ payload }) {
  try {
    yield put(categoriesMakeRequest());
    const response = yield call(requestEditStatusCategories, payload);
    if (response.status === 200) {
        const valueObj = {
            message:response.data.message
        }
      yield put(setEditStatusCategories(valueObj));
    } 
    else {
      yield put(categoriesFailRequest(response.error.message));
    }
  } catch (error) {
    yield put(categoriesFailRequest(error.message));
  }
}
export function* fetchDeleteCategories({ payload }) {
  try {
    yield put(categoriesMakeRequest());
    const response = yield call(requestDeleteCategories, payload);
    if (response.status === 200) {
        const valueObj = {
            message:response.data.message
        }
      yield put(setDeleteCategories(valueObj));
    } 
    else {
      yield put(categoriesFailRequest(response.error.message));
    }
  } catch (error) {
    yield put(categoriesFailRequest(error.message));
  }
}
export function* fetchAddCategories({ payload }) {
  try {
    yield put(categoriesMakeRequest());
    const response = yield call(requestAddCategories, payload);
    if (response.status === 200) {
        const valueObj = {
            message:response.data.message
        }
      yield put(setAddCategories(valueObj));
    } 
    else {
        console.log('object0>',response.error.message)
      yield put(categoriesFailRequest(response.error.message));
    }
  } catch (error) {
    console.log('ERROR0>',error)
    yield put(categoriesFailRequest(error.message));
  }
}
