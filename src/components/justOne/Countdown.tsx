/*
    This component is responsible for displaying the countdown
    and the round ended message.

    On the end of the round, the component should display the hint given by the player (stored in the store).
 */
import { useDispatch, useSelector } from "react-redux";
import {
  getJustOneRound,
  updateRemainingDuration,
} from "../../store/justOneRound.slice.ts";
import { CSSProperties, useEffect } from "react";
import { useSendMessage } from "../../hooks/useSendMessage.ts";
import { isGameEnded } from "../../store/justOneGame.slice.ts";

export const Countdown = () => {
  const { roundRemainingDuration: secondsRemaining, roundIsEnded } =
    useSelector(getJustOneRound);
  const gameEnded = useSelector(isGameEnded);
  const sendRoundTiming = useSendMessage("justone-round-time");
  const dispatch = useDispatch();

  useEffect(() => {
    if (gameEnded) {
      return;
    }
    if (!roundIsEnded) {
      const interval = setInterval(() => {
        dispatch(updateRemainingDuration(secondsRemaining - 1));
      }, 1000);

      const wsInterval = setInterval(() => {
        sendRoundTiming({
          secondsRemaining,
        });
      }, 200);
      return () => {
        clearInterval(wsInterval);
        clearInterval(interval);
      };
    } else {
      sendRoundTiming({ secondsRemaining: 0 });
    }
  }, [secondsRemaining]);

  return (
    <label className={"swap"}>
      <input type="checkbox" checked={roundIsEnded} />
      <div className={`flex gap-2 swap-off`}>
        <span className="countdown text-5xl text-primary">
          <span style={{ "--value": secondsRemaining } as CSSProperties}></span>
        </span>
        <span className="text-5xl">secondes restantes !</span>
      </div>
      <div className={`text-5xl swap-on text-center`}>Fin de la manche !</div>
    </label>
  );
};
