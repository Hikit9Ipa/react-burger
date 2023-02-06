import { getCookie, setCookie } from "../cookie/cookie.js";
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
//s
export const url = "https://norma.nomoreparties.space/api/";
export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = () => {
  return fetch(`${url}ingredients`).then(checkResponse);
};
export const orderPost = (ingredientsIds) => {
  return fetch(`${url}orders`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
    authorization: "Bearer " + getCookie("accessToken")},
    body: JSON.stringify({ ingredients: ingredientsIds }),
  }).then(checkResponse);
};

export function getIngredientsDisp() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    getIngredients()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data,
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED,
          });
        }
      })
      .catch(() => dispatch({ type: GET_INGREDIENTS_FAILED }));
  };
}
export function getOrderDisp(Order) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    orderPost(Order)
      .then((res) => {
        console.log(res)
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            order: res,
          });
        } else {
          dispatch({
            type: GET_ORDER_FAILED,
          });
        }
      })
      .catch(() => dispatch({ type: GET_ORDER_FAILED }));
  };
}
