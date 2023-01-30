import React from "react";
import styles from "./register.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendRegisterRequest } from "../../utils/Api/AuthApi";
import { useNavigate } from "react-router-dom";
export function RegisterPage() {
  const { auth } = useSelector((store)=>store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    
  });
  const handleChangeFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleReg = (e) => {
    e.preventDefault();
    dispatch(sendRegisterRequest(formData));
  }
  // if(auth){//redirect to mainpage
  //   navigate("/");
  // }

  return (
    <section className={styles.container}>
      <h1 className={`${styles.title} text_type_main-medium mb-6`}>
        Регистрация
      </h1>
      <form
        id="register-form"
        className={styles.form}
        onSubmit={handleReg}
      >
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChangeFormData}
          value={formData.name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Input
          type={"email"}
          placeholder={"E-mail"}
          onChange={handleChangeFormData}
          value={formData.email}
          name={"email"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Input
          type={"password"}
          placeholder={"Пароль"}
          onChange={handleChangeFormData}
          value={formData.password}
          name={"password"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Button type="primary" size="medium">
          Зарегистироваться
        </Button>
      </form>
      <p className="mt-20 text text_color_inactive text_type_main-small">
        Вы уже зарегистрированы?
        <Link className={"ml-4 " + styles.link} to="/login">
          Войти
        </Link>
      </p>
    </section>
  );
}
