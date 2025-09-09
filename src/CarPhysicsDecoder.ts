export interface CarPhysicsData {
  viewedParticipantIndex: number;
  unfilteredThrottle: number;
  unfilteredBrake: number;
  unfilteredSteering: number;
  unfilteredClutch: number;
  carFlags: number;
  oilTempCelsius: number;
  oilPressureKpa: number;
  waterTempCelsius: number;
  waterPressureKpa: number;
  fuelPressureKpa: number;
  fuelCapacity: number;
  brake: number;
  throttle: number;
  clutch: number;
  fuelLevel: number;
  speed: number;
  rpm: number;
  maxRpm: number;
  steering: number;
  gears: number;
  gear: number;
  boostAmount: number;
  crashState: number;
  odometerKm: number;
  orientation: [number, number, number];
  localVelocity: [number, number, number];
  worldVelocity: [number, number, number];
  angularVelocity: [number, number, number];
  localAcceleration: [number, number, number];
  worldAcceleration: [number, number, number];
  extentsCenter: [number, number, number];
  fullPosition: [number, number, number];
  tireFlags: [number, number, number, number];
  terrain: [number, number, number, number];
  tireY: [number, number, number, number];
  tireRps: [number, number, number, number];
  tireTemp: [number, number, number, number];
  tireHeightAboveGround: [number, number, number, number];
  tireWear: [number, number, number, number];
  tireTreadTemp: [number, number, number, number];
  tireLayerTemp: [number, number, number, number];
  tireCarcassTemp: [number, number, number, number];
  tireRimTemp: [number, number, number, number];
  tireInternalAirTemp: [number, number, number, number];
  tireTempLeft: [number, number, number, number];
  tireTempCenter: [number, number, number, number];
  tireTempRight: [number, number, number, number];
  wheelLocalPositionY: [number, number, number, number];
  rideHeight: [number, number, number, number];
  suspensionTravel: [number, number, number, number];
  suspensionVelocity: [number, number, number, number];
  suspensionRideHeight: [number, number, number, number];
  airPressure: [number, number, number, number];
  suspensionDamage: [number, number, number, number];
  brakeTempCelsius: [number, number, number, number];
  brakeDamage: [number, number, number, number];
  engineSpeed: number;
  engineTorque: number;
  wings: [number, number];
  handbrake: number;
  aeroDamage: number;
  engineDamage: number;
  joyPad0: number;
  dPad: number;
  tireCompound: [string, string, string, string];
  turboBoostPressure: number;
  brakeBias: number;
  tickCount: number;
}

export class CarPhysicsDecoder {
  static decode(buffer: Buffer): CarPhysicsData {
    let offset = 12;

    const viewedParticipantIndex = buffer.readInt8(offset);
    offset += 1;

    const unfilteredThrottle = buffer.readUInt8(offset);
    offset += 1;

    const unfilteredBrake = buffer.readUInt8(offset);
    offset += 1;

    const unfilteredSteering = buffer.readInt8(offset);
    offset += 1;

    const unfilteredClutch = buffer.readUInt8(offset);
    offset += 1;

    const carFlags = buffer.readUInt8(offset);
    offset += 1;

    const oilTempCelsius = buffer.readInt16LE(offset);
    offset += 2;

    const oilPressureKpa = buffer.readUInt16LE(offset);
    offset += 2;

    const waterTempCelsius = buffer.readInt16LE(offset);
    offset += 2;

    const waterPressureKpa = buffer.readUInt16LE(offset);
    offset += 2;

    const fuelPressureKpa = buffer.readUInt16LE(offset);
    offset += 2;

    const fuelCapacity = buffer.readUInt8(offset);
    offset += 1;

    const brake = buffer.readUInt8(offset);
    offset += 1;

    const throttle = buffer.readUInt8(offset);
    offset += 1;

    const clutch = buffer.readUInt8(offset);
    offset += 1;

    const fuelLevel = buffer.readFloatLE(offset);
    offset += 4;

    const speed = buffer.readFloatLE(offset);
    offset += 4;

    const rpm = buffer.readUInt16LE(offset);
    offset += 2;

    const maxRpm = buffer.readUInt16LE(offset);
    offset += 2;

    const steering = buffer.readInt8(offset);
    offset += 1;

    const gearByte = buffer.readUInt8(offset);
    const gear = gearByte & 0x0f;
    const gears = (gearByte >> 4) & 0x0f;
    offset += 1;

    const boostAmount = buffer.readUInt8(offset);
    offset += 1;

    const crashState = buffer.readUInt8(offset);
    offset += 1;

    const odometerKm = buffer.readFloatLE(offset);
    offset += 4;

    const orientation: [number, number, number] = [
      buffer.readFloatLE(offset),
      buffer.readFloatLE(offset + 4),
      buffer.readFloatLE(offset + 8),
    ];
    offset += 12;

    const localVelocity: [number, number, number] = [
      buffer.readFloatLE(offset),
      buffer.readFloatLE(offset + 4),
      buffer.readFloatLE(offset + 8),
    ];
    offset += 12;

    const worldVelocity: [number, number, number] = [
      buffer.readFloatLE(offset),
      buffer.readFloatLE(offset + 4),
      buffer.readFloatLE(offset + 8),
    ];
    offset += 12;

    const angularVelocity: [number, number, number] = [
      buffer.readFloatLE(offset),
      buffer.readFloatLE(offset + 4),
      buffer.readFloatLE(offset + 8),
    ];
    offset += 12;

    const localAcceleration: [number, number, number] = [
      buffer.readFloatLE(offset),
      buffer.readFloatLE(offset + 4),
      buffer.readFloatLE(offset + 8),
    ];
    offset += 12;

    const worldAcceleration: [number, number, number] = [
      buffer.readFloatLE(offset),
      buffer.readFloatLE(offset + 4),
      buffer.readFloatLE(offset + 8),
    ];
    offset += 12;

    const extentsCenter: [number, number, number] = [
      buffer.readFloatLE(offset),
      buffer.readFloatLE(offset + 4),
      buffer.readFloatLE(offset + 8),
    ];
    offset += 12;

    const tireFlags: [number, number, number, number] = [
      buffer.readUInt8(offset),
      buffer.readUInt8(offset + 1),
      buffer.readUInt8(offset + 2),
      buffer.readUInt8(offset + 3),
    ];
    offset += 4;

    const terrain: [number, number, number, number] = [
      buffer.readUInt8(offset),
      buffer.readUInt8(offset + 1),
      buffer.readUInt8(offset + 2),
      buffer.readUInt8(offset + 3),
    ];
    offset += 4;

    const tireY: [number, number, number, number] = [
      buffer.readFloatLE(offset),
      buffer.readFloatLE(offset + 4),
      buffer.readFloatLE(offset + 8),
      buffer.readFloatLE(offset + 12),
    ];
    offset += 16;

    const tireRps: [number, number, number, number] = [
      buffer.readFloatLE(offset),
      buffer.readFloatLE(offset + 4),
      buffer.readFloatLE(offset + 8),
      buffer.readFloatLE(offset + 12),
    ];
    offset += 16;

    const tireTemp: [number, number, number, number] = [
      buffer.readUInt8(offset),
      buffer.readUInt8(offset + 1),
      buffer.readUInt8(offset + 2),
      buffer.readUInt8(offset + 3),
    ];
    offset += 4;

    const tireHeightAboveGround: [number, number, number, number] = [
      buffer.readFloatLE(offset),
      buffer.readFloatLE(offset + 4),
      buffer.readFloatLE(offset + 8),
      buffer.readFloatLE(offset + 12),
    ];
    offset += 16;

    const tireWear: [number, number, number, number] = [
      buffer.readUInt8(offset),
      buffer.readUInt8(offset + 1),
      buffer.readUInt8(offset + 2),
      buffer.readUInt8(offset + 3),
    ];
    offset += 4;

    offset += 4;

    offset += 8;

    const tireTreadTemp: [number, number, number, number] = [
      buffer.readUInt16LE(offset),
      buffer.readUInt16LE(offset + 2),
      buffer.readUInt16LE(offset + 4),
      buffer.readUInt16LE(offset + 6),
    ];
    offset += 8;

    const tireLayerTemp: [number, number, number, number] = [
      buffer.readUInt16LE(offset),
      buffer.readUInt16LE(offset + 2),
      buffer.readUInt16LE(offset + 4),
      buffer.readUInt16LE(offset + 6),
    ];
    offset += 8;

    const tireCarcassTemp: [number, number, number, number] = [
      buffer.readUInt16LE(offset),
      buffer.readUInt16LE(offset + 2),
      buffer.readUInt16LE(offset + 4),
      buffer.readUInt16LE(offset + 6),
    ];
    offset += 8;

    const tireRimTemp: [number, number, number, number] = [
      buffer.readUInt16LE(offset),
      buffer.readUInt16LE(offset + 2),
      buffer.readUInt16LE(offset + 4),
      buffer.readUInt16LE(offset + 6),
    ];
    offset += 8;

    const tireInternalAirTemp: [number, number, number, number] = [
      buffer.readUInt16LE(offset),
      buffer.readUInt16LE(offset + 2),
      buffer.readUInt16LE(offset + 4),
      buffer.readUInt16LE(offset + 6),
    ];
    offset += 8;

    const tireTempLeft: [number, number, number, number] = [
      buffer.readUInt16LE(offset),
      buffer.readUInt16LE(offset + 2),
      buffer.readUInt16LE(offset + 4),
      buffer.readUInt16LE(offset + 6),
    ];
    offset += 8;

    const tireTempCenter: [number, number, number, number] = [
      buffer.readUInt16LE(offset),
      buffer.readUInt16LE(offset + 2),
      buffer.readUInt16LE(offset + 4),
      buffer.readUInt16LE(offset + 6),
    ];
    offset += 8;

    const tireTempRight: [number, number, number, number] = [
      buffer.readUInt16LE(offset),
      buffer.readUInt16LE(offset + 2),
      buffer.readUInt16LE(offset + 4),
      buffer.readUInt16LE(offset + 6),
    ];
    offset += 8;

    const wheelLocalPositionY: [number, number, number, number] = [
      buffer.readFloatLE(offset),
      buffer.readFloatLE(offset + 4),
      buffer.readFloatLE(offset + 8),
      buffer.readFloatLE(offset + 12),
    ];
    offset += 16;

    const rideHeight: [number, number, number, number] = [
      buffer.readFloatLE(offset),
      buffer.readFloatLE(offset + 4),
      buffer.readFloatLE(offset + 8),
      buffer.readFloatLE(offset + 12),
    ];
    offset += 16;

    const suspensionTravel: [number, number, number, number] = [
      buffer.readFloatLE(offset),
      buffer.readFloatLE(offset + 4),
      buffer.readFloatLE(offset + 8),
      buffer.readFloatLE(offset + 12),
    ];
    offset += 16;

    const suspensionVelocity: [number, number, number, number] = [
      buffer.readFloatLE(offset),
      buffer.readFloatLE(offset + 4),
      buffer.readFloatLE(offset + 8),
      buffer.readFloatLE(offset + 12),
    ];
    offset += 16;

    const suspensionRideHeight: [number, number, number, number] = [
      buffer.readUInt16LE(offset),
      buffer.readUInt16LE(offset + 2),
      buffer.readUInt16LE(offset + 4),
      buffer.readUInt16LE(offset + 6),
    ];
    offset += 8;

    const airPressure: [number, number, number, number] = [
      buffer.readUInt16LE(offset),
      buffer.readUInt16LE(offset + 2),
      buffer.readUInt16LE(offset + 4),
      buffer.readUInt16LE(offset + 6),
    ];
    offset += 8;

    offset += 8;

    offset += 4;

    const suspensionDamage: [number, number, number, number] = [
      buffer.readUInt8(offset + 68),
      buffer.readUInt8(offset + 69),
      buffer.readUInt8(offset + 70),
      buffer.readUInt8(offset + 71),
    ];

    const brakeTempCelsius: [number, number, number, number] = [
      buffer.readInt16LE(offset + 72),
      buffer.readInt16LE(offset + 74),
      buffer.readInt16LE(offset + 76),
      buffer.readInt16LE(offset + 78),
    ];

    const brakeDamage: [number, number, number, number] = [
      buffer.readUInt8(offset + 64),
      buffer.readUInt8(offset + 65),
      buffer.readUInt8(offset + 66),
      buffer.readUInt8(offset + 67),
    ];

    const engineSpeed = buffer.readFloatLE(offset + 80);
    const engineTorque = buffer.readFloatLE(offset + 84);

    const wings: [number, number] = [
      buffer.readUInt8(offset + 88),
      buffer.readUInt8(offset + 89),
    ];

    const handbrake = buffer.readUInt8(offset + 90);
    const aeroDamage = buffer.readUInt8(offset + 91);
    const engineDamage = buffer.readUInt8(offset + 92);

    offset += 93;

    const joyPad0 = buffer.readUInt32LE(offset);
    offset += 4;

    const dPad = buffer.readUInt8(offset);
    offset += 1;

    const tireCompound: [string, string, string, string] = [
      this.readString(buffer, offset, 40),
      this.readString(buffer, offset + 40, 40),
      this.readString(buffer, offset + 80, 40),
      this.readString(buffer, offset + 120, 40),
    ];
    offset += 160;

    const turboBoostPressure = buffer.readFloatLE(offset);
    offset += 4;

    const fullPosition: [number, number, number] = [
      buffer.readFloatLE(offset),
      buffer.readFloatLE(offset + 4),
      buffer.readFloatLE(offset + 8),
    ];
    offset += 12;

    const brakeBias = buffer.readUInt8(offset);
    offset += 1;

    offset += 3;

    const tickCount = buffer.readUInt32LE(offset);

    return {
      viewedParticipantIndex,
      unfilteredThrottle,
      unfilteredBrake,
      unfilteredSteering,
      unfilteredClutch,
      carFlags,
      oilTempCelsius,
      oilPressureKpa,
      waterTempCelsius,
      waterPressureKpa,
      fuelPressureKpa,
      fuelCapacity,
      brake,
      throttle,
      clutch,
      fuelLevel,
      speed,
      rpm,
      maxRpm,
      steering,
      gears,
      gear,
      boostAmount,
      crashState,
      odometerKm,
      orientation,
      localVelocity,
      worldVelocity,
      angularVelocity,
      localAcceleration,
      worldAcceleration,
      extentsCenter,
      fullPosition,
      tireFlags,
      terrain,
      tireY,
      tireRps,
      tireTemp,
      tireHeightAboveGround,
      tireWear,
      tireTreadTemp,
      tireLayerTemp,
      tireCarcassTemp,
      tireRimTemp,
      tireInternalAirTemp,
      tireTempLeft,
      tireTempCenter,
      tireTempRight,
      wheelLocalPositionY,
      rideHeight,
      suspensionTravel,
      suspensionVelocity,
      suspensionRideHeight,
      airPressure,
      suspensionDamage,
      brakeTempCelsius,
      brakeDamage,
      engineSpeed,
      engineTorque,
      wings,
      handbrake,
      aeroDamage,
      engineDamage,
      joyPad0,
      dPad,
      tireCompound,
      turboBoostPressure,
      brakeBias,
      tickCount,
    };
  }

  private static readString(
    buffer: Buffer,
    offset: number,
    length: number,
  ): string {
    const stringBuffer = buffer.subarray(offset, offset + length);
    const nullIndex = stringBuffer.indexOf(0);
    return stringBuffer
      .subarray(0, nullIndex >= 0 ? nullIndex : length)
      .toString("utf8");
  }
}
