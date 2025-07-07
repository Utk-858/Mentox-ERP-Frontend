
export interface GeneralSettings {
  workingDays: string[];
  shiftSystem: "Single" | "Double";
  periodDuration: number;
  saturdayPeriods: number;
  lunchBreakDuration: number;
  lunchBreakStart: string;
  lunchBreakEnd: string;
  isSaturdayWorking: boolean;
  morningBreak: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export interface SchoolTimings {
  summerStart: string;
  summerEnd: string;
  winterStart: string;
  winterEnd: string;
}

export interface TimeTableSettingsData {
  classes1to12: GeneralSettings;
  prePrimary: GeneralSettings;
  timings: SchoolTimings;
}

