import { store } from "../Redux/store";

function authToken() {
  if (store.getState().auth.token) {
    return store.getState().auth.token;
  }
  return null;
}

export default authToken;
