export interface ParticipantStatsInfo {
  fastestLapTime: number;
  lastLapTime: number;
  lastSectorTime: number;
  fastestSector1Time: number;
  fastestSector2Time: number;
  fastestSector3Time: number;
  participantOnlineRep: number;
  mpParticipantIndex: number;
}

export interface TimeStatsData {
  participantsChangedTimestamp: number;
  participants: ParticipantStatsInfo[];
}

export class TimeStatsDecoder {
  static decode(buffer: Buffer): TimeStatsData {
    let offset = 12;

    const participantsChangedTimestamp = buffer.readUInt32LE(offset);
    offset += 4;

    const participants: ParticipantStatsInfo[] = [];

    for (let i = 0; i < 32; i++) {
      const participant = this.decodeParticipantStats(buffer, offset);
      participants.push(participant);
      offset += 32;
    }

    return {
      participantsChangedTimestamp,
      participants,
    };
  }

  private static decodeParticipantStats(
    buffer: Buffer,
    offset: number,
  ): ParticipantStatsInfo {
    const fastestLapTime = buffer.readFloatLE(offset);
    offset += 4;

    const lastLapTime = buffer.readFloatLE(offset);
    offset += 4;

    const lastSectorTime = buffer.readFloatLE(offset);
    offset += 4;

    const fastestSector1Time = buffer.readFloatLE(offset);
    offset += 4;

    const fastestSector2Time = buffer.readFloatLE(offset);
    offset += 4;

    const fastestSector3Time = buffer.readFloatLE(offset);
    offset += 4;

    const participantOnlineRep = buffer.readUInt32LE(offset);
    offset += 4;

    const mpParticipantIndex = buffer.readUInt16LE(offset);
    offset += 2;

    offset += 2;

    return {
      fastestLapTime,
      lastLapTime,
      lastSectorTime,
      fastestSector1Time,
      fastestSector2Time,
      fastestSector3Time,
      participantOnlineRep,
      mpParticipantIndex,
    };
  }
}
