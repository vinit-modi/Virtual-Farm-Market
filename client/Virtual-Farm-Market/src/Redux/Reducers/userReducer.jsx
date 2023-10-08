export const MAKE_REQUEST_USER_DETAILS = "MAKE_REQUEST_USER_DETAILS";
export const FAIL_MESSAGE_USER_DETAILS = "FAIL_MESSAGE_USER_DETAILS";
export const GET_USER = "GET_USER";
export const SET_USER = "SET_USER";

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

const initialState = {
  loading: false,
  error: null,
  userDetails: null,
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_REQUEST_USER_DETAILS:
      return {
        ...state,
        loading: true,
        error: null,
        userDetails:null
      };
    case FAIL_MESSAGE_USER_DETAILS:
      return {
        ...state,
        error: action.payload,
        loading: false,
        userDetails:null
      };
    case SET_USER:
      return {
        ...state,
        userDetails: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
