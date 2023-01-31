import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCookie } from "../../utils/cookie/cookie";
import { useLocation, Navigate } from "react-router-dom";
export function ProtectedRoute({ children, onlyUnAuth }) {
  //onlyUnAuth только для неавторизированных пользователей
  const { auth } = useSelector((store) => store.auth);
  const location = useLocation();
  console.log(onlyUnAuth +" "+ auth)
  if (!auth && onlyUnAuth ) {
    console.log(" ne auth");
    return children;
  }
  if (auth && onlyUnAuth ) {
    console.log("auth");
    return <Navigate to="/" state={{ from: location }} />;
  }
  if (!auth && onlyUnAuth==false ) {
    console.log(" ne auth and onlyUnAuth==false");
    return <Navigate to="/login" state={{ from: location }} />;
  }
  
  else {console.log("else")
    return children;}
  //const location = useLocation()
  //console.log(  " yes" );
  //const navigate = useNavigate()
  //  if(getCookie("accessToken"))console.log(auth + " yes" + getCookie("accessToken"));
  //  if(!getCookie("accessToken"))console.log(auth + " not" + getCookie("accessToken"));

  // return <Navigate to="/" state ={{from:location}}/>
  //if(!getCookie("accessToken")) return <Navigate to="/" state ={{from:location}}/>
  //return <Navigate to="/" state ={{from:location}}/>

  
}

//const location = useLocation();
//console.log(auth +"auth")
// useEffect(() => {
//   console.log(auth+"Newauth")
//   if(auth){
//     navigate("/");
//     console.log("User Auth")
//     console.log(auth)
//   }if(!auth && getCookie("accessToken") ){
//     navigate('/404');
//     console.log("User not Auth")
//     console.log(auth)
//   }else{
//     console.log("else")
//   }

// }, [auth]);
// if(auth){
//   console.log("User Auth")
// }if(!auth){
//   console.log("User not Auth")
// }
// if (!auth) {
//   console.log("redirect to /")
//   console.log(auth)
//   console.log(location)
//   return <Navigate to="/" state={{ from: location }} />;
// }
