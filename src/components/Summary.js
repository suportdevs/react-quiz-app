import successImage from "../assets/images/success.png";
import useFetch from "../hook/useFetch";
import classes from "../styles/Summary.module.css";

export default function Summary({ score, noq }) {
  const getKeyWord = () => {
    if ((score / (noq * 5)) * 100 < 50) {
      return "failed";
    } else if ((score / (noq * 5)) * 100 < 80) {
      return "good";
    } else if ((score / (noq * 5)) * 100 < 100) {
      return "very good";
    } else {
      return "excellent";
    }
  };
  const apiKey = process.env.REACT_APP_PEXELS_API_KEY;
  console.log(apiKey);
  const { result, error, loading } = useFetch(
    `https://api.pexels.com/v1/search?query=${getKeyWord()}`,
    "GET",
    {
      Authorization: "563492ad6f917000010000018bdbc2e11b6442bdb3b36f494e961af7",
    }
  );
  const image = result ? result?.photos[0].src.medium : successImage;
  return (
    <div className={classes.summary}>
      <div className={classes.point}>
        {/* <!-- progress bar will be placed here --> */}
        <p className={classes.score}>
          Your score is <br />
          {score} out of {noq * 5}
        </p>
      </div>
      {loading && <div className={classes.badge}>Loading... </div>}
      {error && <div className={classes.badge}>An error occured!</div>}
      {!loading && !error && (
        <div className={classes.badge}>
          <img src={image} alt="Success" />
        </div>
      )}
    </div>
  );
}
