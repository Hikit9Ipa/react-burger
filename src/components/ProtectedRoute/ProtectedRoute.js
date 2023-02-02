import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCookie } from "../../utils/cookie/cookie";
import { useLocation, Navigate } from "react-router-dom";
export function ProtectedRoute({ children, onlyUnAuth }) {
  //onlyUnAuth только для неавторизированных пользователей
  const { auth } = useSelector((store) => store.auth);
  const location = useLocation();
  
  if (!auth && onlyUnAuth ) {
   
    return children;
  }
  if (auth && onlyUnAuth ) {
   
    return <Navigate to="/" state={{ from: location }} />;
  }
  if (!auth && onlyUnAuth==false ) {
  
    return <Navigate to="/login" state={{ from: location }} />;
  }
  
  else {
    return children;}
}