import { useRef, useState } from "react";
import classes from "../styles/PrograssBar.module.css";
import Button from "./Button";

export default function PrograssBar({ next, previous, submit, prograss }) {
  const tooltipRef = useRef();
  const [tooltip, setTooltip] = useState(false);

  function toggleToolTip() {
    if (tooltip) {
      setTooltip(false);
      tooltipRef.current.style.display = "none";
    } else {
      setTooltip(true);
      tooltipRef.current.style.left = `calc(${prograss}% - 65px)`;
      tooltipRef.current.style.display = "block";
    }
  }
  return (
    <div className={classes.progressBar}>
      <div className={classes.backButton}>
        <span className="material-icons-outlined" onClick={previous}>
          {" "}
          arrow_back{" "}
        </span>
      </div>
      <div className={classes.rangeArea}>
        <div className={classes.tooltip} ref={tooltipRef}>
          {prograss}% Complete!
        </div>
        <div className={classes.rangeBody}>
          <div
            className={classes.progress}
            style={{ width: `${prograss}%` }}
            onMouseOver={toggleToolTip}
            onMouseOut={toggleToolTip}
          ></div>
        </div>
      </div>
      <Button
        className={classes.next}
        onClick={prograss === 100 ? submit : next}
      >
        <span>{prograss === 100 ? "Submit Quiz" : "Next Question"}</span>
        <span className="material-icons-outlined"> arrow_forward </span>
      </Button>
    </div>
  );
}
