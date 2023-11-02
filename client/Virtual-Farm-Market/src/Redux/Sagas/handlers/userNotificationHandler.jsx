import { call, put } from "redux-saga/effects";
import {
  failRequestNoti,
  makeRequestNoti,
  setAllDeleteNoti,
  setAllNoti,
  setCountOfNoti,
  setDeleteNoti,
  setObjNoti,
} from "../../Reducers/userNotificationReducer";
import {
  requestAllDeleteNoti,
  requestAllNoti,
  requestCountNoti,
  requestDeleteNoti,
  requestObjNoti,
} from "../requests/userNotificationRequest";

export function* fetchCountNofi() {
  try {
    yield put(makeRequestNoti());
    const response = yield call(requestCountNoti);
    if (response.status === 200) {
      yield put(setCountOfNoti(response.data.data));
    } else {
      yield put(failRequestNoti(response.data.message));
    }
  } catch (error) {
    yield put(failRequestNoti(error.message));
  }
}

export function* fetchAllNofi() {
  try {
    yield put(makeRequestNoti());
    const response = yield call(requestAllNoti);
    if (response.status === 200) {
      yield put(setAllNoti(response.data.data));
    } else {
      yield put(failRequestNoti(response.data.message));
    }
  } catch (error) {
    yield put(failRequestNoti(error.message));
  }
}
export function* fetchObjNofi({ payload }) {
  try {
    //   yield put(makeRequestNoti());
    const response = yield call(requestObjNoti, payload);
    if (response.status === 200) {
      yield put(setObjNoti(response.data.status));
      //yield put(setObjNoti(response.data.data));
      //I don't need data. purpose is jsu to set {IsRead:true}
    } else {
      console.log("fetchObjNofi ERROR==>", response.data.message);
      yield put(failRequestNoti(response.data.message));
    }
  } catch (error) {
    yield put(failRequestNoti(error.message));
  }
}

export function* fetchDeleteNofi({ payload }) {
  try {
    yield put(makeRequestNoti());
    const response = yield call(requestDeleteNoti, payload);
    if (response.status === 200) {
      yield put(setDeleteNoti(response.data.message));
    } else {
      yield put(failRequestNoti(response.data.message));
    }
  } catch (error) {
    yield put(failRequestNoti(error.message));
  }
}

export function* fetchAllDeleteNofi() {
  try {
    yield put(makeRequestNoti());
    const response = yield call(requestAllDeleteNoti);
    if (response.status === 200) {
      yield put(setAllDeleteNoti(response.data.message));
    } else {
      yield put(failRequestNoti(response.data.message));
    }
  } catch (error) {
    yield put(failRequestNoti(error.message));
  }
}
