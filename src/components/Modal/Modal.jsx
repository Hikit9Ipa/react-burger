import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay.jsx";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function Modal({header, children, onClick}) {
  
  const modals = document.getElementById("react-modals");

  return ReactDOM.createPortal (
    <>
      <ModalOverlay onClick={onClick}/>
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
