import styles from "./OrderDetails.module.css";
import { useSelector } from "react-redux";
import orderImg from "../../images/done.svg";
function OrderDetails() {
  const orderNum = useSelector((state) => state.order.order.order.number);
  return (
    <section className={`${styles.root}`}>
      <span className={`${styles.text_sh}`}>
        <p className={`${styles.root1} text_type_digits-large mt-4 mb-8`}>
        {orderNum}
        </p>
      </span>
      <p className={`${styles.orderIdText} text_type_main-medium mb-15`}>
      идентификатор заказа
      </p>
      <img src={orderImg} className={`mb-15`}></img>
      <p className={`text_type_main-default mt-15 mb-2`}>Ваш заказ начали готовить</p>
      <p className={`text_type_main-default  mt-2`}>
      Дождитесь готовности на орбитальной станции
      </p>
    </section>
  );
}

export default OrderDetails;
