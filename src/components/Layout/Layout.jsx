import React from "react";
import { aux as Aux } from "../../hoc/Aux";
import styles from "./Layout.module.css";

const layout = props => {
  return (
    <Aux>
      <div> Toolbar, SideBar, Backdrop</div>
      <main className={styles.Content}>{props.children}</main>
    </Aux>
  );
};

export default layout;
