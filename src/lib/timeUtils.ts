import { format, isValid, parse } from "date-fns";

const TIME_INPUT_FORMATS = ["hh:mm a", "h:mm a", "HH:mm", "H:mm"] as const;

export function toTimeInputValue(timeStr: string): string {
  if (!timeStr) return "";

  const referenceDate = new Date();

  for (const timeFormat of TIME_INPUT_FORMATS) {
    const parsed = parse(timeStr, timeFormat, referenceDate);
    if (isValid(parsed)) {
      return format(parsed, "HH:mm");
    }
  }

  return timeStr;
}

export function toApiTimeValue(timeStr: string): string {
  if (!timeStr) return "";

  const referenceDate = new Date();
  const parsed = parse(timeStr, "HH:mm", referenceDate);

  if (isValid(parsed)) {
    return format(parsed, "hh:mm a");
  }

  return timeStr;
}
