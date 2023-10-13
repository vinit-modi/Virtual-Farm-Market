import { store } from "../Redux/store";

function adminAuthId() {
  if (store.getState().adminReducer.adminId) {
    return store.getState().adminReducer.adminId;
  }
  return null;
}

export default adminAuthId;
