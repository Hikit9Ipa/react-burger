import React from "react";
import styles from "./profile.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink,useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
 import { sendLogoutRequest,sendRefreshUserInfoRequest } from "../../utils/Api/AuthApi";
 export function ProfilePage () {
  const dispatch = useDispatch();
  const {user} = useSelector((store) => store.auth);
  const { auth } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  useEffect(() => {
    setFormData({ ...user, password: '' });
    
  }, []);
  const [buttonsShow, setButtonsShow] = useState(false);

  const hadleChangeFormData = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setButtonsShow(true);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFormData({ ...user, name: '', email: '', password: '' });
    setButtonsShow(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(sendLogoutRequest ());
    navigate("/login")
  };

  const handleUserUpdate = (e) => {
    e.preventDefault();
    dispatch(sendRefreshUserInfoRequest(formData));
    setButtonsShow(false);
  };
 
  
  
  return (
    <section className={`${styles.container} pl-5 pt-20`}>
      <div className={ `${styles.menu} mr-15` }>
        <nav className={styles.nav}>
          
          <NavLink to='/profile' className={({isActive})=> isActive ? `${styles.link_Active} text text_type_main-medium `: `text_color_inactive`} >
            Профиль
          </NavLink>
          <NavLink to='/profile/orders' className={({isActive})=> isActive ? `${styles.link_Active} text text_type_main-medium `: `${styles.link} text text_type_main-medium text_color_inactive`} >
          История заказов
          </NavLink>
          
          <button type="button" className={ `${styles.link} text text_type_main-medium text_color_inactive` } onClick={ handleLogout }>
            Выход
          </button>
        </nav>
        <p className={`${styles.description} text text_type_main-default text_color_inactive`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form className={`${styles.form} pt-20`} onSubmit={ handleUserUpdate }>
      <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={hadleChangeFormData}
            value={formData.name}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={hadleChangeFormData}
            value={formData.email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={hadleChangeFormData}
            value={formData.password}
            name={'password'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
        { buttonsShow && (
        <div className={styles.buttons}>
          <Button type="secondary" htmlType="button" size="medium" onClick={handleReset}>
            Отменить
          </Button>
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </div>
        )}
      </form>
    </section>
  )
};