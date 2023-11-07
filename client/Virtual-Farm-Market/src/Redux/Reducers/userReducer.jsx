export const MAKE_REQUEST_USER_DETAILS = "MAKE_REQUEST_USER_DETAILS";
export const FAIL_MESSAGE_USER_DETAILS = "FAIL_MESSAGE_USER_DETAILS";
export const CLEAR_MESSAGE_USERREDUCER = "CLEAR_MESSAGE_USERREDUCER";
export const GET_USER = "GET_USER";
export const SET_USER = "SET_USER";
export const GET_UPDATED_USER_DETAIL = "GET_UPDATED_USER_DETAIL";
export const SET_UPDATED_USER_DETAIL = "SET_UPDATED_USER_DETAIL";

export const makeRequestUserDetails = () => {
  return {
    type: MAKE_REQUEST_USER_DETAILS,
  };
};
export const failRequestUserDetails = (error) => {
  return {
    type: FAIL_MESSAGE_USER_DETAILS,
    payload: error,
  };
};
export const getUser = (_id) => {
  return {
    type: GET_USER,
    payload: _id,
  };
};
export const setUser = (value) => {
  return {
    type: SET_USER,
    payload: value,
  };
};
export const getUpdatedUserDetail = (value) => {
  return {
    type: GET_UPDATED_USER_DETAIL,
    payload: value,
  };
};
export const setUpdatedUserDetail = (value) => {
  return {
    type: SET_UPDATED_USER_DETAIL,
    payload: value,
  };
};

const initialState = {
  loading: false,
  error: null,
  message: null,
  userDetails: null,
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_REQUEST_USER_DETAILS:
      return {
        ...state,
        loading: true,
        error: null,
        userDetails: null,
      };
    case FAIL_MESSAGE_USER_DETAILS:
      return {
        ...state,
        error: action.payload,
        loading: false,
        userDetails: null,
        message: null,
      };
    case CLEAR_MESSAGE_USERREDUCER:
      return {
        ...state,
        message: null,
      };
    case SET_USER:
      return {
        ...state,
        userDetails: action.payload.data,
        loading: false,
        error: null,
      };
    case SET_UPDATED_USER_DETAIL:
      return {
        ...state,
        loading: false,
        error: null,
        userDetails: null,
        message: action.payload.message,
      };
    default:
      return state;
  }
};
