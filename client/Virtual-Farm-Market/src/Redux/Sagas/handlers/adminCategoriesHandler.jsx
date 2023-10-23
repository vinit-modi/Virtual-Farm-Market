import { call, put } from "redux-saga/effects";
import {
  categoriesFailRequest,
  categoriesMakeRequest,
  setAllCategories,
  setEditCategories,
  setEditStatusCategories,
} from "../../Reducers/adminCategoriesReducer";
import { requestAllCategories, requestEditCategories, requestEditStatusCategories } from "../requests/adminCategoriesRequest";

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
