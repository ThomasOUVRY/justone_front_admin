import { useSelector } from "react-redux";
import { isRoundEnded } from "../../store/justOneRound.slice.ts";
import { useEffect, useState } from "react";
import { getCurrentRound } from "../../store/justOneGame.slice.ts";

type JustOneResultProps = { gameId: string };

export function JustOneResult({ gameId }: JustOneResultProps) {
  const roundEnded = useSelector(isRoundEnded);
  const currentRound = useSelector(getCurrentRound);
  const [result, setResult] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!roundEnded) {
      setResult([]);
      return;
    }

    setLoading(true);
    // wait 1 seocond before fetching the result to let the server process the hint
    setTimeout(() => {
      fetch(
        `${import.meta.env.VITE_BACKEND_URL}/games/${gameId}/justone/hint/unique?round=${currentRound}`,
      )
        .then((response) => response.json() as Promise<string[]>)
        .then((data) => {
          setResult(data);
          setLoading(false);
        });
    }, 1000);
  }, [roundEnded]);

  return (
    <div className={"flex-1 w-full py-8 my-28"}>
      {roundEnded && (
        <div
          className={
            "flex flex-col flex-1  h-full w-full card bg-primary-content p-4"
          }
        >
          <h2 className={"text-3xl font-bold"}>Indices</h2>
          <div
            className={"flex flex-col gap-2 self-center justify-self-center"}
          >
            {loading && (
              <div className={"flex "}>
                <span className="loading loading-ball loading-lg"></span>
                <span className="loading loading-ball loading-lg"></span>
                <span className="loading loading-ball loading-lg"></span>
                <span className="loading loading-ball loading-lg"></span>
              </div>
            )}
          </div>
          <ul>
            {!loading &&
              result.map((word, index) => (
                <li className={"text-3xl"} key={index}>
                  {word}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
