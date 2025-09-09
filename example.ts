import AMS2Client, { PacketType } from "./src/index";

const client = new AMS2Client();

// client.onPacket(PacketType.TIMINGS, (packet) => {
//   const parts = packet.participants.filter((p) => p.isActive);
//   console.log(parts);

//   console.log("---");
// });

client.onPacket(PacketType.PARTICIPANTS, (packet) => {
  console.log("PARTICIPANTS", packet);
});

client.onPacket(PacketType.PARTICIPANTS_VEHICLE_NAMES, (packet) => {
  console.log("PARTICIPANTS_VEHICLE_NAMES", packet);
});

client.start();
console.log("Waiting for packets...");

process.on("SIGINT", () => {
  console.log("\nStopping client...");
  client.stop();
  process.exit(0);
});
