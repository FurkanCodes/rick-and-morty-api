import { STATUS_CLASSES } from "../constants/constants";

export const getStatusClass = (status: string): string => {
  switch (status) {
    case "Dead":
      return STATUS_CLASSES.DEAD;
    case "Alive":
      return STATUS_CLASSES.ALIVE;
    case "unknown":
      return STATUS_CLASSES.UNKNOWN;
    default:
      return "";
  }
};
