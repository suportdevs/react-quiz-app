import classes from "../styles/Button.module.css";

export default function Button({ className, children }) {
  return <div className={`${className} ${classes.button}`}>{children}</div>;
}
