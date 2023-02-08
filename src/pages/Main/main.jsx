import styles from "./main.module.css";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { useEffect } from "react";

import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import Modal from "../../components/Modal/Modal";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
export function MainPage({ openIngredientModaln, openOrderModal }) {
  return (
    <main className={styles.main}>
      <BurgerIngredients openIngredientModaln={openIngredientModaln} />
      <BurgerConstructor openOrderModal={openOrderModal} />
    </main>
  );
}
MainPage.propTypes = {
  openOrderModal: PropTypes.func.isRequired,
  openIngredientModaln: PropTypes.func.isRequired
 };