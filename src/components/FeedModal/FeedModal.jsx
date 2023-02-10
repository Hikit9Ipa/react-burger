
import styles from './FeedModal.module.css';
import { 
    wsConnectionStart, 
    wsUserConnectionStart, 
    wsConnectionClosed, 
    wsUserConnectionClosed 
  } from '../../services/actions/wsActions';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useMatch } from 'react-router-dom';
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { newStatus } from "../../utils/types";


export function FeedModal() {
    const dispatch = useDispatch();
    const routeMatch = useMatch({ path: "/profile/orders/:id" });
    const { id } = useParams();
    useEffect(() => {
      if (routeMatch) {
        dispatch(wsUserConnectionStart());
      } else {
        dispatch(wsConnectionStart());
      }
      return () => {
        if (routeMatch) {
          dispatch(wsUserConnectionClosed());
        } else {
          dispatch(wsConnectionClosed());
        }
      };
    },);

  
    const orders = useSelector((store) => store.wsReducer.messages.orders);
    const myOrders = useSelector((store) => store.wsReducer.userMessages.orders);
    const ingredients = useSelector((store) => store.ingredients.ingredients);
  
    const order = orders && orders.find((item) => item.number === +id);
    const myOrder = myOrders && myOrders.find((item) => item.number === +id);
    const currentOrder = routeMatch ? myOrder : order;
    const orderIngredients = useMemo(() => {
      return currentOrder ? currentOrder.ingredients : [];}, [currentOrder]);
  
      const feedIngredients = useMemo(
        () =>
          ingredients.length && orderIngredients.length
            ? Object.values(
                orderIngredients
                  .map((item) => {
                    return ingredients.find((element) => element._id === item);
                  })
                  .filter((ingredient) => ingredient !== undefined)
                  .reduce((total, current) => {
                    total[current.name] = total[current.name]
                      ? {
                          ...total[current.name],
                          count: total[current.name].count + 1,
                        }
                      : { ...current, count: 1 };
                    return total;
                  }, {})
              ).sort((ingredient) => (ingredient.type === "bun" ? -1 : 1))
            : [],
        [orderIngredients, ingredients]
      );
    
      const price = useMemo(() => {
        return feedIngredients.length
          ? feedIngredients.reduce(
              (total, current) =>
                current.count && current.type !== "bun"
                  ? total + current.price * current.count
                  : total + current.price * 2,
              0
            )
          : 0;
      }, [feedIngredients]);


  return (
    <section className={styles.section}>
      { currentOrder && (
      <>
        <h2 className={ `${styles.name} text text_type_main-medium` }>{ currentOrder.name }</h2>
        <p className={ `${styles.status} text text_type_main-default ${currentOrder.status === 'done' && styles.done} ${currentOrder.status === 'canceled' && styles.canceled}` } >
        {newStatus(currentOrder.status)}
        </p>
        <p className='text text_type_main-medium'>Состав:</p>
        <ul className={ styles.list }>
          {feedIngredients && feedIngredients
            .map((item) => (
              <li key={ item._id } className={ styles.item }>
                <div className={ styles.info }>
                  <div className={ styles.icon }>
                    <img src={ item.image } alt={ item.name }/>
                  </div>
                  <p className='text text_type_main-default'>{ item.name }</p>
                </div>
                {item.type === 'bun' 
                  ? (<p className={ `${styles.price} text text_type_digits-default` }>
                    { 2 }{ ' ' } x { ' ' }{ item.price }
                    <CurrencyIcon type="primary" />
                    </p>)
                  : (<p className={ `${styles.price} text text_type_digits-default` }>
                    { item.count }{ ' ' } x { ' ' }{ item.price }
                    <CurrencyIcon type="primary" />
                    </p>)}
              </li>
            ))}
        </ul>
        <div className={ styles.footer }>
          <p className='text text_type_main-default text_color_inactive'><FormattedDate date={new Date(currentOrder.createdAt)} /></p>
          <p className={ `${styles.price} text text_type_digits-default` }>
            { price }
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </>)}
    </section>
  );
};