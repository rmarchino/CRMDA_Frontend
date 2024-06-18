import React, { useEffect, useState } from "react";

const CRMContext = React.createContext([{}, () => {}]);

const CRMProvider = (props) => {
  //Definir el state inicial
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token') || "",
    auth: localStorage.getItem('auth') === 'true' || false,
  });

  useEffect(() => {
    if (auth.auth) {
      localStorage.setItem('auth', auth.auth);
      localStorage.setItem('token', auth.token);
    }else {
      localStorage.removeItem('auth');
      localStorage.removeItem('token');
    }

  }, [auth]);

  return (
    <CRMContext.Provider value={[auth, setAuth]}>
      {props.children}
    </CRMContext.Provider>
  );
};

export { CRMContext, CRMProvider };
