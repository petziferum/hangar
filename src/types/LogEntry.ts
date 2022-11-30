export default class LogEntry {
  constructor(
    private date: Date,
    private planeId: string,
    private text: string
  ) {
    this.date = date;
    this.planeId = planeId;
    this.text = text;
  }

  withPlaneId(value: string): LogEntry {
    this.planeId = value;
    return this;
  }

  withDate(value: Date): LogEntry {
    this.date = value;
    return this;
  }

  withText(value: string): LogEntry {
    this.text = value;
    return this;
  }

  public static createEmtptyLogEntry(): LogEntry {
    return new LogEntry(undefined, undefined, undefined);
  }
}