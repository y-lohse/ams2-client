import { TimingsDecoder } from "./TimingsDecoder";
import { ParticipantVehicleNamesDecoder } from "./ParticipantVehicleNamesDecoder";
import { ParticipantsDecoder } from "./ParticipantsDecoder";
import { RaceDefinitionDecoder } from "./RaceDefinitionDecoder";
import { GameStateDecoder } from "./GameStateDecoder";

export interface PacketHeader {
  packetNumber: number;
  categoryPacketNumber: number;
  partialPacketIndex: number;
  partialPacketNumber: number;
  packetType: number;
  packetVersion: number;
}

export enum PacketType {
  CAR_PHYSICS = 0,
  RACE_DEFINITION = 1,
  PARTICIPANTS = 2,
  TIMINGS = 3,
  GAME_STATE = 4,
  WEATHER_STATE = 5,
  VEHICLE_NAMES = 6,
  TIME_STATS = 7,
  PARTICIPANTS_VEHICLE_NAMES = 8,
}

export type PacketDataTypes = {
  [PacketType.CAR_PHYSICS]: never;
  [PacketType.RACE_DEFINITION]: ReturnType<typeof RaceDefinitionDecoder.decode>;
  [PacketType.PARTICIPANTS]: ReturnType<typeof ParticipantsDecoder.decode>;
  [PacketType.TIMINGS]: ReturnType<typeof TimingsDecoder.decode>;
  [PacketType.GAME_STATE]: ReturnType<typeof GameStateDecoder.decode>;
  [PacketType.WEATHER_STATE]: never;
  [PacketType.VEHICLE_NAMES]: never;
  [PacketType.TIME_STATS]: never;
  [PacketType.PARTICIPANTS_VEHICLE_NAMES]: ReturnType<
    typeof ParticipantVehicleNamesDecoder.decode
  >;
};

export class PacketDecoder {
  static decodeHeader(buffer: Buffer): PacketHeader {
    if (buffer.length < 12) {
      throw new Error("Buffer too short for packet header");
    }

    return {
      packetNumber: buffer.readUInt32LE(0),
      categoryPacketNumber: buffer.readUInt32LE(4),
      partialPacketIndex: buffer.readUInt8(8),
      partialPacketNumber: buffer.readUInt8(9),
      packetType: buffer.readUInt8(10),
      packetVersion: buffer.readUInt8(11),
    };
  }

  static getPacketTypeName(packetType: number) {
    switch (packetType) {
      case PacketType.CAR_PHYSICS:
        return "CAR_PHYSICS";
      case PacketType.RACE_DEFINITION:
        return "RACE_DEFINITION";
      case PacketType.PARTICIPANTS:
        return "PARTICIPANTS";
      case PacketType.TIMINGS:
        return "TIMINGS";
      case PacketType.GAME_STATE:
        return "GAME_STATE";
      case PacketType.WEATHER_STATE:
        return "WEATHER_STATE";
      case PacketType.VEHICLE_NAMES:
        return "VEHICLE_NAMES";
      case PacketType.TIME_STATS:
        return "TIME_STATS";
      case PacketType.PARTICIPANTS_VEHICLE_NAMES:
        return "PARTICIPANTS_VEHICLE_NAMES";
      default:
        return `UNKNOWN_TYPE_${packetType}`;
    }
  }

  static isMultiPartPacket(header: PacketHeader) {
    return header.partialPacketNumber > 1;
  }

  static decodePacket(buffer: Buffer) {
    const header = this.decodeHeader(buffer);

    switch (header.packetType) {
      case PacketType.TIMINGS:
        return {
          header,
          data: TimingsDecoder.decode(buffer),
        };
      case PacketType.PARTICIPANTS:
        return {
          header,
          data: ParticipantsDecoder.decode(buffer),
        };
      case PacketType.RACE_DEFINITION:
        return {
          header,
          data: RaceDefinitionDecoder.decode(buffer),
        };
      case PacketType.GAME_STATE:
        return {
          header,
          data: GameStateDecoder.decode(buffer),
        };
      case PacketType.PARTICIPANTS_VEHICLE_NAMES:
        return {
          header,
          data: ParticipantVehicleNamesDecoder.decode(buffer),
        };
      default:
        return {
          header,
          data: null,
        };
    }
  }
}
