export const MAKE_REQUEST_NOTI = "MAKE_REQUEST_NOTI";
export const FAIL_REQUEST_NOTI = "FAIL_REQUEST_NOTI";
export const CLEAR_MESSAGE_NOTI = "CLEAR_MESSAGE_NOTI";
export const GET_COUNT_OF_NOTI = "GET_COUNT_OF_NOTI";
export const SET_COUNT_OF_NOTI = "SET_COUNT_OF_NOTI";
export const GET_ALL_NOTI = "GET_ALL_NOTI";
export const SET_ALL_NOTI = "SET_ALL_NOTI";
export const GET_OBJ_NOTI = "GET_OBJ_NOTI";
export const SET_OBJ_NOTI = "SET_OBJ_NOTI";
export const GET_ALL_DELETE_NOTI = "GET_ALL_DELETE_NOTI";
export const SET_ALL_DELETE_NOTI = "SET_ALL_DELETE_NOTI";
export const GET_DELETE_NOTI = "GET_DELETE_NOTI";
export const SET_DELETE_NOTI = "SET_DELETE_NOTI";

export const makeRequestNoti = () => ({
  type: MAKE_REQUEST_NOTI,
});

export const failRequestNoti = (payload) => ({
  type: FAIL_REQUEST_NOTI,
  payload,
});

export const setCountOfNoti = (payload) => ({
  type: SET_COUNT_OF_NOTI,
  payload,
});
export const setAllNoti = (payload) => ({
  type: SET_ALL_NOTI,
  payload,
});
export const setObjNoti = (payload) => ({
  type: SET_OBJ_NOTI,
  payload,
});
export const setDeleteNoti = (payload) => ({
  type: SET_DELETE_NOTI,
  payload,
});
export const setAllDeleteNoti = (payload) => ({
  type: SET_ALL_DELETE_NOTI,
  payload,
});

const initialState = {
  loading: false,
  error: null,
  message: null,
  notiCount: null,
  allNoti: null,
  objNoti: null,
};

export const userNotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_REQUEST_NOTI:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FAIL_REQUEST_NOTI:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: null,
      };
    case CLEAR_MESSAGE_NOTI:
      return {
        ...state,
        loading: false,
        message: null,
      };
    case SET_COUNT_OF_NOTI:
      return {
        ...state,
        loading: false,
        error: null,
        notiCount: action.payload,
      };
    case SET_ALL_NOTI:
      return {
        ...state,
        loading: false,
        error: null,
        allNoti: action.payload,
      };
    case SET_OBJ_NOTI:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload,
        // objNoti:action.payload
        //nothing need to write a code here.
        //this is just to set {isRead:true}
      };
    case SET_DELETE_NOTI:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload,
      };
    case SET_ALL_DELETE_NOTI:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload,
      };
    default:
      return state;
  }
};
