import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import Button from "../components/Button.tsx";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
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

  return (
    <section className={"flex-col flex flex-1 justify-center "}>
      <div className={"bg-primary-content p-10 m-auto rounded-3xl"}>
        <Button onClick={createNewGame}>Créer une partie</Button>
      </div>
    </section>
  );
}
