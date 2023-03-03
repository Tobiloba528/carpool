import React, { useState, useContext, createContext } from "react";

const AppContext = createContext({
  token: null,
  handleToken: () => {},
});

const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  console.log(token, "this is the token")

  const handleToken = (token) => {
    setToken(token);
  };

  return (
    <AppContext.Provider value={{ token: token, handleToken: handleToken }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;

export const contextData = () => {
  return useContext(AppContext);
};
