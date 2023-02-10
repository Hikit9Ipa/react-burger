import {
  BurgerIcon,
  Logo,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import styles from "./AppHeader.module.css";

function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} pt-4 pb-4`}>
        <ul className={styles.menuList}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `${styles.menuItem_active} pl-5 pr-2`
                  : `${styles.menuItem} pl-5 pr-2`
              }
            >
              <BurgerIcon type="secondary"></BurgerIcon>
              <p className="text text_type_main-default pl-2 pt-4 pb-4 pr-5">
                Конструктор
              </p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/feed"
              className={({ isActive }) =>
                isActive
                  ? `${styles.menuItem_active} pl-5`
                  : `${styles.menuItem} pl-5`
              }
            >
              <ListIcon type="secondary"></ListIcon>
              <p className="text  text_type_main-default pl-2 pt-4 pb-4 pr-5">
                Лента заказов
              </p>
            </NavLink>
          </li>
        </ul>
        <div className={styles.logo}>
          <NavLink to="/">
            <Logo />
          </NavLink>
        </div>
        <div className={styles.profile}>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? `${styles.menuItem_active}` : `${styles.menuItem}`
            }
          >
            <ProfileIcon type="secondary"></ProfileIcon>
            <p className="text text_type_main-default pl-2 pt-4 pb-4 pr-5">
              Личный кабинет
            </p>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
