import React from "react";
import styles from "./ModalOverlay.module.css";
import PropTypes from 'prop-types';

function ModalOverlay({onClick}) {

    return (
          <div className={styles.root} onClick={onClick}> 
          </div>
        )
};
ModalOverlay.propTypes = { 
  onClick:PropTypes.func.isRequired
};
export default ModalOverlay;
