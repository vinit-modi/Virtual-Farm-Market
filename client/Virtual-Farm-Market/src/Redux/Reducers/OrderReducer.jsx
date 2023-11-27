export const MAKE_REQUEST_ORDER = "MAKE_REQUEST_ORDER";
export const FAIL_REQUEST_ORDER = "FAIL_REQUEST_ORDER";
export const CLEAR_MESSAGE_ORDER = "CLEAR_MESSAGE_ORDER";

export const GET_ALL_ORDER = "GET_ALL_ORDER";
export const SET_ALL_ORDER = "SET_ALL_ORDER";

export const makeRequestOrder = () => ({
  type: MAKE_REQUEST_ORDER,
});
export const failRequestOrder = (error) => ({
  type: FAIL_REQUEST_ORDER,
  payload: error,
});
export const setAllOrder = (payload) => ({
  type: SET_ALL_ORDER,
  payload,
});

const initialState = {
  loading: false,
  error: null,
  message: null,
  orderList: [],
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_REQUEST_ORDER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FAIL_REQUEST_ORDER:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_MESSAGE_ORDER:
      return {
        ...state,
        message: null,
      };
    case SET_ALL_ORDER:
      return {
        ...state,
        loading: false,
        error: null,
        orderList: action.payload,
      };

    default:
      return state;
  }
};
