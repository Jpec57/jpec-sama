import { MAX_LEVEL } from "@/lib/review/getNextLevel";
import dayjs from "dayjs";

const getNextAvailableAtAccordingToLevel = (level: number): dayjs.Dayjs => {
  switch (level) {
    case 0:
      return dayjs().startOf("hour").add(4, "hour");
    case 1:
      return dayjs().startOf("hour").add(8, "hour");
    case 2:
      return dayjs().startOf("hour").add(1, "day");
    case 3:
      return dayjs().startOf("hour").add(2, "day");
    case 4:
      return dayjs().startOf("hour").add(7, "day");
    case 5:
      return dayjs().startOf("hour").add(14, "day");
    case 6:
      return dayjs().startOf("hour").add(31, "day");
    case 7:
      return dayjs()
        .startOf("hour")
        .add(3 * 31, "day");
    case MAX_LEVEL:
    default:
      return dayjs().startOf("hour").add(365, "day");
  }
};

export default getNextAvailableAtAccordingToLevel;
