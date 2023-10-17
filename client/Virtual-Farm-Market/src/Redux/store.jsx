import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { authReducer } from "./Reducers/authReducer";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import waterSaga from "./Sagas/watcherSaga";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { handlePasswordReducer } from "./Reducers/handlePasswordReducer";
import { userReducer } from "./Reducers/userReducer";
import { adminReducer } from "./Reducers/adminReducer";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  setPassword: handlePasswordReducer,
  userDetails:userReducer,
  adminReducer :adminReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const getDefaultMiddlewares = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
});

const store = configureStore({
  reducer: persistedReducer,
  middleware: [logger, sagaMiddleware, ...getDefaultMiddlewares],
});
sagaMiddleware.run(waterSaga);

const persistor = persistStore(store);

export { store, persistor };
