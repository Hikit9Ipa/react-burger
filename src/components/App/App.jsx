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
import { ADD_CURRENT_INGREDIENT } from "../../services/reducers/currentIngredient";
function App() {
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

  // const closeModal = () => {
  //   dispatch({ type: CLOSE_INGREDIENT });
  //   dispatch({ type: CLOSE_ORDER });
  // };

  // useEffect(() => {
  //   const closeEsc = (e) => {
  //     e.key === "Escape" && closeModal();
  //   };
  //   window.addEventListener("keydown", closeEsc);
  // }, []);

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
    <div>
      <AppHeader />
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients openModal={openIngredientModaln} />
          <BurgerConstructor openOrder={openOrderModal} />
        </DndProvider>

        {ingredientVisiblen && (
          <Modal header={"Детали ингредиента"}>
            <IngredientDetails currentIngredient={currentIngredientn} />
          </Modal>
        )}
      </main>
    </div>
  );
}

export default App;
