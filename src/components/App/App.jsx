import React, { useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader.jsx";
import styles from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredientsDisp, getOrderDisp } from "../../utils/Api/Api.js";
import Modal from "../Modal/Modal.jsx";
import IngredientDetails from "../IngredientDetails/IngredientDetails.jsx";
import {
  OPEN_ORDER,
  OPEN_INGREDIENT,
  CLOSE_INGREDIENT,CLOSE_ORDER 
} from "../../services/reducers/visibleModals";
import { Routes, Route, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  MainPage,
  Page404,
  LoginPage,
  ForgotPasswordPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  IngredientsPage,
  FeedPage,
  ProfileOrdersPage,
} from "../../pages";
import FeedDetails from "../FeedDetails/feeddeteils";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { sendGetUserInfoRequest } from "../../utils/Api/AuthApi.js";
import { ADD_CURRENT_INGREDIENT } from "../../services/reducers/currentIngredient";
import { getCookie } from "../../utils/cookie/cookie";
import { FeedModal } from "../FeedModal/FeedModal.jsx";



function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { auth } = useSelector((store) => store.auth);
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getIngredientsDisp());
  }, [dispatch]);

  useEffect(() => {
    if (!auth && getCookie("refreshToken")) {
      dispatch(sendGetUserInfoRequest());
    }
  }, []);
  const ingredientVisiblen = useSelector(
    (state) => state.visible.ingredientVisible
  );
  const orderNum = useSelector((state) => state.order.order.number);
  const orderS = useSelector((state) => state.order.orderRequest);

  const openIngredientModaln = (item) => {
    dispatch({ type: ADD_CURRENT_INGREDIENT, item });
    dispatch({ type: OPEN_INGREDIENT });
    
  };

  const openOrderModal = (orderData) => {
    if (auth) {dispatch(getOrderDisp(orderData));}else(navigate("/login"))

  
    
  };

  const modals = document.getElementById("react-modals");
  const closeModal = () => {
    dispatch({ type: CLOSE_INGREDIENT });
    dispatch({ type: CLOSE_ORDER });
    navigate(-1);
  };


  const currentIngredientn = useSelector(
    (state) => state.currentIngredient.currentIngredient
  );
  useEffect(() => {
    if (orderNum !== null) dispatch({ type: OPEN_ORDER });
  }, [orderNum, orderS]);
  const background = location.state?.background;
  return (
    <div className={styles.main}>
    <DndProvider backend={HTML5Backend}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={ <MainPage openIngredientModaln={openIngredientModaln} openOrderModal={openOrderModal} /> } />
        <Route path="/ingredients/:id" element={<IngredientsPage></IngredientsPage>} />
        <Route path="/404" element={<Page404 />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/login" element={ <ProtectedRoute onlyUnAuth> <LoginPage /> </ProtectedRoute> }/>
        <Route path="/register" element={<ProtectedRoute onlyUnAuth> <RegisterPage /> </ProtectedRoute>}/>
        <Route path="/profile" element={ <ProtectedRoute onlyUnAuth={false}><ProfilePage /></ProtectedRoute>}/>
        <Route path="/forgot-password"  element={ <ProtectedRoute onlyUnAuth={true}> <ForgotPasswordPage /></ProtectedRoute>}/>
        <Route path="/reset-password" element={ <ProtectedRoute onlyUnAuth={true}> <ResetPasswordPage /> </ProtectedRoute>}/>
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:id" element={<FeedDetails />} />
        <Route path="/profile/orders" element={<ProtectedRoute onlyUnAuth={false}> <ProfileOrdersPage /> </ProtectedRoute>}/>
        <Route path="/profile/orders/:id" element={ <ProtectedRoute onlyUnAuth={false}> <FeedDetails /> </ProtectedRoute>}/>
        <Route path="/profile/orders" element={<ProfileOrdersPage />}/>
        <Route path="/profile/orders/:id" element={<FeedDetails />}/>
      
      </Routes> 
      {background && ( <Routes>
        <Route path="/ingredients/:id" element={<Modal header ={'Детали ингредиента'} closeModal={closeModal}><IngredientDetails currentIngredient={currentIngredientn}></IngredientDetails></Modal>}></Route>
        <Route path="/feed/:id" element={<Modal closeModal={closeModal}><FeedModal/></Modal>}></Route>
        <Route path="/profile/orders/:id" element={<Modal closeModal={closeModal}><FeedModal/></Modal>}></Route>
        {/* <Route path="/ingredients/:id" element={<Modal><IngredientDetails currentIngredient={currentIngredientn}></IngredientDetails></Modal>}></Route> */}
        </Routes>)}
    </DndProvider>
    </div>
  );
}

export default App;
