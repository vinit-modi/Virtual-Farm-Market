export const MAKE_REQUEST = "MAKE_REQUEST";
export const FAIL_MESSAGE = "FAIL_MESSAGE";
export const CLEAR_MESSAGE_ERROR = "CLEAR_MESSAGE_ERROR";
export const POST_SIGNUP_USER = "POST_SIGNUP_USER";
export const SET_SIGNUP_USER_MESSAGE = "SET_SIGNUP_USER_MESSAGE";
export const POST_SIGNIN_USER = "POST_SIGNIN_USER";
export const SET_POST_SIGNIN_USER_MESSAGE = "SET_POST_SIGNIN_USER_MESSAGE";
export const GET_CITY_LIST = "GET_CITY_LIST";
export const SET_CITY_LIST = "SET_CITY_LIST";
export const GET_PROVINCE_LIST = "GET_PROVINCE_LIST";
export const SET_PROVINCE_LIST = "SET_PROVINCE_LIST";
export const GET_CONFIRM_EMAIL_FOR_USER = "GET_CONFIRM_EMAIL_FOR_USER";
export const SET_CONFIRM_EMAIL_FOR_USER = "SET_CONFIRM_EMAIL_FOR_USER";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const SET_ALL_USERS = "SET_ALL_USERS";
export const SET_ONE_USERS = "SET_ONE_USERS";
export const GET_USER_PROFILE_IMAGE = "GET_USER_PROFILE_IMAGE";
export const SET_USER_PROFILE_IMAGE = "SET_USER_PROFILE_IMAGE";
export const GET_AUTH_LOGOUT = "GET_AUTH_LOGOUT";

export const makeRequest = () => {
  return {
    type: MAKE_REQUEST,
  };
};
export const failRequest = (error) => {
  return {
    type: FAIL_MESSAGE,
    payload: error,
  };
};
export const clearMessage = (value) => {
  return {
    type: CLEAR_MESSAGE_ERROR,
    payload: value,
  };
};

export const postSignUpUser = (value) => {
  return {
    type: POST_SIGNUP_USER,
    payload: value,
  };
};

export const setSignUpMessage = (value) => {
  return {
    type: SET_SIGNUP_USER_MESSAGE,
    payload: value,
  };
};

export const postSignInUser = (value) => {
  return {
    type: POST_SIGNIN_USER,
    payload: value,
  };
};
export const setSignInUser = (value) => {
  return {
    type: SET_POST_SIGNIN_USER_MESSAGE,
    payload: value,
  };
};
export const getCityList = () => {
  return {
    type: GET_CITY_LIST,
  };
};

export const setCityList = (value) => {
  return {
    type: SET_CITY_LIST,
    payload: value,
  };
};
export const getProvinceList = () => {
  return {
    type: GET_PROVINCE_LIST,
  };
};
export const setProvinceList = (value) => {
  return {
    type: SET_PROVINCE_LIST,
    payload: value,
  };
};
export const getConfirmEmailUser = (token) => {
  return {
    type: GET_CONFIRM_EMAIL_FOR_USER,
    payload: token,
  };
};
export const setConfirmEmailUser = (value) => {
  return {
    type: SET_CONFIRM_EMAIL_FOR_USER,
    payload: value,
  };
};
export const setUserProfileImageUser = (value) => {
  return {
    type: SET_USER_PROFILE_IMAGE,
    payload: value,
  };
};

const authInitialState = {
  loading: false,
  error: null,
  message: null,
  token: null,
  cityList: null,
  provinceList: null,
  isEmailConfirmed: null,
  _idOfLoggedIn: null,
  userId: "",
  userProfileImage: null,
  userType: null,
};

export const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
        // provinceList:null
      };
    case FAIL_MESSAGE:
      return {
        ...state,
        token: null,
        error: action.payload,
        message: null,
        loading: false,
        isEmailConfirmed: null,
        allUsers: null,
        userType: null,
      };
    case SET_SIGNUP_USER_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
        userId: action.payload.userId,
        loading: false,
        error: null,
      };
    case CLEAR_MESSAGE_ERROR:
      if (action.payload === "message") {
        return {
          ...state,
          message: null,
        };
      } else if (action.payload === "error") {
        return {
          ...state,
          error: null,
        };
      }
    case SET_POST_SIGNIN_USER_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
        token: action.payload.data.accessToken,
        _idOfLoggedIn: action.payload.data._id,
        userType: action.payload.data.userType,
        loading: false,
        error: null,
      };
    case SET_CITY_LIST:
      return {
        ...state,
        loading: false,
        error: null,
        cityList: action.payload.data,
      };
    case SET_PROVINCE_LIST:
      return {
        ...state,
        loading: false,
        error: null,
        provinceList: action.payload.data,
      };
    case SET_CONFIRM_EMAIL_FOR_USER:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
        isEmailConfirmed: action.payload.isEmailConfirmed,
      };
    case SET_USER_PROFILE_IMAGE:
      return {
        ...state,
        loading: false,
        error: null,
        userProfileImage: action.payload,
      };

    case GET_AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userType: null,
        userProfileImage: null,
        _idOfLoggedIn: null,
        isEmailConfirmed: null,
        userId: "",
        error: null,
      };

    default:
      return state;
  }
};
