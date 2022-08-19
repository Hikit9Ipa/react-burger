import React from "react";
import styles from "./BurgerIngredients.module.css";
import Ingredients from "../Ingredients/Ingredients.js";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

function BurgerIngredients({ ingredients,openModal }) {
  const items = [
    {
      name: "bun",
      title: "Булки",
    },
    {
      name: "sauce",
      title: "Соусы",
    },
    {
      name: "main",
      title: "Начинки",
    },
  ];

  const [current, setCurrent] = React.useState("bun");
  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>

      <div style={{ display: "flex" }}>
        <Tab
          value="bun"
          key="bun"
          active={current === "bun"}
          onClick={setCurrent}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          key="sauce"
          active={current === "sauce"}
          onClick={setCurrent}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          key="main"
          active={current === "main"}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.ingredients}>
        {items.map((item) => (
          <Ingredients
            type={item.name}
            key={item.name}
            title={item.title}
            data={ingredients.filter((el) => el.type === item.name)}
            openModal={openModal}
          ></Ingredients>
        ))}
      </div>
    </section>
  );
}
BurgerIngredients.propTypes = { 
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number
  })),
  openModal:PropTypes.func
};
export default BurgerIngredients;