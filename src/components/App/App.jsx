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
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import {
  MainPage,
  Page404,
  LoginPage,
  ForgotPasswordPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,IngredientsPage
} from "../../pages";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { sendGetUserInfoRequest } from "../../utils/Api/AuthApi.js";
import { ADD_CURRENT_INGREDIENT } from "../../services/reducers/currentIngredient";
function App() {
  const { auth } = useSelector((store) => store.auth);
  
  const dispatch = useDispatch();
  const currentIngredientn = useSelector(
    (state) => state.currentIngredient.currentIngredient
  );
  const ingredientVisiblen = useSelector(
    (state) => state.visible.ingredientVisible
  );
  const orderNum = useSelector((state) => state.order.order.number);
  const orderS = useSelector((state) => state.order.orderRequest);

  useEffect(() => {
    dispatch(getIngredientsDisp());
  }, [dispatch]);

 
  useEffect(() => {
    dispatch(sendGetUserInfoRequest());
  }, []);

  const openIngredientModaln = (item) => {
    dispatch({ type: ADD_CURRENT_INGREDIENT, item });
    dispatch({ type: OPEN_INGREDIENT });
  };

  const openOrderModal = (orderData) => {
    dispatch(getOrderDisp(orderData));
  };

  useEffect(() => {
    if (orderNum !== null) dispatch({ type: OPEN_ORDER });
  }, [orderNum, orderS]);

  return (
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <div>
          <AppHeader />
          <Routes>
             <Route path="/" exact={true} element={<MainPage openIngredientModaln={openIngredientModaln} openOrderModal={openOrderModal}/>}/> 
            <Route path="/ingredients/:id" exact={true} element={<IngredientsPage openIngredientModaln={openIngredientModaln} openOrderModal={openOrderModal}/>} /> 
            <Route path="/404" exact={true} element={<Page404 />} />
            <Route path="*" exact={true} element={<Page404 />} />
            <Route path="/login" exact={true} element={<ProtectedRoute><LoginPage /></ProtectedRoute>} />
            <Route path="/register" exact={true} element={<ProtectedRoute><RegisterPage /></ProtectedRoute>} />
            <Route path="/forgot-password" exact={true} element={<ProtectedRoute><ForgotPasswordPage /></ProtectedRoute>} />
            <Route path="/reset-password" exact={true} element={<ProtectedRoute><ResetPasswordPage /></ProtectedRoute>} />
            <Route path="/profile" exact={true} element={<ProfilePage />} />
            {/* <Route path="/ingredients" exact={true} element={<MainPage openIngredientModaln={openIngredientModaln} openOrderModal={openOrderModal}/>} />  */}
            </Routes>
          {/* <main className={styles.main}>
          <BurgerIngredients openModal={openIngredientModaln} />
          <BurgerConstructor openOrder={openOrderModal} />
          </main> */}
          {/* {ingredientVisiblen && (
            <Route path="/ingredients/:id" element={
            <Modal header={"Детали ингредиента"}>
            <IngredientDetails currentIngredient={currentIngredientn} />
          </Modal>}>
            
            </Route>
          )} */}
        </div>
      </DndProvider>
    </BrowserRouter>
  );
}

export default App;
