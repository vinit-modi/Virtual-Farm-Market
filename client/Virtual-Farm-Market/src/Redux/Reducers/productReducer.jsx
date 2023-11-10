export const MAKE_REQUEST_PRODUCT = "MAKE_REQUEST_PRODUCT";
export const FAIL_REQUEST_PRODUCT = "FAIL_REQUEST_PRODUCT";
export const GET_CATEGORIES_PRODUCT = "GET_CATEGORIES_PRODUCT";
export const SET_CATEGORIES_PRODUCT = "SET_CATEGORIES_PRODUCT";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const SET_ALL_PRODUCTS = "SET_ALL_PRODUCTS";

export const makeRequestProduct = () => ({
  type: MAKE_REQUEST_PRODUCT,
});

export const failRequestProduct = (payload) => ({
  type: FAIL_REQUEST_PRODUCT,
  payload,
});

export const setCategoryListProduct = (payload) => ({
  type: SET_CATEGORIES_PRODUCT,
  payload,
});
export const setAllProduct = (payload) => ({
  type: SET_ALL_PRODUCTS,
  payload,
});

const initialState = {
  loading: false,
  error: null,
  message: null,
  categoryList: [],
  productList: [],
  unitList: [],
  productObj: {},
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_REQUEST_PRODUCT:
      return {
        ...state,
        loading: true,
      };
    case FAIL_REQUEST_PRODUCT:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case SET_CATEGORIES_PRODUCT:
      return {
        ...state,
        loading: false,
        error: null,
        categoryList: action.payload,
      };
    case SET_ALL_PRODUCTS:
      return {
        ...state,
        loading: false,
        error: null,
        productList: action.payload,
      };
    default:
      return state;
  }
};