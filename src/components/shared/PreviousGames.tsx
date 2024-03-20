import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Game } from "../../models/game.ts";

export function PreviousGames() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/games")
      .then((response) => response.json())
      .then((data: Game[]) => setGames(data));
  }, []);

  const deleteGame = (gameCode: string): void => {
    fetch(`http://localhost:3000/games/${gameCode}`, {
      method: "DELETE",
    })
      .then((response) => response.text())
      .then(() => setGames(games.filter((game) => game.code !== gameCode)));
  };

  return (
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
  );
}
