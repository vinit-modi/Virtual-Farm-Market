export const MAKE_ADMIN_REQUEST = "MAKE_ADMIN_REQUEST";
export const FAIL_ADMIN_MESSAGE = "FAIL_ADMIN_MESSAGE";
export const GET_ADMIN_LOGIN = "GET_ADMIN_LOGIN";
export const SET_ADMIN_LOGIN = "SET_ADMIN_LOGIN";

export const makeAdminRequest = () => {
  return {
    type: MAKE_ADMIN_REQUEST,
  };
};
export const failAdminRequest = (error) => {
  return {
    type: FAIL_ADMIN_MESSAGE,
    payload: error,
  };
};

export const getAdminLogin = (value) => {
  return {
    type: GET_ADMIN_LOGIN,
    payload: value,
  };
};
export const setAdminLogin = (value) => {
  return {
    type: SET_ADMIN_LOGIN,
    payload: value,
  };
};

const initialState = {
  loading: false,
  error: null,
  message: null,
  adminId: null,
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FAIL_ADMIN_MESSAGE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_ADMIN_LOGIN:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
        adminId: action.payload.id,
      };
    default:
      return state;
  }
};
