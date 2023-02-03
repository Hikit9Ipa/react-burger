import React, { useState, useRef } from "react";
import styles from "./BurgerIngredients.module.css";
import Ingredients from "../Ingredients/Ingredients.jsx";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
//import { ingredientPropTypes } from "../../utils/types";
import { useSelector } from "react-redux";

function BurgerIngredients({ openIngredientModaln }) {
  const [tab, setTab] = useState("bun");
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const items = [
    {
      name: "bun",
      title: "Булки",
      ref: bunRef,
    },
    {
      name: "sauce",
      title: "Соусы",
      ref: sauceRef,
    },
    {
      name: "main",
      title: "Начинки",
      ref: mainRef,
    },
  ];
  const handleTab = (tab) => {
    setTab(tab);
    tab === "bun"
      ? bunRef.current.scrollIntoView({ behavior: "smooth" })
      : tab === "sauce"
      ? sauceRef.current.scrollIntoView({ behavior: "smooth" })
      : tab === "main"
      ? mainRef.current.scrollIntoView({ behavior: "smooth" })
      : bunRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleScroll = (e) => {
    const container = e.target.getBoundingClientRect().top;
    const bun = bunRef.current.getBoundingClientRect().top;
    const sauce = sauceRef.current.getBoundingClientRect().top;
    const main = mainRef.current.getBoundingClientRect().top;
    const offset = [
      { name: "Булки", value: Math.abs(container - bun) },
      { name: "Соусы", value: Math.abs(container - sauce) },
      { name: "Начинки", value: Math.abs(container - main) },
    ];
    const closest = offset.sort((a, b) => a.value - b.value)[0].name;
    if (tab !== closest) {
      setTab(closest);
    }
  };

  const ingredients = useSelector((state) => state.ingredients.ingredients);
  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>

      <div style={{ display: "flex" }}>
        <Tab
          value={items[0].name}
          key={items[0].name}
          active={tab === items[0].title}
          onClick={handleTab}
        >
          {items[0].title}
        </Tab>
        <Tab
          value={items[1].name}
          key={items[1].name}
          active={tab === items[1].title}
          onClick={handleTab}
        >
          {items[1].title}
        </Tab>
        <Tab
          value={items[2].name}
          key={items[2].name}
          active={tab === items[2].title}
          onClick={handleTab}
        >
          {items[2].title}
        </Tab>
      </div>
      <ul className={styles.ingredients} onScroll={handleScroll}>
        {items.map((item) => (
          <Ingredients
            type={item.name}
            key={item.name}
            title={item.title}
            ingredients={ingredients.filter((el) => el.type === item.name)}
            openModal={openIngredientModaln}
            ref={item.ref}
          ></Ingredients>
        ))}
      </ul>
    </section>
  );
}
BurgerIngredients.propTypes = {
  openIngredientModaln: PropTypes.func.isRequired,
};
export default BurgerIngredients;
