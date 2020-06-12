import React from "react";
import styles from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  //array of objects
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => (
  <div className={styles.BuildControls}>
    <p>
      To pay: <strong>{props.totalPrice.toFixed(2)}</strong>
    </p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button
      className={styles.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
    >
      GO AHEAD WITH YOUR ORDER
    </button>
  </div>
);

export default buildControls;
