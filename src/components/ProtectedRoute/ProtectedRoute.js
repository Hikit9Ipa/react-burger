
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { getCookie } from "../../utils/cookie/cookie";
export function ProtectedRoute({ children, onlyUnAuth }) {
  //onlyUnAuth только для неавторизированных пользователей
  const { auth } = useSelector((store) => store.auth);
  
  const location = useLocation();
  
  if (!getCookie("refreshToken") && onlyUnAuth ) {
   
    return children;
  }
  if (getCookie("refreshToken") && onlyUnAuth ) {
   
    return <Navigate to="/" state={{ from: location }} />;
  }
  if (!getCookie("refreshToken") && onlyUnAuth==false ) {
  
    return <Navigate to="/login" state={{ from: location }} />;
  }
  
  else {
    return children;}
}