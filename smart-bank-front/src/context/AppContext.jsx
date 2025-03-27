import { createContext, useState } from "react";
import { getBalance } from "../provider";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState("");

  const loadBalance = async () => {
    try {
      const balance = await getBalance();
      setBalance(balance);
      return balance;
    } catch (error) {
      setError(`${error}`);
    }
  };

  return (
    <AppContext.Provider
      value={{
        loadBalance,
        balance,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
