import React from "react";
//import data1 from '../../utils/data.js';
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader.jsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.jsx";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.jsx";
import Modal from "../Modal/Modal.jsx";
//import OrderDetails from "../OrderDetails/OrderDetails.jsx";
import IngredientDetails from "../IngredientDetails/IngredientDetails.jsx";
import { BurgerIngredContext } from "../Contexts/Contexts.jsx";
import { getIngredients } from "../../utils/Api/Api.js";

function App() {
  const [state, setState] = React.useState([]);
  const [ingredientVisible, setIngredientVisible] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState({});

  const getIngredientsData = async()=>{
    const response = await getIngredients();
    setState(response.data );
  }
  React.useEffect(() => {
  getIngredientsData();
  }, []);

  React.useEffect(() => {
    const closeEsc = (e) => {
      if (e.key === "Escape") {
       if (ingredientVisible) {
          setIngredientVisible(false);
        }
      }
    };
    window.addEventListener("keydown", closeEsc);

    return () => window.removeEventListener("keydown", closeEsc);
  }, [ingredientVisible]);

  const closeIngredientModal = () => {
    setIngredientVisible(false);
  };

  const openIngredientModal = (item) => {
    setCurrentIngredient({ ...item });
    setIngredientVisible(true);
  };
  return (
    <BurgerIngredContext.Provider value={{ state, setState }}>
      <div>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients
            ingredients={state}
            openModal={openIngredientModal}
          />
          <BurgerConstructor/>
          {ingredientVisible && (
            <Modal onClick={closeIngredientModal} header={"Детали ингредиента"}>
              <IngredientDetails currentIngredient={currentIngredient} />
            </Modal>
          )}
        </main>
      </div>c
    </BurgerIngredContext.Provider>
  );
}

export default App;
