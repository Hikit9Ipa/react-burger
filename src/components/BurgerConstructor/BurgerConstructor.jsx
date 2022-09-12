import React, { useContext, useEffect, useState, useReducer } from "react";
import styles from "./BurgerConstructor.module.css";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../utils/types";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIngredContext } from "../Contexts/Contexts.jsx";
import Modal from "../Modal/Modal.jsx";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";
import orderImg from "../../images/done.svg";
import { orderPost } from "../../utils/Api/Api.js";

function BurgerConstructor() {
  const ingredients = useContext(BurgerIngredContext);
  const [visible, setVisible] = useState(false);
  const [order, setOrder] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const getOrderData = async (testBurger) => {
    const response = await orderPost(testBurger);
    setOrder(response.order.number);
  };
  React.useEffect(() => {
    const closeEsc = (e) => {
      if (e.key === "Escape") {
        if (visible) {
          setVisible(false);
          console.log(visible);
        }
      }
    };
    window.addEventListener("keydown", closeEsc);

    return () => window.removeEventListener("keydown", closeEsc);
  }, [visible]);

  const ingred = ingredients.state
    .filter((item) => item.type !== "bun")
    .map((item) => item._id);
    const buns = ingredients.state
    .filter((item) => item.type === "bun")[0];
    
  const testBurger = ingredients.state
    .filter((item) => item.type !== "bun")
    .slice(0, 5);
  const init = testBurger
    .map((item) => item.price)
    .reduce((acc, number) => acc + number, 0);
  React.useEffect(() => {
    setTotalPrice(init+400);
  }, [init]);

  const burgersIds = testBurger.map((item) => item._id);

  const openOrdModal = () => {
    getOrderData(burgersIds);
    setVisible(true);
  };
  const closeOrdModal = () => {
    setVisible(false);
  };

  const dataOrder = {
    orderIdText: "идентификатор заказа",
    orderImg: orderImg,
    orderStatus: "Ваш заказ начали готовить",
    orderExpectationText: "Дождитесь готовности на орбитальной станции",
  };

  return (
    <section className={`${styles.section} pt-25 `}>
      <div className={`${styles.sectionContainer} pr-4`}>
        <div className={`${styles.item} mb-4 pl-8`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price="200"
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </div>

        <div className={`${styles.scrollitems} mb-4`}>
          {testBurger.map((item) => (
            <div className={`${styles.item} mb-4`} key={item._id}>
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          ))}
        </div>
        <div className={`${styles.item} mb-4`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price="200"
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </div>
      </div>
      <div className={`${styles.total} mt-10 pr-8`}>
        <span className={`${styles.sum} mr-10 text_type_digits-medium`}>
          {totalPrice}
          <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="medium" onClick={openOrdModal}>
          Оформить заказ
        </Button>
        {visible && (
          <Modal onClick={closeOrdModal} header={""}>
            <OrderDetails {...dataOrder} order={order} />
          </Modal>
        )}
      </div>
    </section>
  );
}
BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
