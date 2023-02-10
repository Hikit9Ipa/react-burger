
import styles from "./BurgerConstructor.module.css";
import PropTypes from "prop-types";
import { useMemo } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorItem from "../ConstructorItem/ConstructorItem";
import Modal from "../Modal/Modal.jsx";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";

import { useSelector, useDispatch } from "react-redux";
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
} from "../../services/reducers/constructor";
import { CLOSE_ORDER } from "../../services/reducers/visibleModals";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

function BurgerConstructor({ openOrderModal} ) {
  const dispatch = useDispatch();
  const constructorIngredients = useSelector(
    (state) => state.constructorReducer.constructorIngredients
  );
  const burgerBun = constructorIngredients.filter(
    (item) => item.type === "bun"
  );
  const burgerBunIds = useMemo(() => {
    return  constructorIngredients
    .filter((item) => item.type === "bun")
    .map((item) => item._id)}, [constructorIngredients]);
  const orderIds = useMemo(() => {
    return   [
    ...constructorIngredients.map((item) => item._id),
    burgerBunIds,
  ]}, [constructorIngredients,burgerBunIds]);
  const ordVisible = useSelector((state) => state.visible.orderVisible);
  const totalPricen = useMemo(() => {
    return  constructorIngredients.reduce((acc, { price }) => {
    return acc + parseInt(price);
  }, 0)}, [constructorIngredients]);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      if (item.type === "bun") {
        dispatch({ type: DELETE_INGREDIENT, id: "bun" });
        dispatch({
          type: ADD_INGREDIENT,
          draggedIngredient: { ...item, key: "bun" },
        });
      } else {
        dispatch({
          type: ADD_INGREDIENT,
          draggedIngredient: { ...item, key: uuidv4() },
        });
       
      }
    },
  });
 
  const closeModal = () => {
    dispatch({ type: CLOSE_ORDER });
  };
  return (
    <section className={`${styles.section} pt-25 `} ref={dropTarget}>
      <div className={`${styles.sectionContainer} pr-4`}>
        <div className={`${styles.item} mb-4 pl-8`}>
          {burgerBun.length > 0 && (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={burgerBun[0].name+" (верх)"}
              price={burgerBun[0].price}
              thumbnail={burgerBun[0].image}
            />
          )}
        </div>

        <div className={`${styles.scrollitems} mb-4`}>
          {constructorIngredients.map(
            (item, index) =>
              item.type !== "bun" && (
                <ConstructorItem item={item} key={item.key} index={index} />
              )
          )}
        </div>
        <div className={`${styles.item} mb-4`}>
          {burgerBun.length > 0 && (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={burgerBun[0].name+" (низ)"}
              price={burgerBun[0].price}
              thumbnail={burgerBun[0].image}
            />
          )}
        </div>
      </div>
      <div className={`${styles.total} mt-10 pr-8`}>
        <span className={`${styles.sum} mr-10 text_type_digits-medium`}>
          {totalPricen}
          <CurrencyIcon type="primary" />
        </span>
        <Button
          type="primary"
          size="medium"
          htmlType="button"
          onClick={() => {if(orderIds.length>1){openOrderModal(orderIds);}}}
        >
          Оформить заказ
        </Button >
        {ordVisible && (
          <Modal closeModal={closeModal} header={""}>
            <OrderDetails/>
          </Modal>
        )}
      </div>
    </section>
  );
}
BurgerConstructor.propTypes = {
  openOrderModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
