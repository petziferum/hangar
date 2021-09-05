enum Sender {
  SPEKTRUM = "Spektrum",
  TURNIGY = "Turnigy",
  UNKNOWN = "Unknown",
}
export const StringToSender = new Map<string, string>([
  ["Turnigy", Sender.TURNIGY],
  ["Spektrum", Sender.SPEKTRUM],
]);

export const SenderToBeschreibung = new Map<string, string>([
  [Sender.TURNIGY, "Turnigy"],
  [Sender.SPEKTRUM, "Spektrum"],
]);

export default Sender;
