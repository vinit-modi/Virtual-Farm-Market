import { useState } from "react";
import { createContext } from "react";

export const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [checkoutData, setCheckoutData] = useState(null);

  return (
    <>
      <CheckoutContext.Provider value={{ checkoutData, setCheckoutData }}>
        {children}
      </CheckoutContext.Provider>
    </>
  );
};
