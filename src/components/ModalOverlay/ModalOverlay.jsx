import React from "react";
import ReactDOM from 'react-dom';
import styles from "./ModalOverlay.module.css";


import PropTypes from 'prop-types';
function ModalOverlay(props) {
    const modalRoot = document.getElementById("react-modals");

    return ReactDOM.createPortal(
        (
          <div className={styles.root}>
              {props.children} 
          </div>
        ), 
        modalRoot
    );
}
ModalOverlay.propTypes = { 
  children:PropTypes.node,
};
export default ModalOverlay;
