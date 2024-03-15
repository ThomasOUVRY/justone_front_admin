import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createLazyFileRoute("/justone/$gameId")({
  component: JustOneStartGame,
});

export function JustOneStartGame() {
  const { gameId } = Route.useParams();

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/games/${gameId}/justone/configure`,
    )
      .then((response) => response.json() as Promise<unknown>)
      .then((data) => {
        console.log("data", data);
      });
  }, []);

  return <h1>JustOneStartGame</h1>;
}
