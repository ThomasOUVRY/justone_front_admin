import { Route } from "../../routes/new-game.$gameId.lazy.tsx";
import QRCode from "react-qr-code";

export function Invite() {
  const { gameId } = Route.useParams();

  return (
    <div
      id={"qr-code-game-id"}
      className={
        "card glass p-4 gap-4 flex-col justify-around items-center flex-[.4]"
      }
    >
      <QRCode size={300} value={import.meta.env.VITE_PLAYER_URL + gameId} />

      <div
        className={
          "flex flex-col align-center bg-primary-content border-primary border-2 p-8 rounded-3xl"
        }
      >
        <p className={"text-3xl"}>Code de la partie</p>
        <p className={"text-9xl"}>{gameId}</p>
      </div>
    </div>
  );
}
