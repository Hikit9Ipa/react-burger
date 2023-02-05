import styles from "./feedItem.module.css";
import { useMemo } from "react";
import { useSelector }from "react-redux";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
  function FeedItem({ number, name, status, createdAt, components, isUserOrders }) {
    const ingredients = useSelector((store) => store.ingredients.ingredients);
    const orderIngredients = useMemo(() =>
    components.length && ingredients.length ? Object.values(components
      .map((item) => {
        return ingredients.find((element) => element._id === item)
      })
      .filter((item) => item !== undefined)
      .reduce((total, current) => {
        total[current.name] = total[current.name]
        ? { ...total[current.name],
            count: total[current.name].count += 1
          }
        : { ...current, count: 1 };
            return total;
      }, {}))
      .sort((item) => (item.type === "bun" ? -1 : 1))
    : [], [components, ingredients]
  );
  const feedIngredients = orderIngredients.reverse();
  
  const price = useMemo(() => {
    return feedIngredients.length ? feedIngredients.reduce((total, current) => 
      (current.count && current.type !== 'bun' ? total + current.price * current.count : total + current.price * 2), 0) : 0;
  }, [feedIngredients]);

  const feedIngredientsToShow = feedIngredients.length > 6
    ? feedIngredients.slice(0, 6)
    : feedIngredients;

  const feedIngredientsToHide = feedIngredients.length > 6
    ? feedIngredients.length - 6
    : 0;

  return (
      <NavLink to = {`${number}`} className={ styles.card }>
    <p className='text text_type_digits-default'>#{ number }</p>
    <p className={ `${styles.date} text text_type_main-default text_color_inactive` }>{ createdAt }</p>
    <p className={ `${styles.name} text text_type_main-medium` }>{ name }</p>
    { isUserOrders && <p className={ `${styles.status} text text_type_main-default ${status === 'done' && styles.done} ${status === 'canceled' && styles.canceled}` }>
      { status}
    </p> }
    <div className={ styles.icons }>
      { feedIngredientsToShow.map((item, index) => (
        <div key={ item._id }>
          <img src={ item.image } alt={ item.name }/>
          { index === 0 && feedIngredientsToHide > 0 && 
          (<span className={ `${styles.count} text text_type_digits-default` }>+{ feedIngredientsToHide }</span>)}
        </div>
      ))}
    </div>
    <p className={ `${styles.price} text text_type_digits-default` }>
      {price}
      <CurrencyIcon type="primary" />
    </p>
    </NavLink>
  );
}
export default FeedItem;