import {
  RESTORE_PASS_FAILED,
  RESTORE_PASS_REQUEST,
  RESTORE_PASS_SUCCESS,
  RESET_PASS_FAILED,
  RESET_PASS_REQUEST,
  RESET_PASS_SUCCESS,
  REG_USER_FAILED,
  REG_USER_REQUEST,
  REG_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGOUT_USER_FAILED,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
} from "../../services/reducers/user.js";
import { getCookie, setCookie, deleteCookie } from "../cookie/cookie.js";
import { url, checkResponse } from "./Api.js";
//Забыли пароль!
export function sendForgotPassEmail(email) {
  return function (dispatch) {
    dispatch({ type: RESTORE_PASS_REQUEST });
    fetch(`${url}password-reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then(checkResponse)
      .then((res) => console.log(res))
      .then(() => {
        dispatch({ type: RESTORE_PASS_SUCCESS });
      })
      .catch(() => dispatch({ type: RESTORE_PASS_FAILED }));
  };
}
////Смена пароля!
export function sendResetPassRequest(data) {
  return function (dispatch) {
    console.log(`${url}password-reset/reset`);
    dispatch({ type: RESET_PASS_REQUEST });
    fetch(`${url}password-reset/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(checkResponse)
      .then((res) => console.log(res))
      .then(() => {
        dispatch({ type: RESET_PASS_SUCCESS });
      })
      .catch(() => dispatch({ type: RESET_PASS_FAILED }));
  };
}

//эндпоинт для регистрации пользователя!
export function sendRegisterRequest(data) {
  return function (dispatch) {
    dispatch({ type: REG_USER_REQUEST });
    fetch(`${url}auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(checkResponse)
      .then((res) => {
        if (res.success) {
          setCookie("accessToken", res.accessToken.split("Bearer ")[1], {
            expires: 1200,
          });
          setCookie("refreshToken", res.refreshToken);
          dispatch({
            type: REG_USER_SUCCESS,
            user: res.user,
          });
        }
      })
      .catch(() => dispatch({ type: REG_USER_FAILED }));
  };
}

//эндпоинт для авторизации!
export function sendLoginRequest(data) {
  return function (dispatch) {
    dispatch({ type: LOGIN_USER_REQUEST });
    fetch(`${url}auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(checkResponse)
      .then((res) => {
        if (res.success) {
          setCookie("accessToken", res.accessToken.split("Bearer ")[1], {
            expires: 1200,
          });
          setCookie("refreshToken", res.refreshToken);
          dispatch({
            type: LOGIN_USER_SUCCESS,
            user: res.user,
          });
        }
      })
      .catch(() => dispatch({ type: LOGIN_USER_FAILED }));
  };
}

//эндпоинт для обновление токена
export function sendRefreshTokenRequest() {
  return function (dispatch) {
    dispatch({ type: REFRESH_TOKEN_REQUEST });
    fetch(`${url}auth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: getCookie("refreshToken") }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res.success) {
          console.log(res);
          setCookie("token", res.accessToken, { expires: 1200 });
          setCookie("refreshToken", res.refreshToken);
          dispatch({
            type: REFRESH_TOKEN_SUCCESS,
            user: res.user,
          });
        }
      })
      .catch(() => dispatch({ type: REFRESH_TOKEN_FAILED }));
  };
}
//эндпоинт для выхода из системы
export function sendLogoutRequest() {
  return function (dispatch) {
    dispatch({ type: LOGOUT_USER_REQUEST });
    fetch(`${url}auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: getCookie("refreshToken") }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res.success) {
          console.log(res);
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          dispatch({
            type: LOGOUT_USER_SUCCESS,
            user: res.user,
          });
        }
      })
      .catch(() => dispatch({ type: LOGOUT_USER_FAILED }));
  };
}
//эндпоинт получения данных о пользователе
export function sendGetUserInfoRequest() {
  return function (dispatch) {
    dispatch({ type: GET_USER_REQUEST });
    fetch(`${url}auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + getCookie("accessToken"),
      },
    })
      .then(checkResponse)
      .then((res) => {
        if (res.success) {
          console.log(res);
          dispatch({
            type: GET_USER_SUCCESS,
            user: res.user,
          });
        }
      })
      .catch(() => {
        console.log("catch getuser");
        console.log(getCookie("refreshToken"));
        if (getCookie("refreshToken")) {
          dispatch(sendRefreshTokenRequest());
          //  dispatch({ type: GET_USER_REQUEST });
          fetch(`${url}auth/user`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + getCookie("accessToken"),
            },
          })
            // .then((res)=>{console.log(res)})
            //   .then(checkResponse)
            .then((res) => {
              // console.log("res");
              if (res.success) {
                //console.log("res2");
                dispatch({
                  type: GET_USER_SUCCESS,
                  user: res.user,
                });
                //  }
              } else {
                dispatch({ type: GET_USER_FAILED });
              }
            });
        } else {
          dispatch({ type: GET_USER_FAILED });
        }
      });
  };
}

//эндпоинт обновления данных о пользователе
export function sendRefreshUserInfoRequest(data) {
  return function (dispatch) {
    dispatch({ type: UPDATE_USER_REQUEST });
    fetch(`${url}auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res.success) {
          console.log(res);
          dispatch({
            type: UPDATE_USER_SUCCESS,
            user: res.user,
          });
        }
      })
      .catch(() => dispatch({ type: UPDATE_USER_FAILED }));
  };
}
