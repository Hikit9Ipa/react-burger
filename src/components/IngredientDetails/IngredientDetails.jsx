import React from "react";
import ReactDOM from "react-dom";
import styles from "./IngredientDetails.module.css";
import PropTypes from 'prop-types';
import {ingredientPropTypes} from '../../utils/types';
function IngredientDetails(props) {

    return (
      <section className={styles.root}>
        <img src={props.currentIngredient.image_large} alt={props.currentIngredient.name} />
        <h4 className="text_type_main-medium mb-8 mt-4">{props.currentIngredient.name}</h4>
        <div className={`${styles.nutrVal}`}>
          <div className={`${styles.nutrValItem } mr-5`}>
            <span className="text_type_main-default mb-2">Калории,ккал</span>
            <span className="text_type_digits-default">{props.currentIngredient.calories}</span>
          </div>
          <div className={`${styles.nutrValItem } mr-5`}>
            <span className="text_type_main-default mb-2">Белки, г</span>
            <span className="text_type_digits-default">{props.currentIngredient.proteins}</span>
          </div>
          <div className={`${styles.nutrValItem } mr-5`}>
            <span className="text_type_main-default mb-2">Жиры, г</span>
            <span className="text_type_digits-default">{props.currentIngredient.fat}</span>
          </div>
          <div className={`${styles.nutrValItem }`}>
            <span className="text_type_main-default mb-2">Углеводы, г</span>
            <span className="text_type_digits-default">{props.currentIngredient.carbohydrates}</span>
          </div>
        </div>
      </section>
    )
  };
  IngredientDetails.propTypes = { 
    ingredientDetails: PropTypes.arrayOf(ingredientPropTypes)
  };
  
  

export default IngredientDetails;
