import React from "react";
import styles from "./forgot-password.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendForgotPassEmail } from "../../utils/Api/AuthApi";
export function ForgotPasswordPage() {
  const { auth } = useSelector((store) => store.auth);
  const { resetPassRequest } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const handleChangeEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const handleSendEmail = (e) => {
    e.preventDefault();
    dispatch(sendForgotPassEmail(email));
    navigate("/reset-password" ,{state:"FPass"});
  };
  // if (auth) {
  //   navigate("/");
  // }

  return (
    <section className={styles.container}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <form
        id="forgot-password-form"
        className={styles.form}
        onSubmit={handleSendEmail}
      >
        <div className="mt-6">
          <Input
            type={"email"}
            placeholder="Укажите e-mail"
            onChange={handleChangeEmail}
            value={email}
            name={"email"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className="mt-6">
          <Button type="primary" size="medium">
            Восстановить
          </Button>
        </div>
      </form>
      <p className="mt-20 text text_color_inactive text_type_main-small">
        Вспомнили пароль?
        <Link className={"ml-4 " + styles.link} to="/login">
          Войти
        </Link>
      </p>
    </section>
  );
}
