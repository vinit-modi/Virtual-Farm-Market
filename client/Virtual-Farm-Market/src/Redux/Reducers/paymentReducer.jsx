export const MAKE_REQUEST_PAYMENT = "MAKE_REQUEST_PAYMENT";
export const FAIL_MESSAGE_PAYMENT = "FAIL_MESSAGE_PAYMENT";
export const CLEARE_MESSAGE_PAYMENT = "CLEARE_MESSAGE_PAYMENT";

export const GET_ADD_NEW_CARD_PAYMENT = "GET_ADD_NEW_CARD_PAYMENT";
export const SET_ADD_NEW_CARD_PAYMENT = "SET_ADD_NEW_CARD_PAYMENT";

export const makeRequestPayment = () => {
  return {
    type: MAKE_REQUEST_PAYMENT,
  };
};
export const failRequestPayment = (error) => {
  return {
    type: FAIL_MESSAGE_PAYMENT,
    payload: error,
  };
};
export const setAddNewCardPayment = (payload) => ({
  type: SET_ADD_NEW_CARD_PAYMENT,
  payload,
});

const initialState = {
  loading: false,
  error: null,
  message: null,
};

export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_REQUEST_PAYMENT:
      return {
        loading: true,
        error: null,
      };
    case FAIL_MESSAGE_PAYMENT:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEARE_MESSAGE_PAYMENT:
      return {
        ...state,
        message: null,
      };
    case SET_ADD_NEW_CARD_PAYMENT:
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
