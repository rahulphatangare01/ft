// import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
// import { User, AuthContextType } from '../types';

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(() => {
//     try {
//       const savedUser = localStorage.getItem('user');
//       return savedUser ? JSON.parse(savedUser) : null;
//     } catch {
//       return null;
//     }
//   });

//   useEffect(() => {
//     if (user) {
//       localStorage.setItem('user', JSON.stringify(user));
//     } else {
//       localStorage.removeItem('user');
//     }
//   }, [user]);

//   const login = useCallback((email: string, password: string): boolean => {
//     if (email === 'user@gmail.com' && password === 'User@123') {
//       const userData: User = {
//         email,
//         name: 'Test User'
//       };
//       setUser(userData);
//       return true;
//     }
//     return false;
//   }, []);

//   const logout = useCallback(() => {
//     setUser(null);
//   }, []);

//   const value = {
//     user,
//     login,
//     logout
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
