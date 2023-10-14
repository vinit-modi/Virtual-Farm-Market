export const MAKE_ADMIN_REQUEST = "MAKE_ADMIN_REQUEST";
export const FAIL_ADMIN_MESSAGE = "FAIL_ADMIN_MESSAGE";
export const GET_ADMIN_LOGIN = "GET_ADMIN_LOGIN";
export const SET_ADMIN_LOGIN = "SET_ADMIN_LOGIN";
export const SET_ADMIN_LOGOUT = "SET_ADMIN_LOGOUT";
export const CLEAR_MESSAGE_ADMIN = "CLEAR_MESSAGE_ADMIN";
export const GET_ADMIN_PROFILE_DATA = "GET_ADMIN_PROFILE_DATA";
export const SET_ADMIN_PROFILE_DATA = "SET_ADMIN_PROFILE_DATA";
export const GET_ADMIN_EDIT_PROFILE = "GET_ADMIN_EDIT_PROFILE";
export const SET_ADMIN_EDIT_PROFILE = "SET_ADMIN_EDIT_PROFILE";
export const GET_ADMIN_CHANGE_PASSWORD = "GET_ADMIN_CHANGE_PASSWORD";
export const SET_ADMIN_CHANGE_PASSWORD = "SET_ADMIN_CHANGE_PASSWORD";
export const GET_ADMINSIDE_USER_LIST = "GET_ADMINSIDE_USER_LIST";
export const SET_ADMINSIDE_USER_LIST = "SET_ADMINSIDE_USER_LIST";

export const makeAdminRequest = () => {
  return {
    type: MAKE_ADMIN_REQUEST,
  };
};
export const failAdminRequest = (error) => {
  return {
    type: FAIL_ADMIN_MESSAGE,
    payload: error,
  };
};

export const getAdminLogin = (value) => {
  return {
    type: GET_ADMIN_LOGIN,
    payload: value,
  };
};
export const setAdminLogin = (value) => {
  return {
    type: SET_ADMIN_LOGIN,
    payload: value,
  };
};
export const setAdminLogout = (value) => {
  return {
    type: SET_ADMIN_LOGOUT,
    payload: value,
  };
};
export const setClearMessage = (value) => {
  return {
    type: CLEAR_MESSAGE_ADMIN,
    payload: value,
  };
};

export const getAdminProfileData = (value) => {
  return {
    type: GET_ADMIN_PROFILE_DATA,
    payload: value,
  };
};
export const setAdminProfileData = (value) => {
  return {
    type: SET_ADMIN_PROFILE_DATA,
    payload: value,
  };
};
export const getAdminEditProfile = (value) => {
  return {
    type: GET_ADMIN_EDIT_PROFILE,
    payload: value,
  };
};
export const setAdminEditProfile = (value) => {
  return {
    type: SET_ADMIN_EDIT_PROFILE,
    payload: value,
  };
};
export const getAdminChangePassword = (value) => {
  return {
    type: GET_ADMIN_CHANGE_PASSWORD,
    payload: value,
  };
};
export const setAdminChangePassword = (value) => {
  return {
    type: SET_ADMIN_CHANGE_PASSWORD,
    payload: value,
  };
};
export const getAdminSideUserList = (value) => {
  return {
    type: GET_ADMINSIDE_USER_LIST,
    payload: value,
  };
};
export const setAdminSideUserList = (value) => {
  return {
    type: SET_ADMINSIDE_USER_LIST,
    payload: value,
  };
};

const initialState = {
  loading: false,
  error: null,
  message: null,
  adminId: null,
  profileData: null,
  userList : null
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        userList:null
      };
    case FAIL_ADMIN_MESSAGE:
      return {
        ...state,
        loading: false,
        message: null,
        error: action.payload,
        profileData: null,
      };
    case SET_ADMIN_LOGIN:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
        adminId: action.payload.id,
      };
    case SET_ADMIN_LOGOUT:
      return {
        ...state,
        loading: false,
        error: null,
        message: null,
        adminId: null,
      };
    case CLEAR_MESSAGE_ADMIN:
      return {
        ...state,
        loading: false,
        message: null,
      };
    case SET_ADMIN_PROFILE_DATA:
      return {
        ...state,
        loading: false,
        error: null,
        message: null,
        profileData: action?.payload,
      };
    case SET_ADMIN_EDIT_PROFILE:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload,
      };
      case SET_ADMINSIDE_USER_LIST:
        return {
            ...state,
            loading:false,
            error:null,
            message:null,
            userList:action.payload
        }
    default:
      return state;
  }
};
