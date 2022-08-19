import React from "react";
//import data1 from '../../utils/data.js';
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader.js";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.js";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.js";
import Modal from "../Modal/Modal.jsx";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";
import IngredientDetails from "../IngredientDetails/IngredientDetails.jsx";

import orderImg from "../../images/done.svg";
function App() {
  const [state, setState] = React.useState([]);
  const [ordVisible, setOrdVisible] = React.useState(false);
  const [ingredientVisible, setIngredientVisible] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState({});
  const url = "https://norma.nomoreparties.space/api/ingredients";

  React.useEffect(() => {
    const getProductData = async () => {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setState(data.data);
        console.log(data.data);
      } else {
        return Promise.reject(`Ошибка ${res.status}`);
      }
    };

    getProductData();
  }, []);

  const closeOrdModal = () => {
    console.log("close");
    setOrdVisible(false);
  };

  const openOrdModal = () => {
    console.log("open");
    setOrdVisible(true);
  };
  const closeIngredientModal = () => {
    console.log("close ing");
    setIngredientVisible(false);
  };

  const openIngredientModal = (item) => {
    setCurrentIngredient({ ...item });
    console.log("open ingr");
    setIngredientVisible(true);
  };
  const dataOrder = {
    orderNumber: "034536",
    orderIdText: "идентификатор заказа",
    orderImg: orderImg,
    orderStatus: "Ваш заказ начали готовить",
    orderExpectationText: "Дождитесь готовности на орбитальной станции",
  };
  return (
    <div>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients
          ingredients={state}
          openModal={openIngredientModal}
        />
        <BurgerConstructor ingredients={state} openModal={openOrdModal} />
        {ordVisible && (
          <Modal onClick={closeOrdModal} header="">
            <OrderDetails {...dataOrder} />
          </Modal>
        )}
        {ingredientVisible && (
          <Modal onClick={closeIngredientModal} header="Детали ингредиента">
            <IngredientDetails currentIngredient={currentIngredient} />
          </Modal>
        )}
      </main>
    </div>
  );
}

export default App;
