import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { JustOneGameConfiguration } from "../models/JustOneGameConfiguration.ts";
import { useDispatch, useSelector } from "react-redux";
import { initRound } from "../store/justOneRound.slice.ts";
import { RoundDisplay } from "../components/justOne/RoundDisplay.tsx";
import { endGame, initGame, isGameEnded } from "../store/justOneGame.slice.ts";
import { RoundControl } from "../components/justOne/RoundControl.tsx";
import { JustOneResult } from "../components/justOne/JustOneResult.tsx";
import { Countdown } from "../components/justOne/Countdown.tsx";
import { EndGameScreen } from "../components/justOne/EndGameScreen.tsx";

export const Route = createLazyFileRoute("/justone/$gameId")({
  component: JustOneStartGame,
});

export function JustOneStartGame() {
  const { gameId } = Route.useParams();
  const gameEnded = useSelector(isGameEnded);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/games/${gameId}/justone/configure`,
    )
      .then((response) => response.json() as Promise<JustOneGameConfiguration>)
      .then((data) => {
        if (!data.isEnded) {
          dispatch(initRound(data.roundSecondsDuration));
          dispatch(
            initGame({
              roundDuration: data.roundSecondsDuration,
              totalRounds: data.nbRounds,
              gameCode: data.gameCode,
              currentRound: data.currentRound,
            }),
          );
        } else {
          dispatch(endGame());
        }
      });
  }, []);

  return (
    <div className={"flex flex-col items-center flex-1 my-8 w-[80%] m-auto"}>
      {gameEnded && <EndGameScreen />}
      {!gameEnded && (
        <>
          <div className={"flex flex-col items-center flew-1 gap-8"}>
            <RoundDisplay />
            <Countdown />
          </div>
          <JustOneResult gameId={gameId} />
          <RoundControl></RoundControl>
        </>
      )}
    </div>
  );
}
