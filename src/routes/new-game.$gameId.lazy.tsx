import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { usePlayers } from "../hooks/usePlayers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSendMessage } from "../hooks/useSendMessage.ts";
import { Invite } from "../components/shared/Invite.tsx";

export const Route = createLazyFileRoute("/new-game/$gameId")({
  component: NewGame,
});

function NewGame() {
  const { gameId } = Route.useParams();
  const players = usePlayers();
  const navigate = useNavigate();

  const sendStartGame = useSendMessage("start-game");
  const sendRoundTransition = useSendMessage("justone-round-transition");
  const TRANSITION_DURATION = 35;

  const createNewGame = () => {
    sendRoundTransition({ transitionDuration: TRANSITION_DURATION });

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch(`${import.meta.env.VITE_BACKEND_URL}/games/start`, {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify({
        gameCode: gameId,
      }),
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

    setTimeout(() => {
      sendStartGame({
        gameCode: gameId,
      });
      navigate({ to: "/justone/$gameId", params: { gameId } });
    }, TRANSITION_DURATION * 1000);
  };

  return (
    <main className={"flex flex-col flex-1 p-4 gap-4 bg-base-200"}>
      <div className={"flex justify-between"}>
        <button
          className={"btn btn-primary"}
          onClick={() => navigate({ to: "/" })}
        >
          <FontAwesomeIcon
            icon={["fas", "arrow-left"]}
            className={"text-primary-content"}
          ></FontAwesomeIcon>
        </button>
        <button className={"btn btn-primary"} onClick={createNewGame}>
          Commencer la partie
        </button>
      </div>

      <section className={"flex h-full gap-4"}>
        <Invite />
        <div
          id={"current-players"}
          className={"col-start-2 row-span-2 row-start-1 flex-[.6] "}
        >
          <table className={"table table-lg "}>
            <thead>
              <tr>
                <th className={"text-3xl"}>Nom des joueurs</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={index}>
                  <td className={"text-3xl font-semibold"}>{player}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
