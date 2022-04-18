import React, { createContext, useMemo, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const providerValues = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);
  return (
    <AuthContext.Provider value={providerValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
