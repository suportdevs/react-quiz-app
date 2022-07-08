import _ from "lodash";
import { useLocation, useParams } from "react-router-dom";
import useAnswers from "../../hook/useAnswers";
import Analysis from "../Analysis";
import Summary from "../Summary";

export default function Result() {
  const { id } = useParams();
  const { state } = useLocation();
  const { qna } = state;
  const { answers, error, loading } = useAnswers(id);

  // calculate score for summary
  function scoreCalculate() {
    let score = 0;
    answers.forEach((question, index1) => {
      let correctIndexs = [],
        checkedIndexs = [];

      question.options.forEach((option, index2) => {
        if (option.correct) correctIndexs.push(index2);
        if (qna[index1].options[index2].checked) {
          checkedIndexs.push(index2);
          option.checked = true;
        }
      });
      if (_.isEqual(correctIndexs, checkedIndexs)) {
        score = score + 5;
      }
    });

    return score;
  }
  const score = scoreCalculate();
  return (
    <>
      <Summary score={score} noq={answers.length} />
      <Analysis answers={answers} />
    </>
  );
}
