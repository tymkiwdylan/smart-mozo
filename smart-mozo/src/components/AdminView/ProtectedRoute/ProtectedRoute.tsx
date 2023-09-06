import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { isValidToken } from '../../../api/apiUtils';

interface ProtectedRouteProps {
  allowedTypes: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedTypes, children }) => {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkLoggedIn = async () => {
     
        const loggedIn = await isValidToken();
        setIsUserLoggedIn(loggedIn);
      
        setIsLoading(false);
    }
    checkLoggedIn();
    }, []);
  

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if ((!isUserLoggedIn)) {
    return <Navigate to="/admin/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
