interface PartTimeListItem {
  id: number;
  name: string;
}

export type PartTimeList = PartTimeListItem[];

export interface PartTimeDetail {
  id: number;
  name: string;
  hourlyRate: number;
  color: string;
}

export interface ParTimeInput {
  name: string;
  hourlyRate: number;
  color: string;
}
