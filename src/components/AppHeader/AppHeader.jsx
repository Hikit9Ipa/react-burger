import {
  BurgerIcon,
  Logo,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import React from "react";
import styles from "./AppHeader.module.css";

function AppHeader() {
  const activeStyle = {
    textDecoration: "none",
    color:"red"
  };
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} pt-4 pb-4`}>
        <ul className={styles.menuList}>
          <li>
            <NavLink to='/' className={`${styles.menuItem} pl-5 pr-2`}>
              <BurgerIcon type="primary"></BurgerIcon>
              <p className="text text_type_main-default pl-2 pt-4 pb-4 pr-5">
                Конструктор
              </p>
            </NavLink>
          </li>
          <li>
            <NavLink to='/404' className={`${styles.menuItem} pl-5`}>
              <ListIcon type="secondary"></ListIcon>
              <p className="text text_color_inactive text_type_main-default pl-2 pt-4 pb-4 pr-5">
                Лента заказов
              </p>
            </NavLink>
          </li>
        </ul>
        <div className={styles.logo}>
          <NavLink to='/404'>
            <Logo />
          </NavLink>
        </div>
        <div className={styles.profile}>
          <NavLink to='/profile' className={styles.menuItem}>
            <ProfileIcon type="secondary"></ProfileIcon>
            <p className="text text_color_inactive text_type_main-default pl-2 pt-4 pb-4 pr-5">
              Личный кабинет
            </p>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
