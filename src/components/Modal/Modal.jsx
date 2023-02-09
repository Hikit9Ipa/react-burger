
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay.jsx";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function Modal({header, children, closeModal}) {
  
  const modals = document.getElementById("react-modals");
  

  return ReactDOM.createPortal (
    <>
      <ModalOverlay closeModal={closeModal}/>
        <div className={`${styles.root} pt-10 pr-10 pb-15 pl-10`}>
          <div className={styles.header}>
            <h2 className="text_type_main-large">{header}</h2>
            <button className={styles.closeButton} onClick={closeModal}>
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
  children: PropTypes.node.isRequired,
};
export default Modal;
