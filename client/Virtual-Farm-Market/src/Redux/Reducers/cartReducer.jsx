export const MAKE_REQUEST_CART = "MAKE_REQUEST_CART";
export const FAIL_REQUEST_CART = "FAIL_REQUEST_CART";
export const GET_ADD_PRODUCT_TO_CART = "GET_ADD_PRODUCT_TO_CART";
export const SET_ADD_PRODUCT_TO_CART = "SET_ADD_PRODUCT_TO_CART";
export const GET_REMOVE_PRODUCT_FROM_CART = "GET_REMOVE_PRODUCT_FROM_CART";
export const SET_REMOVE_PRODUCT_FROM_CART = "SET_REMOVE_PRODUCT_FROM_CART";
export const GET_REMOVE_PRODUCT_TO_CART = "GET_REMOVE_PRODUCT_TO_CART";
export const SET_REMOVE_PRODUCT_TO_CART = "SET_REMOVE_PRODUCT_TO_CART";
export const GET_ALLPRODUCTS_CART = "GET_ALLPRODUCTS_CART";
export const SET_ALLPRODUCTS_CART = "SET_ALLPRODUCTS_CART";
export const GET_CART_ITEM_COUNT_CART = "GET_CART_ITEM_COUNT_CART";
export const SET_CART_ITEM_COUNT_CART = "SET_CART_ITEM_COUNT_CART";
export const GET_REMOVE_PRODUCT_CART = "GET_REMOVE_PRODUCT_CART";
export const SET_REMOVE_PRODUCT_CART = "SET_REMOVE_PRODUCT_CART";
export const CLEAR_CART_LIST_CART = "CLEAR_CART_LIST_CART";
export const CLEAR_PRODUCT_COUNT_TO_CART = "CLEAR_PRODUCT_COUNT_TO_CART";
export const CLEAR_MESSAGE_CART = "CLEAR_MESSAGE_CART";

export const makeRequestCart = () => ({
  type: MAKE_REQUEST_CART,
});

export const failRequestCart = (payload) => ({
  type: FAIL_REQUEST_CART,
  payload,
});

export const setAddProductToCart = (payload) => ({
  type: SET_ADD_PRODUCT_TO_CART,
  payload,
});

export const setRemoveProductToCart = (payload) => ({
  type: SET_REMOVE_PRODUCT_TO_CART,
  payload,
});

export const setAllProductsCart = (payload) => ({
  type: SET_ALLPRODUCTS_CART,
  payload,
});

export const setCartItemCountCart = (payload) => ({
  type: SET_CART_ITEM_COUNT_CART,
  payload,
});

export const setRemoveProductCart = (payload) => ({
  type: SET_REMOVE_PRODUCT_CART,
  payload,
});

const initialState = {
  loading: false,
  error: null,
  message: null,
  productQuantityCount: null,
  TotalCartQuantityCount: null,
  cartProductList: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_REQUEST_CART:
      return {
        ...state,
        loading: true,
      };
    case FAIL_REQUEST_CART:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CLEAR_MESSAGE_CART:
      return {
        ...state,
        message: null,
      };
    case SET_ADD_PRODUCT_TO_CART:
      return {
        ...state,
        loading: false,
        error: null,
        productQuantityCount: action.payload.quantity,
      };
    case SET_REMOVE_PRODUCT_TO_CART:
      return {
        ...state,
        loading: false,
        error: null,
        productQuantityCount: action.payload.quantity,
      };
    case CLEAR_PRODUCT_COUNT_TO_CART:
      return {
        ...state,
        productQuantityCount: null,
      };
    case SET_ALLPRODUCTS_CART:
      return {
        ...state,
        loading: false,
        error: null,
        cartProductList: action.payload,
      };

    case SET_CART_ITEM_COUNT_CART:
      return {
        ...state,
        loading: false,
        error: null,
        TotalCartQuantityCount: action.payload,
      };

    case CLEAR_CART_LIST_CART:
      return {
        ...state,
        cartProductList: [],
      };

    case SET_REMOVE_PRODUCT_CART:
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
