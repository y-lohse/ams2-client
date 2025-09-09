import * as dgram from "dgram";
import { EventEmitter } from "events";
import {
  PacketDataTypes,
  PacketDecoder,
  PacketHeader,
  PacketType,
} from "./PacketDecoder";

class AMS2Client extends EventEmitter {
  private socket: dgram.Socket;
  private port: number = 5606;

  constructor() {
    super();
    this.socket = dgram.createSocket("udp4");
    this.socket.on("message", (msg: Buffer) => {
      try {
        const decodedPacket = PacketDecoder.decodePacket(msg);
        const header = decodedPacket.header;

        this.emit(
          PacketType[header.packetType].toString(),
          decodedPacket.data,
          header,
          msg,
        );
      } catch (error) {
        // Silently ignore decode errors
      }
    });

    this.socket.on("error", (err) => {
      this.socket.close();
    });
  }

  start() {
    this.socket.bind(this.port);
  }

  stop() {
    this.socket.close();
  }

  onPacket<T extends PacketType>(
    event: T,
    listener: (
      packet: PacketDataTypes[T],
      header: PacketHeader,
      rawPacket: Buffer,
    ) => void,
  ) {
    return super.on(PacketType[event].toString(), listener);
  }
}

export default AMS2Client;
export { CarPhysicsData } from "./CarPhysicsDecoder";
export { GameStateData } from "./GameStateDecoder";
export { PacketHeader, PacketType } from "./PacketDecoder";
export {
  ParticipantVehicleNamesData,
  VehicleInfo,
} from "./ParticipantVehicleNamesDecoder";
export { ParticipantData, ParticipantsData } from "./ParticipantsDecoder";
export { RaceDefinitionData } from "./RaceDefinitionDecoder";
export { ParticipantInfo, TimingsData } from "./TimingsDecoder";
