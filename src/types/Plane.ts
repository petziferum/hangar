import Sender from "@/types/Sender";
import Battery from "@/types/Battery";

export default class Plane {
  id: string | undefined;
  name: string | undefined;
  sender: Sender | undefined;
  battery: Battery | undefined;
  type: string | undefined;
  bauweise: string | undefined;
  gewicht: number | undefined;
  spannweite: number | undefined;
  faktor: number | undefined;
  image: string | undefined;
  beschreibung?: string;
  crash?: boolean;

  constructor(
    name: string | undefined,
    sender: Sender | undefined,
    battery: Battery | undefined,
    type: string | undefined,
    bauweise: string | undefined,
    gewicht: number | undefined,
    spannweite: number | undefined,
    faktor: number | undefined,
    image: string | undefined,
    beschreibung: string | undefined,
    crash: boolean | undefined
  ) {
    this.name = name;
    this.sender = sender;
    this.battery = battery;
    this.type = type;
    this.bauweise = bauweise;
    this.gewicht = gewicht;
    this.spannweite = spannweite;
    this.faktor = faktor;
    this.image = image;
    this.beschreibung = beschreibung;
    this.crash = crash;
  }

  withBeschreibung(value: string): Plane {
    this.beschreibung = value;
    return this;
  }
  withCrash(value: boolean): Plane {
    this.crash = value;
    return this;
  }
  withName(name: string): Plane {
    this.name = name;
    return this;
  }
  withSender(value: Sender): Plane {
    this.sender = value;
    return this;
  }
  withBattery(value: Battery): Plane {
    this.battery = value;
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
  withImage(value: string): Plane {
    this.image = value;
    return this;
  }
  withId(value: string): Plane {
    this.id = value;
    return this;
  }

  static createFirePlane(obj: Plane): Plane {
    return new Plane(
      obj.name || undefined,
      obj.sender || undefined,
      obj.battery || undefined,
      obj.type || undefined,
      obj.bauweise || undefined,
      obj.gewicht || undefined,
      obj.spannweite || undefined,
      obj.faktor || undefined,
      obj.image || undefined,
      obj.beschreibung || undefined,
      obj.crash || undefined
    );
  }

  static createEmptyPlane(): Plane {
    return new Plane(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      "",
      undefined,
      undefined
    );
  }
}
