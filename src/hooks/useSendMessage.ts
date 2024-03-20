import useWebSocket from "react-use-websocket";
import { WebSocketTopic } from "../models/WebSocketTopic";
import { MessageMap } from "../models/WebsocketMessage.ts";

export const useSendMessage = <T extends WebSocketTopic>(
  topic: T,
): ((message: MessageMap[T]) => void) => {
  const { sendMessage } = useWebSocket(import.meta.env.VITE_WS_URL);

  return (message: MessageMap[T]): void => {
    sendMessage(
      JSON.stringify({
        topic,
        message,
      }),
    );
  };
};
