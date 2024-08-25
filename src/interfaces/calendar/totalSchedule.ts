export interface Schedule {
  id: number;
  partTimeName: string;
  hourlyRate: number;
  startAt: [number, number, number, number, number]; // [year, month, day, hour, minute]
  endAt: [number, number, number, number, number]; // [year, month, day, hour, minute]
}

export interface Summary {
  name: string;
  totalHour: number;
  salary: number;
  color: string; // 일단 임시로 추가
}

export interface TotalSchedule {
  summary: Summary[];
  totalSalary: number;
  schedules: Schedule[];
}
