import React from "react";
import styles from "./Ingredients.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { types } from "../../utils/types";

function Ingredients({ title, data, openModal }) {
  return (
    <section>
      <h2 className="text text_type_main-medium pt-10">{title}</h2>
      <ul className={`${styles.list} mt-6 mr-2 ml-4`}>
        {data.map((item) => (
          <li
            key={item._id}
            className={styles.item}
            onClick={() => openModal(item)}
          >
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
Ingredients.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(types).isRequired,
  openModal: PropTypes.func.isRequired,
};
export default Ingredients;
