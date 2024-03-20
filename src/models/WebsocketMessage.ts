type JoinGameMessage = {
  name: string;
  gameCode: string;
  connected: boolean;
};
type LeaveGameMessage = {
  name: string;
  gameCode: string;
  connected: boolean;
};
type StartGameMessage = {
  gameCode: string;
};

type JustOneRoundTimeMessage = { secondsRemaining: number };

type JustOneNextRoundMessage = {
  gameCode: string;
};

type JustOneRoundTransitionMessage = {
  transitionDuration: number;
};

export type MessageMap = {
  "join-game": JoinGameMessage;
  "leave-game": LeaveGameMessage;
  "start-game": StartGameMessage;
  "justone-init-game-transition": JustOneRoundTransitionMessage;
  "justone-round-time": JustOneRoundTimeMessage;
  "just-one-round-transition": JustOneRoundTransitionMessage;
  "justone-next-round": JustOneNextRoundMessage;
};
