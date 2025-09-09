export interface GameStateData {
  buildVersion: number;
  gameState: number;
  sessionState: number;
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

    const buildVersion = buffer.readUInt16LE(offset);
    offset += 2;

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
      buildVersion,
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
