import classes from "../styles/Button.module.css";

export default function Button({ text }) {
  return (
    <div className={classes.button}>
      <span>{text}</span>
    </div>
  );
}
