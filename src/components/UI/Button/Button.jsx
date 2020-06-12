import React from "react";
import styles from "./Button.module.css";

const button = props => (
  <button
  //className is an array so we will join it to make sure we gonna have two strings which are exactly the two classes we want to apply to the button;
    className={[styles.Button, styles[props.btnType]].join(" ")}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;
