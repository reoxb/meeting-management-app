import { createContext, useState } from "react";

const AuthContext = createContext();
const { Provider, Consumer } = AuthContext;

const AuthProvider = ({ children }) => {
  const userInfo = localStorage.getItem('userInfo');
  const [authState, setAuthState] = useState({
    userInfo: userInfo ? JSON.parse(userInfo) : null
  });

  const logout = () => {
    localStorage.removeItem('userInfo');
  };

  const setAuthInfo = (userInfo) => {
    localStorage.setItem(
      'userInfo',
      JSON.stringify(userInfo)
    );

    setAuthState({
      userInfo,
    });
  };

  return (
    <Provider value={{ logout, authState, setAuthState: authInfo => setAuthInfo(authInfo), }}>
      {children}
    </Provider>
  );
}

export { AuthProvider, Consumer as AuthConsumer, AuthContext };