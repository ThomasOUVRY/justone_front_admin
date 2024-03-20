export type ConnectedPlayerResponse = ConnectedPlayer[];

export type ConnectedPlayer = {
  name: string;
  gameCode: string;
  connected: boolean;
};
