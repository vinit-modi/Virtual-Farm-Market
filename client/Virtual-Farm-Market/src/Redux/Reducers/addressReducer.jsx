export const MAKE_REQUEST_ADDRESS = "MAKE_REQUEST_ADDRESS";
export const FAIL_MESSAGE_ADDRESS = "FAIL_MESSAGE_ADDRESS";
export const CLEAR_MESSAGE_ADDRESS = "CLEAR_MESSAGE_ADDRESS";

export const GET_ADD_NEW_ADDRESS = "GET_ADD_NEW_ADDRESS";
export const SET_ADD_NEW_ADDRESS = "SET_ADD_NEW_ADDRESS";
export const GET_ALL_ADDRESS = "GET_ALL_ADDRESS";
export const SET_ALL_ADDRESS = "SET_ALL_ADDRESS";
export const GET_DELETE_ADDRESS = "GET_DELETE_ADDRESS";
export const SET_DELETE_ADDRESS = "SET_DELETE_ADDRESS";
export const GET_OBJECT_ADDRESS = "GET_OBJECT_ADDRESS";
export const SET_OBJECT_ADDRESS = "SET_OBJECT_ADDRESS";
export const CLEAR_OBJECT_ADDRESS = "CLEAR_OBJECT_ADDRESS";
export const GET_EDIT_ADDRESS = "GET_EDIT_ADDRESS";
export const SET_EDIT_ADDRESS = "SET_EDIT_ADDRESS";
export const GET_MAKE_DEFAULT_ADDRESS = "GET_MAKE_DEFAULT_ADDRESS";
export const SET_MAKE_DEFAULT_ADDRESS = "SET_MAKE_DEFAULT_ADDRESS";

export const makeRequestAddress = () => {
  return {
    type: MAKE_REQUEST_ADDRESS,
  };
};
export const failRequestAddress = (error) => {
  return {
    type: FAIL_MESSAGE_ADDRESS,
    payload: error,
  };
};
export const setAddNewAddress = (payload) => ({
  type: SET_ADD_NEW_ADDRESS,
  payload,
});
export const setAllAddress = (payload) => ({
  type: SET_ALL_ADDRESS,
  payload,
});
export const setDeleteAddress = (payload) => ({
  type: SET_DELETE_ADDRESS,
  payload,
});
export const setObjectAddress = (payload) => ({
  type: SET_OBJECT_ADDRESS,
  payload,
});
export const setEditAddress = (payload) => ({
  type: SET_EDIT_ADDRESS,
  payload,
});
export const setMakeDefaultAddress = (payload) => ({
  type: SET_MAKE_DEFAULT_ADDRESS,
  payload,
});

const initialState = {
  loading: false,
  error: null,
  message: null,
  addressList: [],
  addressObj: {},
};

export const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_REQUEST_ADDRESS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FAIL_MESSAGE_ADDRESS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SET_ADD_NEW_ADDRESS:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload,
      };
    case SET_ALL_ADDRESS:
      return {
        ...state,
        loading: false,
        error: null,
        addressList: action.payload,
      };
    case CLEAR_MESSAGE_ADDRESS:
      return {
        ...state,
        message: null,
      };
    case SET_DELETE_ADDRESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case SET_OBJECT_ADDRESS:
      return {
        ...state,
        loading: false,
        addressObj: action.payload,
      };

    case CLEAR_OBJECT_ADDRESS:
      return {
        ...state,
        addressObj: {},
      };

    case SET_EDIT_ADDRESS:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload,
      };
    case SET_MAKE_DEFAULT_ADDRESS:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
        addressList: action.payload.addressList,
      };

    default:
      return state;
  }
};
