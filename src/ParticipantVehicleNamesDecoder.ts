export interface VehicleInfo {
  id: number;
  vehicleClass: number;
  name: string;
}

export interface ClassInfo {
  id: number;
  name: string;
}

export interface ParticipantVehicleNamesData {
  vehicles: (VehicleInfo | ClassInfo)[];
}

export class ParticipantVehicleNamesDecoder {
  static decode(buffer: Buffer): ParticipantVehicleNamesData {
    const isSessionVehicles =
      ParticipantVehicleNamesDecoder.detectSessionVehiclesPacket(buffer);

    if (isSessionVehicles) {
      return ParticipantVehicleNamesDecoder.decodeSessionVehicles(buffer);
    } else {
      return ParticipantVehicleNamesDecoder.decodeAvailableVehicles(buffer);
    }
  }

  private static detectSessionVehiclesPacket(buffer: Buffer): boolean {
    if (buffer.length < 12) return false;
    return buffer[8] === 0x01;
  }

  private static decodeSessionVehicles(
    buffer: Buffer,
  ): ParticipantVehicleNamesData {
    const vehicles: VehicleInfo[] = [];
    let offset = 12;
    const slotSize = 72;

    while (offset < buffer.length - slotSize && vehicles.length < 64) {
      const vehicleId = buffer.readUInt32LE(offset);
      const vehicleClass = buffer.readUInt32LE(offset + 4);

      if (vehicleId !== 0) {
        let nameStart = offset + 8;
        let nameEnd = nameStart;

        while (nameEnd < offset + slotSize && buffer[nameEnd] !== 0) {
          nameEnd++;
        }

        if (nameEnd > nameStart) {
          const name = buffer
            .subarray(nameStart, nameEnd)
            .toString("ascii")
            .trim();

          if (name.length > 0) {
            vehicles.push({
              id: vehicleId,
              vehicleClass: vehicleClass,
              name: name,
            });
          }
        }
      }

      offset += slotSize;
    }

    return { vehicles };
  }

  private static decodeAvailableVehicles(
    buffer: Buffer,
  ): ParticipantVehicleNamesData {
    const vehicles: VehicleInfo[] = [];
    let offset = 12;

    while (offset < buffer.length - 8) {
      const vehicleId = buffer.readUInt32LE(offset);
      offset += 4;

      let nameEnd = offset;
      while (nameEnd < buffer.length && buffer[nameEnd] !== 0) {
        nameEnd++;
      }

      if (nameEnd > offset) {
        const name = buffer.subarray(offset, nameEnd).toString("ascii").trim();

        if (name.length > 0) {
          vehicles.push({
            id: vehicleId,
            vehicleClass: 0,
            name: name,
          });
        }
      }

      offset = nameEnd + 1;
      while (offset < buffer.length && buffer[offset] === 0) {
        offset++;
      }

      if (vehicles.length >= 64) break;
    }

    return { vehicles };
  }
}
