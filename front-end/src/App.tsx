import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import './index.css';
import {AuthProvider, useAuth} from "./context/AuthContext"
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/Register';
import {TransactionProvider} from "./context/TransactionContext"
import {BudgetProvider} from "./context/BudgetContext"

import Dashboard from "./pages/Dashboard"
import { Toaster } from 'react-hot-toast';
import  Layout  from  './components/Layout'
function App() {
  
  const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
  };
  return (
    <>
    <AuthProvider>
      <TransactionProvider>
        <BudgetProvider>
      <Router>
      <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#333',
                  color: '#fff',
                },
              }}
              />
        <Routes>
          <Route path='/login' element={<Login/>}  />
          <Route path="/register" element={<Register />} />
          <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Layout />
                  </PrivateRoute>
                }
                >


                <Route index={true} element={<Dashboard />} />
                </Route>
             
        </Routes>
      </Router>
              </BudgetProvider>
            </TransactionProvider>
    </AuthProvider>
    </>
  )
}

export default App
