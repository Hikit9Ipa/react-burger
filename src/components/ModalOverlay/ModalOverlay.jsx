import React from "react";
import styles from "./ModalOverlay.module.css";
import PropTypes from 'prop-types';
function ModalOverlay({closeModal}) {
 
  
    return (
          <div className={styles.root} onClick={closeModal}> 
          </div>
        )
};
ModalOverlay.propTypes = { 
  closeModal:PropTypes.func.isRequired
};
export default ModalOverlay;
