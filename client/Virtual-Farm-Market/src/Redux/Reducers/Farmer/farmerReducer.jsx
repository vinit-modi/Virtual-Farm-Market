export const MAKE_REQUEST_FARMER = "MAKE_REQUEST_FARMER";
export const FAIL_MESSAGE_FARMER = "FAIL_MESSAGE_FARMER";
export const CLEARE_MESSAGE_FARMER = "CLEARE_MESSAGE_FARMER";

export const GET_CATEGORY_LIST_FOR_PRODUCT_FARMER =
  "GET_CATEGORY_LIST_FOR_PRODUCT_FARMER";
export const SET_CATEGORY_LIST_FOR_PRODUCT_FARMER =
  "SET_CATEGORY_LIST_FOR_PRODUCT_FARMER";
export const GET_UNIT_LIST_FOR_PRODUCT_FARMER =
  "GET_UNIT_LIST_FOR_PRODUCT_FARMER";
export const SET_UNIT_LIST_FOR_PRODUCT_FARMER =
  "SET_UNIT_LIST_FOR_PRODUCT_FARMER";

// export const GET_ADD_PRODUCT_FARMER = "GET_ADD_PRODUCT_FARMER";
// export const SET_ADD_PRODUCT_FARMER = "SET_ADD_PRODUCT_FARMER";
export const GET_ALL_ORDER_FARMER = "GET_ALL_ORDER_FARMER";
export const SET_ALL_ORDER_FARMER = "SET_ALL_ORDER_FARMER";
export const GET_UPDATE_STATUS_ORDER_FARMER = "GET_UPDATE_STATUS_ORDER_FARMER";
export const SET_UPDATE_STATUS_ORDER_FARMER = "SET_UPDATE_STATUS_ORDER_FARMER";

export const makeRequestFarmer = () => {
  return {
    type: MAKE_REQUEST_FARMER,
  };
};
export const failRequestFarmer = (error) => {
  return {
    type: FAIL_MESSAGE_FARMER,
    payload: error,
  };
};
export const setCategoryListForProductFarmer = (payload) => ({
  type: SET_CATEGORY_LIST_FOR_PRODUCT_FARMER,
  payload,
});
export const setUnitListForProductFarmer = (payload) => ({
  type: SET_UNIT_LIST_FOR_PRODUCT_FARMER,
  payload,
});

// export const setAddProductFarmer = (payload) => ({
//   type: SET_ADD_PRODUCT_FARMER,
//   payload,
// });
export const setAllOrderFarmer = (payload) => ({
  type: SET_ALL_ORDER_FARMER,
  payload,
});
export const setUpdateStatusOrderFarmer = (payload) => ({
  type: SET_UPDATE_STATUS_ORDER_FARMER,
  payload,
});

const initialState = {
  loading: false,
  error: null,
  message: null,
  categoryList: [],
  unitList: [],
  orderList: [],
};

export const farmerReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_REQUEST_FARMER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FAIL_MESSAGE_FARMER:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEARE_MESSAGE_FARMER:
      return {
        ...state,
        message: null,
      };
    case SET_UNIT_LIST_FOR_PRODUCT_FARMER:
      return {
        ...state,
        loading: false,
        error: null,
        unitList: action.payload,
      };
    case SET_CATEGORY_LIST_FOR_PRODUCT_FARMER:
      return {
        ...state,
        loading: false,
        error: null,
        categoryList: action.payload,
      };
    case SET_ALL_ORDER_FARMER:
      return {
        ...state,
        loading: false,
        error: null,
        orderList: action.payload,
      };

    case SET_UPDATE_STATUS_ORDER_FARMER:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload,
      };
    // case SET_ADD_PRODUCT_FARMER:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: null,
    //     message: action.payload,
    //   };

    default:
      return state;
  }
};
