export const MAKE_FAQS_REQUEST = "MAKE_FAQS_REQUEST";
export const FAIL_FAQS_MESSAGE = "FAIL_FAQS_MESSAGE";
export const CLEAR_MESSAGE_FAQS = "CLEAR_MESSAGE_FAQS";
export const GET_ALL_USER_FAQS = "GET_ALL_USER_FAQS";
export const SET_ALL_USER_FAQS = "SET_ALL_USER_FAQS";
export const GET_ALL_ADMIN_FAQS = "GET_ALL_ADMIN_FAQS";
export const SET_ALL_ADMIN_FAQS = "SET_ALL_ADMIN_FAQS";
export const GET_ADD_ADMIN_FAQS = "GET_ADD_ADMIN_FAQS";
export const SET_ADD_ADMIN_FAQS = "SET_ADD_ADMIN_FAQS";
export const GET_OBJECT_OF_ADMIN_FAQS = "GET_OBJECT_OF_ADMIN_FAQS";
export const SET_OBJECT_OF_ADMIN_FAQS = "SET_OBJECT_OF_ADMIN_FAQS";
export const GET_UPDATE_FAQS_ADMIN = "GET_UPDATE_FAQS_ADMIN";
export const SET_UPDATE_FAQS_ADMIN = "SET_UPDATE_FAQS_ADMIN";
export const GET_DELETE_ADMIN_FAQS = "GET_DELETE_ADMIN_FAQS";
export const SET_DELETE_ADMIN_FAQS = "SET_DELETE_ADMIN_FAQS";

export const makeFaqsRequest = () => {
  return {
    type: MAKE_FAQS_REQUEST,
  };
};
export const failFaqsRequest = (error) => {
  return {
    type: FAIL_FAQS_MESSAGE,
    payload: error,
  };
};

//USER:-
export const setAllUserFaqs = (payload) => ({
  type: SET_ALL_USER_FAQS,
  payload,
});


//ADMIN:-
export const setAllAdminFaqs = (payload) => ({
  type: SET_ALL_ADMIN_FAQS,
  payload,
});
export const setAddAdminFaqs = (payload) => ({
  type: SET_ADD_ADMIN_FAQS,
  payload,
});
export const setObjectOfAdminFaqs = (payload) => ({
  type: SET_OBJECT_OF_ADMIN_FAQS,
  payload,
});
export const setUpdateAdminFaqs = (payload) => ({
  type: SET_UPDATE_FAQS_ADMIN,
  payload,
});
export const setDeleteAdminFaqs = (payload) => ({
  type: SET_DELETE_ADMIN_FAQS,
  payload,
});

const initialState = {
  loading: false,
  error: null,
  message: null,
  faqsDetailsForUsers: null,
  faqsDetailsForAdmin: null,
  faqsObjectForUpdateAdmin: null,
};

export const faqsReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_FAQS_REQUEST:
      return {
        ...state,
        message: null,
        error: null,
        loading: true,
      };
    case FAIL_FAQS_MESSAGE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_MESSAGE_FAQS:
      return {
        ...state,
        message: null,
        faqsObjectForUpdateAdmin: null,
      };
    case SET_ALL_USER_FAQS:
      return {
        ...state,
        loading: false,
        error: null,
        faqsDetailsForUsers: action.payload,
      };
    case SET_ALL_ADMIN_FAQS:
      return {
        ...state,
        loading: false,
        error: null,
        faqsDetailsForAdmin: action.payload,
      };
    case SET_ADD_ADMIN_FAQS:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload,
      };
    case SET_OBJECT_OF_ADMIN_FAQS:
      return {
        ...state,
        loading: false,
        error: null,
        faqsObjectForUpdateAdmin: action.payload,
      };
    case SET_UPDATE_FAQS_ADMIN:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload,
      };
      
    case SET_DELETE_ADMIN_FAQS:
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
