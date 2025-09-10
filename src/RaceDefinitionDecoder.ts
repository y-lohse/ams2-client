export interface RaceDefinitionData {
  worldFastestLapTime: number;
  personalFastestLapTime: number;
  personalFastestSector1Time: number;
  personalFastestSector2Time: number;
  personalFastestSector3Time: number;
  worldFastestSector1Time: number;
  worldFastestSector2Time: number;
  worldFastestSector3Time: number;
  trackLength: number;
  trackLocation: string;
  trackVariation: string;
  translatedTrackLocation: string;
  translatedTrackVariation: string;
  lapsTimeInEvent: number;
  isTimedSessions: boolean;
  lapsInEvent: number;
  sessionLengthTimeInEvent: number;
  enforcedPitstopLap: number;
}

export class RaceDefinitionDecoder {
  static decode(buffer: Buffer): RaceDefinitionData {
    let offset = 12;

    const worldFastestLapTime = buffer.readFloatLE(offset);
    offset += 4;

    const personalFastestLapTime = buffer.readFloatLE(offset);
    offset += 4;

    const personalFastestSector1Time = buffer.readFloatLE(offset);
    offset += 4;

    const personalFastestSector2Time = buffer.readFloatLE(offset);
    offset += 4;

    const personalFastestSector3Time = buffer.readFloatLE(offset);
    offset += 4;

    const worldFastestSector1Time = buffer.readFloatLE(offset);
    offset += 4;

    const worldFastestSector2Time = buffer.readFloatLE(offset);
    offset += 4;

    const worldFastestSector3Time = buffer.readFloatLE(offset);
    offset += 4;

    const trackLength = buffer.readFloatLE(offset);
    offset += 4;

    const trackLocationBuffer = buffer.subarray(offset, offset + 64);
    const trackLocationNullIndex = trackLocationBuffer.indexOf(0);
    const trackLocation = trackLocationBuffer
      .subarray(0, trackLocationNullIndex >= 0 ? trackLocationNullIndex : 64)
      .toString("utf8");
    offset += 64;

    const trackVariationBuffer = buffer.subarray(offset, offset + 64);
    const trackVariationNullIndex = trackVariationBuffer.indexOf(0);
    const trackVariation = trackVariationBuffer
      .subarray(0, trackVariationNullIndex >= 0 ? trackVariationNullIndex : 64)
      .toString("utf8");
    offset += 64;

    const translatedTrackLocationBuffer = buffer.subarray(offset, offset + 64);
    const translatedTrackLocationNullIndex =
      translatedTrackLocationBuffer.indexOf(0);
    const translatedTrackLocation = translatedTrackLocationBuffer
      .subarray(
        0,
        translatedTrackLocationNullIndex >= 0
          ? translatedTrackLocationNullIndex
          : 64,
      )
      .toString("utf8");
    offset += 64;

    const translatedTrackVariationBuffer = buffer.subarray(offset, offset + 64);
    const translatedTrackVariationNullIndex =
      translatedTrackVariationBuffer.indexOf(0);
    const translatedTrackVariation = translatedTrackVariationBuffer
      .subarray(
        0,
        translatedTrackVariationNullIndex >= 0
          ? translatedTrackVariationNullIndex
          : 64,
      )
      .toString("utf8");
    offset += 64;

    const lapsTimeInEvent = buffer.readUInt16LE(offset);
    offset += 2;

    const isTimedSessions = (lapsTimeInEvent & 0x8000) !== 0;
    const lapsInEvent = isTimedSessions ? 0 : lapsTimeInEvent & 0x7fff;
    const sessionLengthTimeInEvent = isTimedSessions
      ? (lapsTimeInEvent & 0x7fff) * 5
      : 0;

    const enforcedPitstopLap = buffer.readInt8(offset);

    return {
      worldFastestLapTime,
      personalFastestLapTime,
      personalFastestSector1Time,
      personalFastestSector2Time,
      personalFastestSector3Time,
      worldFastestSector1Time,
      worldFastestSector2Time,
      worldFastestSector3Time,
      trackLength,
      trackLocation,
      trackVariation,
      translatedTrackLocation,
      translatedTrackVariation,
      lapsTimeInEvent,
      isTimedSessions,
      lapsInEvent,
      sessionLengthTimeInEvent,
      enforcedPitstopLap,
    };
  }
}
