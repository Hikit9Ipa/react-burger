import React from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { sendLoginRequest } from "../../utils/Api/AuthApi";
export function LoginPage() {
 
  const { auth } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const hadleChangeFormData = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(sendLoginRequest({ ...formData }));
  };
  if (auth) {
   
    return <Navigate to="-1"></Navigate>;
  }
  return (
    <section className={styles.container}>
      <h1 className={`${styles.title} text_type_main-medium mb-6`}>Вход</h1>
      <form id="login-form" className={`${styles.form}`} onSubmit={handleLogin}>
        <Input
          type={"email"}
          placeholder={"E-mail"}
          onChange={hadleChangeFormData}
          value={formData.email}
          name={"email"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Input
          type={"password"}
          placeholder={"Пароль"}
          onChange={hadleChangeFormData}
          value={formData.password}
          name={"password"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Button type="primary" size="medium" htmlType="submit">
          Войти
        </Button>
      </form>
      <p className="mt-20 text text_color_inactive text_type_main-small">
        Вы — новый пользователь?
        <Link className={"ml-4 " + styles.link} to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p className="mt-4 text text_color_inactive text_type_main-small">
        Забыли пароль?
        <Link className={"ml-4 " + styles.link} to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </section>
  );
}
