import axios from "axios";
import type { TimeTableSettingsData } from "../types/settings";

export const fetchTimeTableSettings = async (): Promise<TimeTableSettingsData> => {
  const res = await axios.get("/api/timetable");
  return res.data;
};

export const saveTimeTableSettings = async (data: TimeTableSettingsData) => {
  await axios.post("/api/timetable", data);
};
