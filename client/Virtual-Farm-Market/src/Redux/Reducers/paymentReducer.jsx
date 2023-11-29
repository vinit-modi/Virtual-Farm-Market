export const MAKE_REQUEST_PAYMENT = "MAKE_REQUEST_PAYMENT";
export const FAIL_MESSAGE_PAYMENT = "FAIL_MESSAGE_PAYMENT";
export const CLEARE_MESSAGE_PAYMENT = "CLEARE_MESSAGE_PAYMENT";
export const GET_ADD_NEW_CARD_PAYMENT = "GET_ADD_NEW_CARD_PAYMENT";
export const SET_ADD_NEW_CARD_PAYMENT = "SET_ADD_NEW_CARD_PAYMENT";
export const GET_ALL_CARD_PAYMENT = "GET_ALL_CARD_PAYMENT";
export const SET_ALL_CARD_PAYMENT = "SET_ALL_CARD_PAYMENT";
export const GET_DELETE_CARD_PAYMENT = "GET_DELETE_CARD_PAYMENT";
export const SET_DELETE_CARD_PAYMENT = "SET_DELETE_CARD_PAYMENT";
export const GET_MAKE_DEFAULT_CARD_PAYMENT = "GET_MAKE_DEFAULT_CARD_PAYMENT";
export const SET_MAKE_DEFAULT_CARD_PAYMENT = "SET_MAKE_DEFAULT_CARD_PAYMENT";

//Only working :-
export const GET_MAKE_PAYMENT = "GET_MAKE_PAYMENT";
export const SET_MAKE_PAYMENT = "SET_MAKE_PAYMENT";

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
export const setAllCardPayment = (payload) => ({
  type: SET_ALL_CARD_PAYMENT,
  payload,
});
export const setDeleteCardPayment = (payload) => ({
  type: SET_DELETE_CARD_PAYMENT,
  payload,
});
export const setMakeDefaultCardPayment = (payload) => ({
  type: SET_MAKE_DEFAULT_CARD_PAYMENT,
  payload,
});

//Only working :-
export const setMakePayment = (payload) => ({
  type: SET_MAKE_PAYMENT,
  payload,
});

const initialState = {
  loading: false,
  error: null,
  message: null,
  allCards: null,

  //Only working :-
  paymentSuccess: null,
};

export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_REQUEST_PAYMENT:
      return {
        ...state,
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
    case SET_ALL_CARD_PAYMENT:
      return {
        ...state,
        loading: false,
        error: null,
        message: null,
        allCards: action.payload,
      };
    case SET_DELETE_CARD_PAYMENT:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload,
      };
    case SET_MAKE_DEFAULT_CARD_PAYMENT:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload,
      };

    //Only working :-
    case SET_MAKE_PAYMENT:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
        paymentSuccess: action.payload.paymentSuccess,
      };
    default:
      return state;
  }
};
