import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthServiceProvider";
import useQuestions from "../../hook/useQuestions";
import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import PrograssBar from "../PrograssBar";

const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.questionId].options[action.optionIndex].checked =
        action.value;
      return questions;
    default:
      return state;
  }
};

export default function Quiz() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { questions, error, loading } = useQuestions(id);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [qna, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions]);

  function handleAnswerChange(e, index) {
    dispatch({
      type: "answer",
      questionId: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  }
  // handle when user clicks next to get next question
  function hanldeNextQuestion() {
    if (currentQuestion < questions.length) {
      setCurrentQuestion((prevCurrent) => prevCurrent + 1);
    }
  }
  // handle when user clicks previous to get next question
  function hanldePreviousQuestion() {
    if (currentQuestion >= 1 && currentQuestion <= questions.length) {
      setCurrentQuestion((prevCurrent) => prevCurrent - 1);
    }
  }
  //calculate percentage of prograss
  const percentage =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  // submit quiz
  async function submit() {
    const { uid } = currentUser;

    const db = getDatabase();
    const resutlRef = ref(db, "results/" + uid);

    await set(resutlRef, {
      [id]: qna,
    });

    navigate(`/result/${id}`, { state: { qna } });
  }

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>Something went wrong</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            input={true}
            options={qna[currentQuestion].options}
            handleChange={handleAnswerChange}
          />
          <PrograssBar
            next={hanldeNextQuestion}
            previous={hanldePreviousQuestion}
            submit={submit}
            prograss={percentage}
          />
          <MiniPlayer youtubeId={id} title={qna[currentQuestion].title} />
        </>
      )}
    </>
  );
}
