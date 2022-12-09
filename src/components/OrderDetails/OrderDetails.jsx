//import React from "react";
//import ReactDOM from "react-dom";
import styles from "./OrderDetails.module.css";
import PropTypes from "prop-types";
import { orderTypes } from "../../utils/types.js";
// import {
//   ConstructorElement,
//   DragIcon,
//   CurrencyIcon,
//   Button,
// } from "@ya.praktikum/react-developer-burger-ui-components";

function OrderDetails(props) {
  return (
    <section className={`${styles.root}`}>
      <span className={`${styles.text_sh}`}>
        <p className={`${styles.root1} text_type_digits-large mt-4 mb-8`}>
          {props.order}
        </p>
      </span>
      <p className={`${styles.orderIdText} text_type_main-medium mb-15`}>
        {props.orderIdText}
      </p>
      <img src={props.orderImg} className={`mb-15`}></img>
      <p className={`text_type_main-default mt-15 mb-2`}>{props.orderStatus}</p>
      <p className={`text_type_main-default  mt-2`}>
        {props.orderExpectationText}
      </p>
    </section>
  );
}
OrderDetails.propTypes = {
  props: orderTypes.isRequired,
};
export default OrderDetails;
