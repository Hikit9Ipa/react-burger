import styles from "./ConstructorItem.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import {
  DELETE_INGREDIENT,
  moveIngredients,
} from "../../services/reducers/constructor";
import PropTypes from "prop-types";

const ConstructorItem = React.memo((props) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "constructorIngredient",
    hover: (item, monitor) => {
      if (item.index === props.index || !ref.current) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (
        (item.index < props.index && hoverClientY < hoverMiddleY) ||
        (item.index > props.index && hoverClientY > hoverMiddleY)
      )
        return;
      dispatch(moveIngredients(item.index, props.index));
      item.index = props.index;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "constructorIngredient",
    item: () => {
      return { id: props.item.key, index: props.index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      className={`${styles.item} ${isDragging && styles.isDragging} mb-4`}
      ref={ref}
      draggable={true}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={props.item.name}
        price={props.item.price}
        thumbnail={props.item.image}
        handleClose={() => dispatch({type: DELETE_INGREDIENT,id: props.item.key,})}
      />
    </div>
  );
});

ConstructorItem.propTypes = {
  image: PropTypes.string,
  index: PropTypes.number.isRequired,
};

export default ConstructorItem;
