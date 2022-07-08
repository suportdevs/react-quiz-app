import classes from "../styles/Button.module.css";

export default function Button({ className, children, ...rest }) {
  return (
    <button className={`${className} ${classes.button}`} {...rest}>
      {children}
    </button>
  );
}
