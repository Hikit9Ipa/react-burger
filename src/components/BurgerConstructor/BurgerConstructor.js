import React from "react";
import styles from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";


function BurgerConstructor({ ingredients ,openModal}) {
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
          {ingredients
            .filter((item) => item.type !== "bun")
            .map((item) => (
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
          600
          <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="medium" onClick={() => openModal()}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
