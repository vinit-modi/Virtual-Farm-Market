import React from "react";
import IndexForRoutes from "./Routes/IndexForRoutes";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <div>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <IndexForRoutes />
          </PersistGate>
        </Provider>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}

export default App;
