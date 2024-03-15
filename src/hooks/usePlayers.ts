import useWebSocket from "react-use-websocket";
import { useEffect, useState } from "react";
import { Player } from "../models/player.ts";
import { WebsocketMessage } from "../models/websocketMessage.ts";

export const usePlayers = (gameId: string) => {
  const { lastJsonMessage } = useWebSocket<WebsocketMessage>(
    "ws://localhost:8080",
  );

  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (
      lastJsonMessage &&
      ["join-game", "leave-game"].includes(lastJsonMessage.topic)
    ) {
      const player = JSON.parse(lastJsonMessage.message) as Player;
      if (lastJsonMessage.topic === "join-game") {
        if (!players.find((p) => p.name === player.name)) {
          setPlayers([...players, player]);
        }
      } else if (lastJsonMessage.topic === "leave-game") {
        setPlayers([...players.filter((p) => p.name !== player.name)]);
      }
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    fetch(`http://localhost:3000/games/${gameId}/connectedPlayers`)
      .then((res) => res.json())
      .then((data) => setPlayers([...data]));
  }, [gameId]);

  return players;
};
