export class DateFormatter {
  static formatWithTime(value: string | Date) {
    const formatterWithTime = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "medium",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });

    return DateFormatter.format(formatterWithTime, value);
  }

  static formatWithoutTime(value: string | Date) {
    const formatterWithoutTime = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });

    return DateFormatter.format(formatterWithoutTime, value);
  }

  private static format(formatter: Intl.DateTimeFormat, value: string | Date) {
    const date = typeof value === "string" ? new Date(value) : value;
    return formatter.format(date);
  }

  static formatWithoutTimezone(value: string) {
    const [year, month, day] = value.split("-");
    const date = `${day}/${month}/${year}`;

    return date;
  }
}
