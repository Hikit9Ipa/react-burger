import styles from "./main.module.css";
import PropTypes from 'prop-types';
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";

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