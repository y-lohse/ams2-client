export interface ParticipantData {
  name: string;
  nationality: number;
  index: number;
}

export interface ParticipantsData {
  participantsChangedTimestamp: number;
  participants: ParticipantData[];
}

export class ParticipantsDecoder {
  static decode(buffer: Buffer): ParticipantsData {
    let offset = 12;

    const participantsChangedTimestamp = buffer.readUInt32LE(offset);
    offset += 4;

    const participants: ParticipantData[] = [];

    for (let i = 0; i < 16; i++) {
      const participant = this.decodeParticipant(buffer, offset);
      participants.push(participant);
      offset += 72;
    }

    return {
      participantsChangedTimestamp,
      participants,
    };
  }

  private static decodeParticipant(
    buffer: Buffer,
    offset: number,
  ): ParticipantData {
    const nameBuffer = buffer.subarray(offset, offset + 64);
    const nullIndex = nameBuffer.indexOf(0);
    const name = nameBuffer
      .subarray(0, nullIndex >= 0 ? nullIndex : 64)
      .toString("utf8");
    offset += 64;

    const nationality = buffer.readUInt32LE(offset);
    offset += 4;

    const index = buffer.readUInt16LE(offset);

    return {
      name,
      nationality,
      index,
    };
  }
}
