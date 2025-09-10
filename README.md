# AMS2 UDP Telemetry Client

A TypeScript client library for receiving and decoding UDP telemetry data from Automobilista 2 (AMS2).

## Features

- Real-time UDP packet reception from AMS2
- Comprehensive packet decoding for multiple data types
- Type-safe event-driven API
- Support for all major telemetry packet types

## Supported Packet Types

| Packet Type | Description | Status |
|-------------|-------------|--------|
| `CAR_PHYSICS` | Complete car telemetry (physics, tires, suspension, engine) | ✅ |
| `RACE_DEFINITION` | Track info, lap records, race settings | ✅ |
| `PARTICIPANTS` | Driver names, nationalities, indices | ✅ |
| `TIMINGS` | Lap times, sector times, race positions | ✅ |
| `GAME_STATE` | Session state, weather conditions, temperatures | ✅ |
| `PARTICIPANT_VEHICLE_NAMES` | Vehicle information and names | ✅ |
| `TIME_STATS` | Detailed timing statistics | ✅ |
| `WEATHER_STATE` | Weather data | ❌ (included in GAME_STATE) |
| `VEHICLE_NAMES` | Vehicle names | ❌ (not sent by AMS2) |

## Installation

```bash
npm install ams2-client
```

## Quick Start

```typescript
import AMS2Client, { PacketType } from 'ams2-client';

const client = new AMS2Client();

// Listen for car physics data
client.onPacket(PacketType.CAR_PHYSICS, (data, header) => {
  console.log(`Speed: ${data.speed} m/s`);
  console.log(`RPM: ${data.rpm}/${data.maxRpm}`);
  console.log(`Gear: ${data.gear}`);
});

// Listen for timing data
client.onPacket(PacketType.TIMINGS, (data, header) => {
  const activeParticipants = data.participants.filter(p => p.isActive);
  console.log(`Active participants: ${activeParticipants.length}`);
});

// Start the client
client.start();

// Stop the client when done
// client.stop();
```

## API Reference

### AMS2Client

#### Methods

- `start()` - Start listening for UDP packets on port 5606
- `stop()` - Stop the UDP client
- `onPacket<T>(packetType: T, callback)` - Register event listener for specific packet type
- `onUnknownPacket(callback)` - Register event listener for unknown packet types

#### Event Callbacks

All callbacks receive three parameters:
- `packet` - Decoded packet data (type varies by packet type)
- `header` - Packet header information
- `rawBuffer` - Raw UDP packet buffer

### Packet Data Types

#### CarPhysicsData
Complete car telemetry including:
- Basic controls (throttle, brake, steering, clutch)
- Engine data (RPM, temperatures, pressures)
- Physics vectors (velocity, acceleration, orientation)
- Tire data (temperatures, wear, pressure)
- Suspension data (travel, damage, ride height)
- Brake data (temperatures, damage)

#### TimingsData
Race timing information:
- Event time remaining
- Split times (ahead/behind)
- Participant timing data (lap times, positions)
- Tick count

#### ParticipantsData
Driver information:
- Participant names
- Nationality codes
- Participant indices
- Change timestamp

#### RaceDefinitionData
Track and race information:
- Track name and variation
- Track length
- Fastest lap times (world and personal)
- Sector times
- Lap/time limits

#### GameStateData
Session and weather information:
- Game and session state
- Ambient and track temperatures
- Rain/snow density
- Wind speed and direction

#### ParticipantVehicleNamesData
Vehicle information:
- Vehicle names
- Vehicle classes
- Vehicle indices

## Configuration

### AMS2 Setup

1. Launch Automobilista 2
2. Go to Options → System
3. Enable "UDP Frequency" and set to desired rate (4-6 recommended)
4. Set Protocol Version to Project CARS 2


## Data Formats

### Tire Arrays
Tire data is provided as 4-element arrays representing [Front Left, Front Right, Rear Left, Rear Right].

## Development

### Building
```bash
npm run build
```

## Credits

[Based on the C++ implemention of leroythelegend](https://github.com/leroythelegend/rough_idea_project_cars) and [this project from nabezokodaikon](https://github.com/nabezokodaikon/pcars2-telemetry-browsing).
