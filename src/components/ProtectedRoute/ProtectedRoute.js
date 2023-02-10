
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { getCookie } from "../../utils/cookie/cookie";
export function ProtectedRoute({ children, onlyUnAuth }) {
  //onlyUnAuth только для неавторизированных пользователей
  const { auth } = useSelector((store) => store.auth);
  
  const location = useLocation();
  const from = location.state?.from || '/';
  const isLoggedIn = getCookie("refreshToken")
  if (!isLoggedIn && onlyUnAuth ) {
    return children;
  }
  if (isLoggedIn && onlyUnAuth ) {
    return <Navigate to={ from } state={{ from: location }} />;
  }
  if (!isLoggedIn && onlyUnAuth==false ) {
  
    return <Navigate to="/login" state={{ from: location }} />;
  }
  
  else {
    return children;}
}