import React from "react";
import styles from "./reset-password.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link,useNavigate } from "react-router-dom";
import { useState,useEffect } from 'react';
import { useDispatch,useSelector } from "react-redux";
import { sendResetPassRequest} from "../../utils/Api/AuthApi";
import { useLocation } from "react-router-dom";
export function ResetPasswordPage() {
  const { auth } = useSelector((store)=>store.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if(location.state!=="FPass"){
     
      navigate("/forgot-password");
    }
  }, []);
  const [formData, setFormData] = useState({
    password: "",
    token: "",
  });
  const handleChangeFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleResetPass = (e) => {
    e.preventDefault();
    dispatch(sendResetPassRequest(formData));
    navigate("/login");
  }
  return (
    <section className={styles.container}>
      <h1 className={`${styles.title} text_type_main-medium mb-6`}>
        Восстановление пароля
      </h1>
      <form
        id="reset-password-form"
        className={`${styles.form}`}
        onSubmit={handleResetPass}
      >
        <Input
          type={"password"}
          placeholder={"Введите новый пароль"}
          onChange={handleChangeFormData}
          value={formData.password}
          name={"password"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={handleChangeFormData}
          value={formData.token}
          name={"token"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Button type="primary" size="medium" htmlType="button">
          Сохранить
        </Button>
      </form>
      <p className="mt-20 text text_color_inactive text_type_main-small">
        Вспомнили пароль?
        <Link className={`${styles.link} ml-4`} to="/login">
          Войти
        </Link>
      </p>
    </section>
  );
}
