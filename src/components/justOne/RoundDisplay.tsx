import { getGame, isGameEnded } from "../../store/justOneGame.slice.ts";
import { useSelector } from "react-redux";

export function RoundDisplay() {
  const { totalRounds, currentRound } = useSelector(getGame);
  const gameEnded = useSelector(isGameEnded);

  return (
    <>
      {!gameEnded && (
        <div className="flex justify-center items-center gap-2">
          <p className="text-5xl font-bold">{currentRound}</p>
          <p className="text-4xl font-bold">/ {totalRounds}</p>
        </div>
      )}
      {gameEnded && (
        <div className="flex justify-center items-center">
          <p className="text-3xl font-bold">Fin de la partie !</p>
        </div>
      )}
    </>
  );
}
