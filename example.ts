import AMS2Client, { PacketType } from "./src/index";

const client = new AMS2Client();

client.onPacket(PacketType.TIMINGS, (packet) => {
  const parts = packet.participants.filter((p) => p.isActive);
  console.log(parts);

  console.log("---");
});

client.start();
console.log("Waiting for packets...");

process.on("SIGINT", () => {
  console.log("\nStopping client...");
  client.stop();
  process.exit(0);
});
