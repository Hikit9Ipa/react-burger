import React from "react";
import styles from './Ingredients.module.css';
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../utils/types";
import { useSelector } from "react-redux";
import { useMemo,forwardRef } from "react";

import Ingredient from "../Ingredient/Ingredient";
const Ingredients = forwardRef(({ openModal, title, ingredients },ref)=>{
//(({({ openModal, title, ingredients }) {
  
  return (
    <li ref={ref}>
      <h2 className="text text_type_main-medium pt-10">{title}</h2>
      <ul  className={`${styles.list} mt-6 mr-2 ml-4`}>
        {ingredients.map(element => (
          <Ingredient  element={element} 
           key={element._id} openModal={openModal}> </Ingredient>
        ))}
      </ul>
    </li>
  );
}
)
Ingredients.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(ingredientPropTypes),
  openModal: PropTypes.func,
};
export default Ingredients;
