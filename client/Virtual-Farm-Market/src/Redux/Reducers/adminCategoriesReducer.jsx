export const CATEGORIES_MAKE_REQUEST = "CATEGORIES_MAKE_REQUEST";
export const CATEGORIES_FAIL_REQUEST = "CATEGORIES_FAIL_REQUEST";
export const CATEGORIES_CLEARE_MESSAGE = "CATEGORIES_CLEARE_MESSAGE";
export const CATEGORIES_CLEARE_ERROR = "CATEGORIES_CLEARE_ERROR";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const SET_ALL_CATEGORIES = "SET_ALL_CATEGORIES";
export const GET_EDIT_CATEGORIES = "GET_EDIT_CATEGORIES";
export const SET_EDIT_CATEGORIES = "SET_EDIT_CATEGORIES";
export const GET_EDIT_STATUS_CATEGORIES = "GET_EDIT_STATUS_CATEGORIES";
export const SET_EDIT_STATUS_CATEGORIES = "SET_EDIT_STATUS_CATEGORIES";
export const GET_DELETE_CATEGORIES = "GET_DELETE_CATEGORIES";
export const SET_DELETE_CATEGORIES = "SET_DELETE_CATEGORIES";
export const GET_ADD_CATEGORIES = "GET_ADD_CATEGORIES";
export const SET_ADD_CATEGORIES = "SET_ADD_CATEGORIES";

export const categoriesMakeRequest = () => {
  return {
    type: CATEGORIES_MAKE_REQUEST,
  };
};

export const categoriesFailRequest = (error) => {
  return {
    type: CATEGORIES_FAIL_REQUEST,
    payload: error,
  };
};
export const getAllCategories = () => {
  return {
    type: GET_ALL_CATEGORIES,
  };
};
export const setAllCategories = (value) => {
  return {
    type: SET_ALL_CATEGORIES,
    payload: value,
  };
};
export const getEditCategories = (value) => {
  return {
    type: GET_EDIT_CATEGORIES,
    payload: value,
  };
};
export const setEditCategories = (value) => {
  return {
    type: SET_EDIT_CATEGORIES,
    payload: value,
  };
};
export const getEditStatusCategories = (value) => {
  return {
    type: GET_EDIT_STATUS_CATEGORIES,
    payload: value,
  };
};
export const setEditStatusCategories = (value) => {
  return {
    type: SET_EDIT_STATUS_CATEGORIES,
    payload: value,
  };
};
export const getDeleteCategories = (value) => {
  return {
    type: GET_DELETE_CATEGORIES,
    payload: value,
  };
};
export const setDeleteCategories = (value) => {
  return {
    type: SET_DELETE_CATEGORIES,
    payload: value,
  };
};
export const getAddCategories = (value) => {
  return {
    type: GET_ADD_CATEGORIES,
    payload: value,
  };
};
export const setAddCategories = (value) => {
  return {
    type: SET_ADD_CATEGORIES,
    payload: value,
  };
};

const initialState = {
  loading: false,
  error: null,
  message: null,
  allCategories: null,
};

export const adminCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES_MAKE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CATEGORIES_FAIL_REQUEST:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CATEGORIES_CLEARE_MESSAGE:
      
      return {
        ...state,
        message: null,
      };
    case CATEGORIES_CLEARE_ERROR:

      return {
        ...state,
        error: null,
      };
    case SET_ALL_CATEGORIES:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
        allCategories: action.payload.data,
      };
    case SET_EDIT_CATEGORIES:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
      };
    case SET_EDIT_STATUS_CATEGORIES:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
      };
    case SET_DELETE_CATEGORIES:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
      };
    case SET_ADD_CATEGORIES:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
      };
    default:
      return state;
  }
};
