export enum RaceState {
  RACESTATE_INVALID = 0,
  RACESTATE_NOT_STARTED = 1,
  RACESTATE_RACING = 2,
  RACESTATE_FINISHED = 3,
  RACESTATE_DISQUALIFIED = 4,
  RACESTATE_RETIRED = 5,
  RACESTATE_DNF = 6,
  RACESTATE_UNKNOWN = 127,
}

export enum PitMode {
  PIT_MODE_NONE = 0,
  PIT_MODE_DRIVING_INTO_PITS = 1,
  PIT_MODE_IN_PIT = 2,
  PIT_MODE_DRIVING_OUT_OF_PITS = 3,
  PIT_MODE_IN_GARAGE = 4,
  PIT_MODE_DRIVING_OUT_OF_GARAGE = 5,
  PIT_MODE_UNKNOWN = 127,
}

export enum PitSchedule {
  PIT_SCHEDULE_NONE = 0,
  PIT_SCHEDULE_PLAYER_REQUESTED = 1,
  PIT_SCHEDULE_ENGINEER_REQUESTED = 2,
  PIT_SCHEDULE_DAMAGE_REQUESTED = 3,
  PIT_SCHEDULE_MANDATORY = 4,
  PIT_SCHEDULE_DRIVE_THROUGH = 5,
  PIT_SCHEDULE_STOP_GO = 6,
  PIT_SCHEDULE_PITSPOT_OCCUPIED = 7,
  PIT_SCHEDULE_UNKNOWN = 127,
}

export enum FlagColor {
  FLAG_COLOUR_NONE = 0,
  FLAG_COLOUR_GREEN = 1,
  FLAG_COLOUR_BLUE = 2,
  FLAG_COLOUR_WHITE_SLOW_CAR = 3,
  FLAG_COLOUR_WHITE_FINAL_LAP = 4,
  FLAG_COLOUR_RED = 5,
  FLAG_COLOUR_YELLOW = 6,
  FLAG_COLOUR_DOUBLE_YELLOW = 7,
  FLAG_COLOUR_BLACK_AND_WHITE = 8,
  FLAG_COLOUR_BLACK_ORANGE_CIRCLE = 9,
  FLAG_COLOUR_BLACK = 10,
  FLAG_COLOUR_CHEQUERED = 11,
  FLAG_COLOUR_UNKNOWN = 127,
}

export enum FlagReason {
  FLAG_REASON_NONE = 0,
  FLAG_REASON_SOLO_CRASH = 1,
  FLAG_REASON_VEHICLE_CRASH = 2,
  FLAG_REASON_VEHICLE_OBSTRUCTION = 3,
  FLAG_REASON_UNKNOWN = 127,
}

export interface ParticipantInfo {
  worldPosition: [number, number, number];
  orientation: [number, number, number];
  currentLapDistance: number;
  racePosition: number;
  isActive: boolean;
  sector: number;
  flagColour: FlagColor;
  flagReason: FlagReason;
  pitMode: PitMode;
  pitModeSchedule: PitSchedule;
  carIndex: number;
  isHuman: boolean;
  raceState: RaceState;
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
      offset += 32;
    }

    const localParticipantIndex = buffer.readUInt16LE(offset);

    return {
      numParticipants,
      participantsChangedTimestamp,
      eventTimeRemaining,
      splitTimeAhead,
      splitTimeBehind,
      splitTime,
      participants,
      localParticipantIndex,
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
    offset += 1;

    const highestFlagByte = buffer.readUInt8(offset);
    const flagColour = highestFlagByte & 0x07;
    const flagReason = (highestFlagByte >> 3) & 0x03;
    offset += 1;

    const pitModeScheduleByte = buffer.readUInt8(offset);
    const pitMode = pitModeScheduleByte & 0x07;
    const pitModeSchedule = (pitModeScheduleByte >> 3) & 0x03;
    offset += 1;

    const carIndexWord = buffer.readUInt16LE(offset);
    const carIndex = carIndexWord & 0x7fff;
    const isHuman = (carIndexWord & 0x8000) !== 0;
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
      isHuman,
      raceState,
      invalidLap,
      currentLap,
      currentTime,
      currentSectorTime,
      mpParticipantIndex,
    };
  }
}
