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
import { adminCategoriesReducer } from "./Reducers/adminCategoriesReducer";
import { faqsReducer } from "./Reducers/faqsReducer";
import { cmsReducer } from "./Reducers/cmsReducer";
import { paymentReducer } from "./Reducers/paymentReducer";
import { userNotificationReducer } from "./Reducers/userNotificationReducer";
import { productReducer } from "./Reducers/productReducer";
import { cartReducer } from "./Reducers/cartReducer";
import { farmerReducer } from "./Reducers/Farmer/farmerReducer";
import { addressReducer } from "./Reducers/addressReducer";
import { stripePaymentReducer } from "./Reducers/stripePaymentReducer";
import { orderReducer } from "./Reducers/OrderReducer";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  setPassword: handlePasswordReducer,
  userDetails: userReducer,
  adminReducer: adminReducer,
  adminCategoriesReducer: adminCategoriesReducer,
  faqs: faqsReducer,
  cms: cmsReducer,
  payment: paymentReducer,
  notification: userNotificationReducer,
  product: productReducer,
  cart: cartReducer,
  address: addressReducer,
  farmer: farmerReducer,
  stripePayment: stripePaymentReducer,
  order: orderReducer,
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
