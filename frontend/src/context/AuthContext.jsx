import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [member, setMember] = useState(
    JSON.parse(localStorage.getItem('fitzone_member') || 'null')
  );
  const [token, setToken] = useState(
    localStorage.getItem('fitzone_token') || null
  );
  const [role, setRole] = useState(
    localStorage.getItem('fitzone_role') || 'Member'
  );

  const login = (memberData, tokenData, roleData = 'Member') => {
    setMember(memberData);
    setToken(tokenData);
    setRole(roleData);
    localStorage.setItem('fitzone_member', JSON.stringify(memberData));
    localStorage.setItem('fitzone_token', tokenData);
    localStorage.setItem('fitzone_role', roleData);
  };

  const logout = () => {
    setMember(null);
    setToken(null);
    setRole(null);
    localStorage.removeItem('fitzone_member');
    localStorage.removeItem('fitzone_token');
    localStorage.removeItem('fitzone_role');
  };

  return (
    <AuthContext.Provider value={{ member, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
