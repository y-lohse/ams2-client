export interface VehicleInfo {
  index: number;
  vehicleClass: number;
  name: string;
}

export interface ParticipantVehicleNamesData {
  vehicles: VehicleInfo[];
}

export class ParticipantVehicleNamesDecoder {
  static decode(buffer: Buffer): ParticipantVehicleNamesData {
    let offset = 12;

    const vehicles: VehicleInfo[] = [];

    for (let i = 0; i < 16; i++) {
      const vehicle = this.decodeVehicle(buffer, offset);
      vehicles.push(vehicle);
      offset += 70;
    }

    return {
      vehicles,
    };
  }

  private static decodeVehicle(buffer: Buffer, offset: number): VehicleInfo {
    const index = buffer.readUInt16LE(offset);
    offset += 2;

    const vehicleClass = buffer.readUInt32LE(offset);
    offset += 4;

    const nameBuffer = buffer.subarray(offset, offset + 64);
    const nullIndex = nameBuffer.indexOf(0);
    const name = nameBuffer.subarray(0, nullIndex >= 0 ? nullIndex : 64).toString('utf8');

    return {
      index,
      vehicleClass,
      name,
    };
  }
}
