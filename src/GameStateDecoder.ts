export enum GameState {
  GAME_EXITED = 0,
  GAME_FRONT_END = 1,
  GAME_INGAME_PLAYING = 2,
  GAME_INGAME_PAUSED = 3,
  GAME_INGAME_INMENU_TIME_TICKING = 4,
  GAME_INGAME_RESTARTING = 5,
  GAME_INGAME_REPLAY = 6,
  GAME_FRONT_END_REPLAY = 7,
  GAME_UNKNOWN = 127,
}

export enum SessionState {
  SESSION_INVALID = 0,
  SESSION_PRACTICE = 1,
  SESSION_TEST = 2,
  SESSION_QUALIFY = 3,
  SESSION_FORMATION_LAP = 4,
  SESSION_RACE = 5,
  SESSION_TIME_ATTACK = 6,
  SESSION_UNKNOWN = 127,
}

export interface GameStateData {
  buildVersionNumber: number;
  gameState: GameState;
  sessionState: SessionState;
  ambientTemperature: number;
  trackTemperature: number;
  rainDensity: number;
  snowDensity: number;
  windSpeed: number;
  windDirectionX: number;
  windDirectionY: number;
}

export class GameStateDecoder {
  static decode(buffer: Buffer): GameStateData {
    let offset = 12;

    const buildVersionNumber = buffer.readUInt16LE(offset);
    offset += 2;

    offset += 1;

    const gameSessionStateByte = buffer.readUInt8(offset);
    const gameState = gameSessionStateByte & 0x07;
    const sessionState = (gameSessionStateByte >> 3) & 0x07;
    offset += 1;

    const ambientTemperature = buffer.readInt8(offset);
    offset += 1;

    const trackTemperature = buffer.readInt8(offset);
    offset += 1;

    const rainDensity = buffer.readUInt8(offset);
    offset += 1;

    const snowDensity = buffer.readUInt8(offset);
    offset += 1;

    const windSpeed = buffer.readInt8(offset);
    offset += 1;

    const windDirectionX = buffer.readInt8(offset);
    offset += 1;

    const windDirectionY = buffer.readInt8(offset);

    return {
      buildVersionNumber,
      gameState,
      sessionState,
      ambientTemperature,
      trackTemperature,
      rainDensity,
      snowDensity,
      windSpeed,
      windDirectionX,
      windDirectionY,
    };
  }
}
