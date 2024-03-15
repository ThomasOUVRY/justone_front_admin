import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { usePlayers } from "../hooks/usePlayers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSendMessage } from "../hooks/useSendMessage.ts";
import { useReceiveMessage } from "../hooks/useReceiveMessage.ts";
import { useEffect } from "react";
import { Game } from "../models/game.ts";

export const Route = createLazyFileRoute("/new-game/$gameId")({
  component: NewGame,
});

function NewGame() {
  const { gameId } = Route.useParams();
  const players = usePlayers(gameId);
  const navigate = useNavigate();

  const sendMessage = useSendMessage("start-game");
  const createdGameMessage = useReceiveMessage<Game>("start-game");

  useEffect(() => {
    console.log("createdGameMessage", createdGameMessage);
    if (createdGameMessage && createdGameMessage.code === gameId) {
      if (createdGameMessage.type === "JUST_ONE") {
        navigate({ to: "/justone/$gameId", params: { gameId } });
      }
    }
  }, [createdGameMessage]);

  const startGame = () => {
    sendMessage({ gameCode: gameId });
  };

  return (
    <main className={"h-full flex flex-col p-4 gap-4"}>
      <div className={"flex justify-between"}>
        <button
          className={"btn btn-primary"}
          onClick={() => navigate({ to: "/" })}
        >
          <FontAwesomeIcon
            icon={["fas", "arrow-left"]}
            color={"#000"}
          ></FontAwesomeIcon>
        </button>
        <button className={"btn btn-primary"} onClick={startGame}>
          Commencer la partie
        </button>
      </div>

      <section className={"flex h-full gap-4"}>
        <div
          id={"qr-code-game-id"}
          className={"card bg-neutral p-4 gap-4  flex-col justify-around"}
        >
          <img
            className={"qr-code w-80"}
            src={`https://qrtag.net/api/qr_transparent.svg?url=${import.meta.env.VITE_PLAYER_URL + gameId}`}
            alt={"QR Code"}
          />
          <div>
            <h1>Game ID</h1>
            <h2 className={"text-9xl"}>{gameId}</h2>
          </div>
        </div>

        <div
          id={"current-players"}
          className={"col-start-2 row-span-2 row-start-1 "}
        >
          <table className={"table table-lg"}>
            <thead>
              <tr>
                <th>Nom des joueurs</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.name}>
                  <td className={"text-xl"}>{player.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
