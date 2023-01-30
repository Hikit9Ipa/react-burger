import styles from "./Ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../utils/types";
import { useMemo } from "react";
import { useDrag } from "react-dnd";
import { NavLink,useLocation } from 'react-router-dom';
function Ingredient({ element, openModal }) {
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: element,
  });
  const constructorIngredients = useSelector((store) => store.constructorReducer.constructorIngredients);
  let activeStyle = {
    textDecoration: "none",
  };
  let inactiveStyle = {
    textDecoration: "none",
  };
  const counter = useMemo(() => {
    return (
      constructorIngredients.filter((item) => item._id === element._id).length
    );
  }, [constructorIngredients]);
  const location = useLocation();
  return (
    <NavLink
    style={({ isActive }) =>
    isActive ? activeStyle : inactiveStyle
  }
    key={ element._id }
    to={{
      pathname: `/ingredients/${element._id }`

    }}
    state={"ingredient"}
    >
    <li
      onClick={() => openModal(element)}
      className={styles.item}
      ref={dragRef}
      draggable={true}
    >
      <img
        className={`pr-4 pl-4 pb-1`}
        src={element.image}
        alt={element.name}
      ></img>
      <Counter count={counter} size="default" />
      <div className={`${styles.price} pb-1`}>
        <p className="text text_type_digits-default pr-2">{element.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.caption} text text_type_main-default pt-1`}>
        {element.name}
      </p>
    </li>
    </NavLink>
  );
}
export default Ingredient;
