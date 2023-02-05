import styles from "./profileorders.module.css";
import { useDispatch,useSelector } from 'react-redux';
import { NavLink, useNavigate,useMatch } from 'react-router-dom';
import { sendLogoutRequest } from "../../utils/Api/AuthApi";
import { useEffect } from "react";

import { wsUserConnectionStart,wsUserConnectionClosed } from "../../services/actions/wsActions";
import FeedItem from "../../components/Feeditem/feedItem";
export function ProfileOrdersPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(wsUserConnectionStart());
        return () => {
          dispatch(wsUserConnectionClosed());
        };
      }, []);
  
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(sendLogoutRequest ());
        navigate("/login")
      };
    
  const routeMatch = useMatch({ path: '/profile/orders' });
  const userOrders = useSelector((store) => store.wsReducer.userMessages.orders);
  const currentOrders = [...userOrders].reverse();
  return(
  
  <section className={`${styles.section} pl-5 pt-20`}>
  <div className={ `${styles.menu} mr-15` }>
    <nav className={styles.nav}>
      <NavLink to='/profile' className={({isActive})=> isActive ? `${styles.link_Active} text text_type_main-medium `: `text_color_inactive`} >
        Профиль
      </NavLink>
      <NavLink to='/profile/orders' className={({isActive})=> isActive ? `${styles.link_Active} text text_type_main-medium `: `${styles.link} text text_type_main-medium text_color_inactive`} >
      История заказов
      </NavLink>
      <button type="button" className={ `${styles.link} text text_type_main-medium text_color_inactive` } onClick={ handleLogout }>
        Выход
      </button>
    </nav>
    <p className={`${styles.description} text text_type_main-default text_color_inactive`}>
      В этом разделе вы можете изменить свои персональные данные
    </p>
  </div>
  <div className={ styles.history }>
  <ul className={styles.list}>
        { currentOrders && currentOrders.map((item) => (
          <FeedItem
          key={ item._id }
          number={ item.number }
          name={ item.name }
          status={ item.status }
          createdAt={ item.createdAt }
          components={ item.ingredients }
          isUserOrders={ routeMatch }
          />
        ))}
      </ul>
     </div>
</section>
)
}
export default ProfileOrdersPage;
