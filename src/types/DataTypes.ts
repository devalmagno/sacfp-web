export type Teacher = {
  id: string;
  name: string;
  masp: string;
  pointsheets?: Pointsheet[];
}

export type TeacherPointSheet = {
  id: string;
  name: string;
  masp: string;
  sheet: Pointsheet;
}

export type Pointsheet = {
  course: string;
  period: string;
  discipline: string;
  workload: number;
  schedules?: Schedules[];
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
  activity_dates: Activity_dates[];
  acronym: string;
}

export type Activity_dates = {
  date: string;
  description: string;
  reference_day: string;
  type: string;
}

export type Config = {
  id: string;
  departament: string;
  semester: string;
  limitPointGeneration: boolean;
}

export type ScheduleReplacement = {
  classDate: string;
  classTime: number;
  replacementDate: string;
  replacementTime: number;
  description?: string;
}

export type EadSchoolDays = {
  month: string;
  schedules: ScheduleEad[];
}

export type ScheduleEad = {
  date: string;
  time: number;
  description?: string;
}

export type ReplacementInfo = {
  classDate: string;
  classTimes: ClassTimesProps[];
  replacementDate: string;
  replacementTimes: ClassTimesProps[];
}

export type EadInfo = {
  classDate: string;
  classTimes: ClassTimesProps[];
}

export type ClassTimesProps = {
  time: number;
  isSelected: boolean;
}

export type Routes = {
  title: string;
  path: string;
  icon: string;
  boxButton: boolean;
  navbar: boolean;
  requireAdmin: boolean;
}

export type User = {
  id: string;
  name: string;
  email: string;
  type: string;
}