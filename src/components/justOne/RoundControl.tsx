import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  addDuration,
  initRound,
  isRoundEnded,
} from "../../store/justOneRound.slice.ts";
import {
  getGame,
  isGameEnded,
  nextRound,
} from "../../store/justOneGame.slice.ts";
import { useSendMessage } from "../../hooks/useSendMessage.ts";

export function RoundControl() {
  const { gameCode, roundDuration } = useSelector(getGame);
  const roundIsEnded = useSelector(isRoundEnded);
  const gameEnded = useSelector(isGameEnded);
  const sendNextRound = useSendMessage("justone-next-round");
  const sendRoundTransition = useSendMessage("justone-round-transition");
  const dispatch = useDispatch();

  const TRANSITION_DURATION = 5;

  const goToNextRound = () => {
    sendRoundTransition({ transitionDuration: TRANSITION_DURATION });
    setTimeout(() => {
      sendNextRound({ gameCode });
      dispatch(nextRound());
      dispatch(initRound(roundDuration));
    }, TRANSITION_DURATION * 1000);
  };

  const addTime = () => dispatch(addDuration(30));

  return (
    <div className="flex self-end gap-2">
      <button
        type={"button"}
        className={"btn btn-primary"}
        onClick={addTime}
        disabled={roundIsEnded}
      >
        Ajouter du temps
        <FontAwesomeIcon
          icon={"clock"}
          color={"text-primary-content"}
        ></FontAwesomeIcon>
      </button>

      <button
        disabled={!roundIsEnded || gameEnded}
        type={"button"}
        className={`btn btn-primary ${roundIsEnded ? "" : "btn-disabled"}`}
        onClick={goToNextRound}
      >
        Prochaine manche
        <FontAwesomeIcon
          icon={"arrow-right"}
          color={"text-primary-content"}
        ></FontAwesomeIcon>
      </button>
    </div>
  );
}
