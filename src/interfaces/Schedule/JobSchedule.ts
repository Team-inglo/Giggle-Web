export interface JobSchedule {
  name: string;
  color: string;
  time: number;
  money: number;
  days: string[];
}

export type DateValuePiece = Date | null;
export type DateValue = DateValuePiece | [DateValuePiece, DateValuePiece];
