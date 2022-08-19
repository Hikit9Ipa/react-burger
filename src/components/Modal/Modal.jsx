import React from "react";
import styles from "./Modal.module.css";
import ModalOverlay from '../ModalOverlay/ModalOverlay.jsx';
import {
  CloseIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

function Modal(props) {
  return (
    <ModalOverlay>
        <div className={`${styles.root} pt-10 pr-10 pb-15 pl-10`}>
          <div className={styles.header}>
            { <h2 className="text_type_main-large">{props.header}</h2> }
            <button className={styles.closeButton} onClick={props.onClick}>
              <CloseIcon type="primary" />
            </button>
          </div>
            {props.children}
        </div>
    </ModalOverlay>
  );
}
Modal.propTypes = { 
  header:PropTypes.string,
  onClick:PropTypes.func
};
export default Modal;
