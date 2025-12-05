export class DateFormatter {
  static formatWithTime(value: string | Date) {
    const formatterWithTime = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "medium",
    });
    return DateFormatter.format(formatterWithTime, value);
  }

  static formatWithoutTime(value: string | Date) {
    const formatterWithoutTime = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
    });

    return DateFormatter.format(formatterWithoutTime, value);
  }

  private static format(formatter: Intl.DateTimeFormat, value: string | Date) {
    if (typeof value === "object") {
      return formatter.format(value);
    }

    return formatter.format(new Date(value));
  }
}
