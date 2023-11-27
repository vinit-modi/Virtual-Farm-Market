export const MAKE_REQUEST_STRIPEPAYMENT = "MAKE_REQUEST_STRIPEPAYMENT";
export const FAIL_REQUEST_STRIPEPAYMENT = "FAIL_REQUEST_STRIPEPAYMENT";
export const CLEAR_MESSAGE_STRIPEPAYMENT = "CLEAR_MESSAGE_STRIPEPAYMENT";

export const GET_ADD_CARD_STRIPEPAYMENT = "GET_ADD_CARD_STRIPEPAYMENT";
export const SET_ADD_CARD_STRIPEPAYMENT = "SET_ADD_CARD_STRIPEPAYMENT";
export const GET_ALL_CARD_STRIPEPAYMENT = "GET_ALL_CARD_STRIPEPAYMENT";
export const SET_ALL_CARD_STRIPEPAYMENT = "SET_ALL_CARD_STRIPEPAYMENT";
export const GET_MAKE_DEFAULT_STRIPEPAYMENT = "GET_MAKE_DEFAULT_STRIPEPAYMENT";
export const SET_MAKE_DEFAULT_STRIPEPAYMENT = "SET_MAKE_DEFAULT_STRIPEPAYMENT";
export const GET_DELETE_CARD_STRIPEPAYMENT = "GET_DELETE_CARD_STRIPEPAYMENT";
export const SET_DELETE_CARD_STRIPEPAYMENT = "SET_DELETE_CARD_STRIPEPAYMENT";

export const makeRequestStripePayment = () => ({
  type: MAKE_REQUEST_STRIPEPAYMENT,
});
export const failRequestStripePayment = (error) => ({
  type: FAIL_REQUEST_STRIPEPAYMENT,
  payload: error,
});
export const setAddCardStripePayment = (payload) => ({
  type: SET_ADD_CARD_STRIPEPAYMENT,
  payload,
});
export const setAllCardStripePayment = (payload) => ({
  type: SET_ALL_CARD_STRIPEPAYMENT,
  payload,
});
export const setMakeDefaultCardStripePayment = (payload) => ({
  type: SET_MAKE_DEFAULT_STRIPEPAYMENT,
  payload,
});
export const setDeleteCardStripePayment = (payload) => ({
  type: SET_DELETE_CARD_STRIPEPAYMENT,
  payload,
});

const initialState = {
  loading: false,
  error: null,
  message: null,
  cardList: [],
};

export const stripePaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_REQUEST_STRIPEPAYMENT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FAIL_REQUEST_STRIPEPAYMENT:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_MESSAGE_STRIPEPAYMENT:
      return {
        ...state,
        message: null,
      };
    case SET_ADD_CARD_STRIPEPAYMENT:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload,
      };
    case SET_ALL_CARD_STRIPEPAYMENT:
      return {
        ...state,
        loading: false,
        error: null,
        cardList: action.payload,
      };
    case SET_MAKE_DEFAULT_STRIPEPAYMENT:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload,
      };
    case SET_DELETE_CARD_STRIPEPAYMENT:
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
