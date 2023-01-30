import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
export function ProtectedRoute({ children }) {
  const { auth } = useSelector((store) => store.auth);
  const location = useLocation();
  console.log(auth)
  // if (!auth) {
  //   console.log("redirect to /")
  //   console.log(auth)
  //   console.log(location)
  //   return <Navigate to="/" state={{ from: location }} />;
  // }
 
  return children;
}
