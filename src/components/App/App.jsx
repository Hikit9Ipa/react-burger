import React, { useEffect } from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader.jsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.js";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.jsx";
import Modal from "../Modal/Modal.jsx";
import IngredientDetails from "../IngredientDetails/IngredientDetails.jsx";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredientsDisp, getOrderDisp } from "../../utils/Api/Api.js";
import {
  OPEN_ORDER,
  CLOSE_ORDER,
  OPEN_INGREDIENT,
  CLOSE_INGREDIENT,
} from "../../services/reducers/visibleModals";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  MainPage,
  Page404,
  LoginPage,
  ForgotPasswordPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  IngredientsPage,
} from "../../pages";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { sendGetUserInfoRequest } from "../../utils/Api/AuthApi.js";
import { ADD_CURRENT_INGREDIENT } from "../../services/reducers/currentIngredient";
import { getCookie } from "../../utils/cookie/cookie";
function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store.auth);
  useEffect(() => {
    dispatch(getIngredientsDisp());
  }, [dispatch]);

  useEffect(() => {
    if(!auth && getCookie("refreshToken") ){
    dispatch(sendGetUserInfoRequest());
  }
  }, []);
  const location = useLocation();
  const backmenu = location.state?.backmenu;
  const currentIngredientn = useSelector(
    (state) => state.currentIngredient.currentIngredient
  );
  const ingredientVisiblen = useSelector(
    (state) => state.visible.ingredientVisibles
  );
  const orderNum = useSelector((state) => state.order.order.number);
  const orderS = useSelector((state) => state.order.orderRequest);

  

  const openIngredientModaln = (item) => {
    dispatch({ type: ADD_CURRENT_INGREDIENT, item });
    dispatch({ type: OPEN_INGREDIENT });
  };

  const openOrderModal = (orderData) => {
    if(auth)dispatch(getOrderDisp(orderData));
  };

  useEffect(() => {
    if (orderNum !== null) dispatch({ type: OPEN_ORDER });
  }, [orderNum, orderS]);

  return (
    <DndProvider backend={HTML5Backend}>
      <AppHeader />
       <Routes>
        <Route
          path="/"
          exact={true}
          element={
            <MainPage
              openIngredientModaln={openIngredientModaln}
              openOrderModal={openOrderModal}
            />
          } />
        
            <Route path="/404" exact={true} element={<Page404 />} />
            <Route path="*" exact={true} element={<Page404 />} />
            {/* <Route path="/login" exact={true} element={<LoginPage />} />  */}
            <Route path="/login" exact={true} element={<ProtectedRoute onlyUnAuth><LoginPage /></ProtectedRoute>} />
            <Route path="/register" exact={true} element={<ProtectedRoute onlyUnAuth><RegisterPage /></ProtectedRoute>} />
            <Route path="/profile" exact={true} element={<ProtectedRoute onlyUnAuth={false}><ProfilePage /></ProtectedRoute>} />
            <Route path="/forgot-password" exact={true} element={<ProtectedRoute onlyUnAuth ={true}><ForgotPasswordPage /></ProtectedRoute>} />
            <Route path="/reset-password" exact={true} element={<ProtectedRoute onlyUnAuth ={true} ><ResetPasswordPage /></ProtectedRoute>} />
            <Route path="/profile" exact={true} element={<ProfilePage />} />
            {location.state == "ingredient"  && (
              
        <Route
          path="/ingredients/:id"
          element={
            <MainPage
              openIngredientModaln={openIngredientModaln}
              openOrderModal={openOrderModal}></MainPage>
          }
        />
      )} else {
        <Route path="/ingredients/:id" exact={true} element={<IngredientsPage openIngredientModaln={openIngredientModaln} openOrderModal={openOrderModal}/>}/> 
      }
      </Routes>
    </DndProvider>
  );
}

export default App;
