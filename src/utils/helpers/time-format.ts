import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

dayjs.extend(relativeTime);

export const returnCommentTime = (date: string) => {
  const localTime = dayjs.utc(date).local();
  return localTime.fromNow();
};

const timeUnits = [
  {unit: "s", threshold: 60, getText: (value: number) => `${value}s`},
  {
    unit: "min",
    threshold: 60 * 60,
    getText: (value: number) => `${Math.floor(value / 60)} min ago`,
  },
  {
    unit: "h",
    threshold: 60 * 60 * 24,
    getText: (value: number) => `${Math.floor(value / (60 * 60))} h ago`,
  },
  {
    unit: "d",
    threshold: 60 * 60 * 24 * 30,
    getText: (value: number) => `${Math.floor(value / (60 * 60 * 24))} d ago`,
  },
  {
    unit: "mth",
    threshold: 60 * 60 * 24 * 365,
    getText: (value: number) =>
      `${Math.floor(value / (60 * 60 * 24 * 30))} mth ago`,
  },
  {
    unit: "yr",
    threshold: Infinity,
    getText: (value: number) =>
      `${Math.floor(value / (60 * 60 * 24 * 365))} yr ago`,
  },
];

export const returnNotificationTime = (date: string) => {
  const localTime = dayjs.utc(date).local();
  const diffInSeconds = dayjs().diff(localTime, "second");

  // Find the correct unit to display based on thresholds
  const timeUnit = timeUnits.find(({threshold}) => diffInSeconds < threshold)!;

  // Return the formatted time using the selected unit
  return timeUnit.getText(diffInSeconds);
};
