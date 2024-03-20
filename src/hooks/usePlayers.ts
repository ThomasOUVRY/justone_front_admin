import { useEffect, useState } from "react";
import { useReceiveMessage } from "./useReceiveMessage.ts";
import { ConnectedPlayerResponse } from "../models/ConnectedPlayerResponse.ts";
import { Route } from "../routes/new-game.$gameId.lazy.tsx";

export const usePlayers = () => {
  const { gameId } = Route.useParams();
  const joinMessage = useReceiveMessage("join-game");
  const leaveMessage = useReceiveMessage("leave-game");

  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    if (leaveMessage) {
      setPlayers([...players.filter((p) => p !== leaveMessage.name)]);
    }
  }, [leaveMessage]);

  useEffect(() => {
    if (joinMessage && joinMessage.gameCode === gameId) {
      if (!players.find((p) => p === joinMessage.name)) {
        setPlayers([...players, joinMessage.name]);
      }
    }
  }, [joinMessage]);

  useEffect(() => {
    fetch(`http://localhost:3000/games/${gameId}/connectedPlayers`)
      .then((res) => res.json() as unknown as ConnectedPlayerResponse)
      .then((data) => data.map((p) => p.name))
      .then((data) => setPlayers([...data]));
  }, [gameId]);

  return players;
};
