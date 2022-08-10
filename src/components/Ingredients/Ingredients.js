import React from "react";
import styles from "./Ingredients.module.css";
//import IngredientItem from "../IngredientItem/IngredientItem.js";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";


function Ingredients({ title, data }) {
  return (
    <section>
      <h2 className="text text_type_main-medium pt-10">{title}</h2>
      <ul className={`${styles.list} mt-6 mr-2 ml-4`}>
        {data.map((item) => (
          <li key={item._id} className={styles.item}>
            <img
              className={`pr-4 pl-4 pb-1`}
              src={item.image}
              alt={item.name}
            ></img>
            <Counter count={1} size="default" />
            <div className={`${styles.price} pb-1`}>
              <p className="text text_type_digits-default pr-2">{item.price}</p>
              <CurrencyIcon type="primary" />
            </div>
            <p className={`${styles.caption} text text_type_main-default pt-1`}>
              {item.name}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Ingredients;
