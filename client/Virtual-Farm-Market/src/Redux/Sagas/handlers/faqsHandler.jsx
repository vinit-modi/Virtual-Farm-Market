import { call, put } from "redux-saga/effects";
import {
  failFaqsRequest,
  makeFaqsRequest,
  setAddAdminFaqs,
  setAllAdminFaqs,
  setAllUserFaqs,
  setDeleteAdminFaqs,
  setObjectOfAdminFaqs,
  setUpdateAdminFaqs,
} from "../../Reducers/faqsReducer";
import { requestAddAdminFaqs, requestAllAdminFaqs, requestAllUserFaqs, requestDeleteOfAdminFaqs, requestObjectOfAdminFaqs, requestUpdateOfAdminFaqs } from "../requests/faqsRequest";

//USER:-
export function* fetchAllUserFaqs() {
  yield put(makeFaqsRequest());
  try {
    const response = yield call(requestAllUserFaqs);
    if (response.status === 200) {
      yield put(setAllUserFaqs(response.data.data));
    } else {
      yield put(failFaqsRequest(response.data.message));
    }
  } catch (error) {
    yield put(failFaqsRequest(error.message));
  }
}

//ADMIN:-
export function* fetchAllAdminFaqs() {
  yield put(makeFaqsRequest());
  try {
    const response = yield call(requestAllAdminFaqs);
    if (response.status === 200) {
      yield put(setAllAdminFaqs(response.data.data));
    } else {
      yield put(failFaqsRequest(response.data.message));
    }
  } catch (error) {
    yield put(failFaqsRequest(error.message));
  }
}
export function* fetchAddAdminFaqs({payload}) {
  yield put(makeFaqsRequest());
  try {
    const response = yield call(requestAddAdminFaqs,payload);
    if (response.status === 200) {
      yield put(setAddAdminFaqs(response.data.message));
    } else {
      yield put(failFaqsRequest(response.data.message));
    }
  } catch (error) {
    yield put(failFaqsRequest(error.message));
  }
}
export function* fetchObjectOfAdminFaqs({payload}) {
  yield put(makeFaqsRequest());
  try {
    const response = yield call(requestObjectOfAdminFaqs,payload);
    if (response.status === 200) {
      yield put(setObjectOfAdminFaqs(response.data.data));
    } else {
      yield put(failFaqsRequest(response.data.message));
    }
  } catch (error) {
    yield put(failFaqsRequest(error.message));
  }
}
export function* fetchUpdateAdminFaqs({payload}) {
  yield put(makeFaqsRequest());
  try {
    const response = yield call(requestUpdateOfAdminFaqs,payload);
    if (response.status === 200) {
      yield put(setUpdateAdminFaqs(response.data.message));
    } else {
      yield put(failFaqsRequest(response.data.message));
    }
  } catch (error) {
    yield put(failFaqsRequest(error.message));
  }
}
export function* fetchDeleteAdminFaqs({payload}) {
  yield put(makeFaqsRequest());
  try {
    const response = yield call(requestDeleteOfAdminFaqs,payload);
    if (response.status === 200) {
      yield put(setDeleteAdminFaqs(response.data.message));
    } else {
      yield put(failFaqsRequest(response.data.message));
    }
  } catch (error) {
    yield put(failFaqsRequest(error.message));
  }
}
