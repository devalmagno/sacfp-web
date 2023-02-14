export type Teacher = {
  id?: string;
  name: string;
  masp: string;
  pointsheets: Pointsheet[];
}

export type TeacherPointSheet = {
  id?: string;
  name: string;
  masp: string;
  sheet: Pointsheet;
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

export type Calendar = {
  id: string;
  semester: string;
  end_date: string;
  start_date: string; 
  activity_dates?: Activity_dates[];
}

export type Activity_dates = {
  date: string;
  description: string;
  reference_day: string;
  type: string;
}