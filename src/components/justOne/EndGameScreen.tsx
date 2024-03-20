import Button from "../Button.tsx";
import { useNavigate } from "@tanstack/react-router";

export function EndGameScreen() {
  const navigate = useNavigate();

  return (
    <div
      className={
        "bg-primary-content p-10 m-auto rounded-3xl flex flex-col gap-4"
      }
    >
      <h1 className={"text-5xl"}>La partie est terminée</h1>
      <Button classname={"w-full"} onClick={() => navigate({ to: "/" })}>
        Retour à l'accueil
      </Button>
    </div>
  );
}
