import Sender from "@/types/Sender";

export default class SenderClass {
  name?: Sender;
  plane?: string;
  speicherNummer?: number;

  constructor() {}

  withName(value: Sender): SenderClass {
    this.name = value;
    return this;
  }

  withPlane(value: string): SenderClass {
    this.plane = value;
    return this;
  }

  withSpeicherNummer(value: number): SenderClass {
    this.speicherNummer = value;
    return this;
  }

  createEmptySenderClass() {
    return new SenderClass();
  }
}
