import classes from "../styles/Video.module.css";

export default function Video({ title, noq, id }) {
  return (
    <div className={classes.video}>
      <img src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt="" />
      <p>{title}</p>
      <div className={classes.qmeta}>
        <p>{noq} Questions</p>
        <p>Score : {10 * noq}</p>
      </div>
    </div>
  );
}
