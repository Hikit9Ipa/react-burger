import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from "../../services/reducers/ingredients.js";

import {
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from "../../services/reducers/order.js";

const url = "https://norma.nomoreparties.space/api/";
const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
export const getIngredients = () => {
  return fetch(`${url}ingredients`).then(checkReponse);
};
export const orderPost = (ingredientsIds) => {
  //console.log(ingredientsIds);
  return fetch(`${url}orders`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ ingredients: ingredientsIds }),
  }).then(checkReponse);
};

export function getIngredientsDisp() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    //console.log("GET_INGREDIENTS_REQUEST");
    getIngredients()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data,
          });
          //console.log("GET_INGREDIENTS_SUCCESS");
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED,
          });
          //console.log("GET_INGREDIENTS_FAILED");
        }
      })
      .catch(() => dispatch({ type: GET_INGREDIENTS_FAILED }));
  };
}
export function getOrderDisp(Order) {
  return function (dispatch) {
    //console.log("GET_ORDER_REQUEST");
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    orderPost(Order)
      .then((res) => {
        if (res && res.success) {
          //console.log("GET_ORDER_SUCCESS");
          dispatch({
            type: GET_ORDER_SUCCESS,
            order: res,
          });
        } else {
          //console.log("GET_ORDER_FAILED");
          dispatch({
            type: GET_ORDER_FAILED,
          });
        }
      })
      .catch(() => dispatch({ type: GET_ORDER_FAILED }));
  };
}
