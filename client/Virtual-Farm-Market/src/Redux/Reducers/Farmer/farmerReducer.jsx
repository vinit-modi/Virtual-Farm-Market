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

const initialState = {
  loading: false,
  error: null,
  message: null,
  categoryList: [],
  unitList:[]
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

    default:
      return state;
  }
};
