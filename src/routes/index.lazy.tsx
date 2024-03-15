import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import Button from "../components/Button.tsx";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

type Game = {
  code: string;
  type: string;
  nbPlayers: number;
  status: string;
};

function Index() {
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/games")
      .then((response) => response.json())
      .then((data: Game[]) => setGames(data));
  }, []);

  const createNewGame = () => {
    // post request to create a new game, return will be the plain text code, not json
    fetch("http://localhost:3000/games", {
      method: "POST",
    })
      .then((response) => response.text())
      .then((gameId) =>
        navigate({
          to: "/new-game/$gameId",
          params: {
            gameId,
          },
        }),
      );
  };

  const deleteGame = (gameCode: string): void => {
    fetch(`http://localhost:3000/games/${gameCode}`, {
      method: "DELETE",
    })
      .then((response) => response.text())
      .then(() => setGames(games.filter((game) => game.code !== gameCode)));
  };

  return (
    <div className="p-2">
      <Button onClick={createNewGame}>Créer une partie</Button>
      <h1 className="text-2xl">Hello World</h1>

      <div className="overflow-x-auto">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Players</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => (
                <tr key={game.code}>
                  <td>{game.code}</td>
                  <td>{game.type}</td>
                  <td>{game.nbPlayers}</td>
                  <td>{game.status}</td>
                  <td>
                    <FontAwesomeIcon
                      onClick={() => deleteGame(game.code)}
                      icon="trash"
                      color={"primary"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
