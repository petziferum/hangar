import Sender from "@/types/Sender";

export default class Plane {
  name: string | undefined;
  sender: Sender | undefined;
  type: string | undefined;
  bauweise: string | undefined;
  gewicht: number | undefined;
  spannweite: number | undefined;
  faktor: number | undefined;

  constructor(
    name: string | undefined,
    sender: Sender | undefined,
    type: string | undefined,
    bauweise: string | undefined,
    gewicht: number | undefined,
    spannweite: number | undefined,
    faktor: number | undefined
  ) {
    this.name = name;
    this.sender = sender;
    this.type = type;
    this.bauweise = bauweise;
    this.gewicht = gewicht;
    this.spannweite = spannweite;
    this.faktor = faktor;
  }

  withName(name: string): Plane {
    this.name = name;
    return this;
  }
  withSender(value: Sender): Plane {
    this.sender = value;
    return this;
  }
  withType(value: string): Plane {
    this.type = value;
    return this;
  }
  withBauweise(bauweise: string): Plane {
    this.bauweise = bauweise;
    return this;
  }
  withGewicht(value: number): Plane {
    this.gewicht = value;
    return this;
  }
  withSpannweite(value: number): Plane {
    this.spannweite = value;
    return this;
  }
  withFaktor(value: number): Plane {
    this.faktor = value;
    return this;
  }

  static createEmptyPlane(): Plane {
    return new Plane(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    );
  }
}
