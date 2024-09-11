import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Permissions from '../pages/Permissions';
import Sidebar from '../components/Sidebar';
import useAuth from '../contexts/auth/useAuth';
import './layout.css';

const AppRouter: React.FC = () => {
  const { user } = useAuth();
  console.log(user);

  const router = createBrowserRouter([
    {
      path: '/',
      element: user ? (
        <Navigate to="/home" />
      ) : (
        <Navigate to="/login" />
      ),
    },
    { path: 'home', element: (
      <div className="container">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content">
          <Home />
        </div>
      </div>
    )},
    { path: 'permissions', element: (
      <div className="container">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content">
          <Permissions />
        </div>
      </div>
    )},
    { path: 'login', element: <Login /> },
    { path: '*', element: <Navigate to="/login" /> },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
