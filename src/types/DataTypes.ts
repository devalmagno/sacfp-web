export type Teacher = {
  id?: string;
  name: string;
  masp: string;
  pointsheets: Pointsheet[];
}

export type Pointsheet = {
  course: string;
  course_code: string;
  period: string;
  discipline: string;
  workload: number;
  schedules?: Schedules[];
  semester?: string;
}

export type Schedules = {
  day: string;
  times: number[]
}