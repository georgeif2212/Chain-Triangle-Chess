import React from "react";
import styles from "../styles/components/CustomButton.module.css";

const CustomButton = ({
  text,
  variant = "primary",
  onClick,
  type = "button",
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default CustomButton;
