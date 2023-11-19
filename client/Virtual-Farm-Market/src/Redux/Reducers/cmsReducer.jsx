export const MAKE_CMS_REQUEST = "MAKE_CMS_REQUEST";
export const FAIL_CMS_REQUEST = "FAIL_CMS_REQUEST";
export const CLEAR_CMS_MESSAGE = "CLEAR_CMS_MESSAGE";
export const GET_CMS_FOR_USER = "GET_CMS_FOR_USER";
export const SET_CMS_FOR_USER = "SET_CMS_FOR_USER";
export const CLEAR_CMS_FOR_USER = "CLEAR_CMS_FOR_USER";
export const GET_CMS_OBJECT_ADMIN = "GET_CMS_OBJECT_ADMIN";
export const SET_CMS_OBJECT_ADMIN = "SET_CMS_OBJECT_ADMIN";
export const GET_CMS_UPDATE_ADMIN = "GET_CMS_UPDATE_ADMIN";
export const SET_CMS_UPDATE_ADMIN = "SET_CMS_UPDATE_ADMIN";

export const makeCmsRequest = () => ({
  type: MAKE_CMS_REQUEST,
});
export const failCmsRequest = (error) => ({
  type: FAIL_CMS_REQUEST,
  payload: error,
});

//User:-
export const setCmsForUser = (payload) => ({
  type: SET_CMS_FOR_USER,
  payload,
});

//Admin:-
export const setCmsObjectForAdmin = (payload) => ({
  type: SET_CMS_OBJECT_ADMIN,
  payload,
});
export const setCmsUpdateForAdmin = (payload) => ({
  type: SET_CMS_UPDATE_ADMIN,
  payload,
});

const initialState = {
  loading: false,
  error: null,
  message: null,
  cmsDetails: null,
  cmsDetailsAdmin: null,
};

export const cmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_CMS_REQUEST:
      return { ...state, loading: true, error: null };
    case FAIL_CMS_REQUEST:
      return {
        ...state,
        loading: false,
        error: action.payload,
        cmsDetails: null,
        message: null,
      };
    case CLEAR_CMS_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case SET_CMS_FOR_USER:
      return {
        ...state,
        loading: false,
        error: null,
        cmsDetails: action.payload,
      };
      
      case CLEAR_CMS_FOR_USER:
        return {
          cmsDetails:null,

        }
    case SET_CMS_OBJECT_ADMIN:
      return {
        ...state,
        loading: false,
        error: null,
        cmsDetailsAdmin: action.payload,
      };
    case SET_CMS_UPDATE_ADMIN:
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
