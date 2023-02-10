import React, { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./ingredients.module.css";

import { MainPage } from "../Main/main";
import Modal from "../../components/Modal/Modal";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";

export function IngredientsPage() {
  const location = useLocation();
  const { id } = useParams();
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const currIngredient = useMemo(
    () => ingredients.find((ingredient) => ingredient._id === id),
    [ingredients]
  );

  if (currIngredient) {
    return (
      <section className={styles.root}>
        <img src={currIngredient.image_large} alt={currIngredient.name} />
        <h4 className="text_type_main-medium mb-8 mt-4">
          {currIngredient.name}
        </h4>
        <div className={`${styles.nutrVal}`}>
          <div className={`${styles.nutrValItem} mr-5`}>
            <span className="text_type_main-default mb-2">Калории,ккал</span>
            <span className="text_type_digits-default">
              {currIngredient.calories}
            </span>
          </div>
          <div className={`${styles.nutrValItem} mr-5`}>
            <span className="text_type_main-default mb-2">Белки, г</span>
            <span className="text_type_digits-default">
              {currIngredient.proteins}
            </span>
          </div>
          <div className={`${styles.nutrValItem} mr-5`}>
            <span className="text_type_main-default mb-2">Жиры, г</span>
            <span className="text_type_digits-default">
              {currIngredient.fat}
            </span>
          </div>
          <div className={`${styles.nutrValItem}`}>
            <span className="text_type_main-default mb-2">Углеводы, г</span>
            <span className="text_type_digits-default">
              {currIngredient.carbohydrates}
            </span>
          </div>
        </div>
      </section>
    );
    }
  
 }
