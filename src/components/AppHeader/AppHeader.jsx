import {
  BurgerIcon,
  Logo,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./AppHeader.module.css";

function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} pt-4 pb-4`}>
        <ul className={styles.menuList}>
          <li>
            <a className={`${styles.menuItem} pl-5 pr-2`}>
              <BurgerIcon type="primary"></BurgerIcon>
              <p className="text text_type_main-default pl-2 pt-4 pb-4 pr-5">
                Конструктор
              </p>
            </a>
          </li>
          <li>
            <a className={`${styles.menuItem} pl-5`}>
              <ListIcon type="secondary"></ListIcon>
              <p className="text text_color_inactive text_type_main-default pl-2 pt-4 pb-4 pr-5">
                Лента заказов
              </p>
            </a>
          </li>
        </ul>
        <div className={styles.logo}>
          <a>
            <Logo />
          </a>
        </div>
        <div className={styles.profile}>
          <a className={styles.menuItem}>
            <ProfileIcon type="secondary"></ProfileIcon>
            <p className="text text_color_inactive text_type_main-default pl-2 pt-4 pb-4 pr-5">
              Личный кабинет
            </p>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
