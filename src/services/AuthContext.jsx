import React, { createContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth,clearAuth,setLogin,setLogout } from '../store/authSlice';
// Create a context with a default value
export const AuthContext = createContext({
  isAuthenticated: false,
  token: null,
  login: (token) => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const savedToken = auth?.access_token;
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (newToken) => {
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    dispatch(setLogout({
      'access_token':null,
      'isAuthenticated':false
    }));
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
