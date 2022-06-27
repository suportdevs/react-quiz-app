import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import PrograssBar from "../PrograssBar";

export default function Quiz() {
  return (
    <>
      <h1>Pick three of your favorite Star Wars Flims</h1>
      <h4>Question can have multiple answers</h4>
      <Answers />
      <PrograssBar />
      <MiniPlayer />
    </>
  );
}
