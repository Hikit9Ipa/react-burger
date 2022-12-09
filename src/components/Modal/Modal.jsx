import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay.jsx";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import { useEffect } from "react";
import { CLOSE_INGREDIENT,CLOSE_ORDER } from "../../services/reducers/visibleModals";
function Modal({header, children}) {

  
  const modals = document.getElementById("react-modals");
  const dispatch = useDispatch();
  
  const closeModal = () => {
    dispatch({ type: CLOSE_INGREDIENT });
    dispatch({ type: CLOSE_ORDER });
  };

  useEffect(() => {
    const closeEsc = (e) => {
      e.key === "Escape" && closeModal();
    };
    window.addEventListener("keydown", closeEsc);
  }, []);

  return ReactDOM.createPortal (
    <>
      <ModalOverlay onClick={closeModal}/>
        <div className={`${styles.root} pt-10 pr-10 pb-15 pl-10`}>
          <div className={styles.header}>
            {<h2 className="text_type_main-large">{header}</h2>}
            <button className={styles.closeButton} onClick={onClick}>
              <CloseIcon type="primary" />
            </button>
          </div>
          {children}
        </div>
      
    </>,
    modals
  );
};

Modal.propTypes = {
  header: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
export default Modal;
