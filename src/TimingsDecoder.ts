export interface ParticipantInfo {
  worldPosition: [number, number, number];
  orientation: [number, number, number];
  currentLapDistance: number;
  racePosition: number;
  isActive: boolean;
  sector: number;
  flagColour: number;
  flagReason: number;
  pitMode: number;
  pitModeSchedule: number;
  carIndex: number;
  localPlayer: boolean;
  raceState: number;
  invalidLap: boolean;
  currentLap: number;
  currentTime: number;
  currentSectorTime: number;
  mpParticipantIndex: number;
}

export interface TimingsData {
  numParticipants: number;
  participantsChangedTimestamp: number;
  eventTimeRemaining: number;
  splitTimeAhead: number;
  splitTimeBehind: number;
  splitTime: number;
  participants: ParticipantInfo[];
  localParticipantIndex: number;
  tickCount: number;
}

export class TimingsDecoder {
  static decode(buffer: Buffer): TimingsData {
    let offset = 12;

    const numParticipants = buffer.readInt8(offset);
    offset += 1;

    const participantsChangedTimestamp = buffer.readUInt32LE(offset);
    offset += 4;

    const eventTimeRemaining = buffer.readFloatLE(offset);
    offset += 4;

    const splitTimeAhead = buffer.readFloatLE(offset);
    offset += 4;

    const splitTimeBehind = buffer.readFloatLE(offset);
    offset += 4;

    const splitTime = buffer.readFloatLE(offset);
    offset += 4;

    const participants: ParticipantInfo[] = [];

    for (let i = 0; i < 32; i++) {
      const participant = this.decodeParticipant(buffer, offset);
      participants.push(participant);
      offset += 28;
    }

    const localParticipantIndex = buffer.readUInt16LE(offset);
    offset += 2;

    const tickCount = buffer.readUInt32LE(offset);

    return {
      numParticipants,
      participantsChangedTimestamp,
      eventTimeRemaining,
      splitTimeAhead,
      splitTimeBehind,
      splitTime,
      participants,
      localParticipantIndex,
      tickCount,
    };
  }

  private static decodeParticipant(
    buffer: Buffer,
    offset: number,
  ): ParticipantInfo {
    const worldPosition: [number, number, number] = [
      buffer.readInt16LE(offset),
      buffer.readInt16LE(offset + 2),
      buffer.readInt16LE(offset + 4),
    ];
    offset += 6;

    const orientation: [number, number, number] = [
      buffer.readInt16LE(offset),
      buffer.readInt16LE(offset + 2),
      buffer.readInt16LE(offset + 4),
    ];
    offset += 6;

    const currentLapDistance = buffer.readUInt16LE(offset);
    offset += 2;

    const racePositionByte = buffer.readUInt8(offset);
    const racePosition = racePositionByte & 0x7f;
    const isActive = (racePositionByte & 0x80) !== 0;
    offset += 1;

    const sectorByte = buffer.readUInt8(offset);
    const sector = sectorByte & 0x0f;
    const flagColour = (sectorByte >> 4) & 0x0f;
    offset += 1;

    const flagReasonByte = buffer.readUInt8(offset);
    const flagReason = flagReasonByte & 0x07;
    const pitMode = (flagReasonByte >> 3) & 0x07;
    offset += 1;

    const pitModeScheduleByte = buffer.readUInt8(offset);
    const pitModeSchedule = pitModeScheduleByte & 0x0f;
    offset += 1;

    const carIndexWord = buffer.readUInt16LE(offset);
    const carIndex = carIndexWord & 0x7fff;
    const localPlayer = (carIndexWord & 0x8000) !== 0;
    offset += 2;

    const raceStateByte = buffer.readUInt8(offset);
    const raceState = raceStateByte & 0x7f;
    const invalidLap = (raceStateByte & 0x80) !== 0;
    offset += 1;

    const currentLap = buffer.readUInt8(offset);
    offset += 1;

    const currentTime = buffer.readFloatLE(offset);
    offset += 4;

    const currentSectorTime = buffer.readFloatLE(offset);
    offset += 4;

    const mpParticipantIndex = buffer.readUInt16LE(offset);

    return {
      worldPosition,
      orientation,
      currentLapDistance,
      racePosition,
      isActive,
      sector,
      flagColour,
      flagReason,
      pitMode,
      pitModeSchedule,
      carIndex,
      localPlayer,
      raceState,
      invalidLap,
      currentLap,
      currentTime,
      currentSectorTime,
      mpParticipantIndex,
    };
  }
}
