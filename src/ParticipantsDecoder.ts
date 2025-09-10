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

    const names: string[] = [];
    for (let i = 0; i < 16; i++) {
      const nameBuffer = buffer.subarray(offset, offset + 64);
      const nullIndex = nameBuffer.indexOf(0);
      const name = nameBuffer
        .subarray(0, nullIndex >= 0 ? nullIndex : 64)
        .toString("utf8");
      names.push(name);
      offset += 64;
    }

    const nationalities: number[] = [];
    for (let i = 0; i < 16; i++) {
      const nationality = buffer.readUInt32LE(offset);
      nationalities.push(nationality);
      offset += 4;
    }

    const indices: number[] = [];
    for (let i = 0; i < 16; i++) {
      const index = buffer.readUInt16LE(offset);
      indices.push(index);
      offset += 2;
    }

    for (let i = 0; i < 16; i++) {
      participants.push({
        name: names[i],
        nationality: nationalities[i],
        index: indices[i],
      });
    }

    return {
      participantsChangedTimestamp,
      participants,
    };
  }
}
