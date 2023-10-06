export const MAKE_REQUEST_PASSWORD = "MAKE_REQUEST_PASSWORD";
export const FAIL_MESSAGE_PASSWORD = "FAIL_MESSAGE_PASSWORD";
export const GET_CHANGE_PASSWORD = "GET_CHANGE_PASSWORD";
export const SET_CHANGE_PASSWORD = "SET_CHANGE_PASSWORD";

export const makeRequestPassword = () => {
    return {
      type: MAKE_REQUEST_PASSWORD,
    };
  };
  export const failRequestPassword = (error) => {
    return {
      type: FAIL_MESSAGE_PASSWORD,
      payload: error,
    };
  };

export const getChangePassword = (value) => {
  return {
    type: GET_CHANGE_PASSWORD,
    payload: value,
  };
};
export const setChangePassword = (value) => {
  return {
    type: SET_CHANGE_PASSWORD,
    payload: value,
  };
};

const initialState = {
  loading: false,
  error: null,
  message: null,
};

export const handlePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_REQUEST_PASSWORD:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FAIL_MESSAGE_PASSWORD:
      return {
        ...state,
        error: action.payload,
        message: null,
        loading: false,
      };
    case SET_CHANGE_PASSWORD:
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
