import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
const { isAuthenticated } = useAuth();

const NotAllowedMsg = () => (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full text-center">
              <h1 className="mb-4 text-xl font-semibold text-red-600 dark:text-red-500">Access Denied</h1>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You are not allowed to view this page. Please log in first.
              </p>
              <a
                href="/login"
                className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600 mt-4 inline-block"
              >
                Go to Login Page
              </a>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
  
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
            <NotAllowedMsg/>
        )
      }
    />
  );
};

export default ProtectedRoute;
